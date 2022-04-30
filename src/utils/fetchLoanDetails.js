import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";
import BigNumber from "bignumber.js";
import {
  fetchLoanRepayAmt,
  fetchHealthFactor,
  fetchSCAmt,
  fetchWVTAmt,
  fetchPenalty
} from "./fetchMasterContract";
import { fetchMarketPrice } from "./fetchOracleContract";
BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 36],
});

async function getLoanStatus(
  stageOfLoan,
  initiationTime,
  endTime,
  loanID,
  masterContract
) {
  let status = "";
  if (stageOfLoan === "1" || stageOfLoan === "2") {
    status = "Initiated";
  } else if (stageOfLoan === "0") {
    status = "Cancelled";
  } else if (
    stageOfLoan === "3" &&
    initiationTime < Math.floor(Date.now() / 1000)
  ) {
    status = "Expired";
  } else if (stageOfLoan === "3") {
    status = "Funded";
  } else if (
    stageOfLoan === "4" &&
    (endTime < Math.floor(Date.now() / 1000) ||
      await fetchHealthFactor(masterContract, loanID) < 1)
  ) {
    status = "Defaulted";
  } else if (stageOfLoan === "4") {
    status = "Active";
  } else if (stageOfLoan === "5") {
    status = "Completed";
  } else if (stageOfLoan === "6") {
    status = "Defaulted";
  }
  return status;
}

function getTotalInterest(scAmt, interestRate, penalty, duration, flag) {
    let val = null;
    if (flag) {
        let num = scAmt * interestRate * duration * penalty;
        let den = 100000000 * 86400 * 365;
        val = num / den;
    } else {
        let num = scAmt * interestRate * duration;
        let den = 10000 * 86400 * 365;
        val = num / den;
    }
    return val;
}

async function getHealthFactor(oracleContract, scAmt, scDecimal, wvtAmt, wvtAddress, wvtDecimal, discount, lt) {
  let price = await fetchMarketPrice(oracleContract, wvtAddress);
  let collateralVal = ( 
    price 
    * Math.pow(10,scDecimal) 
    * (new BigNumber(wvtAmt).multipliedBy(Math.pow(10, wvtDecimal)))
    * discount )
  / (
    10000
    * Math.pow(10, wvtDecimal)
  );
  let healthFactor = (collateralVal)*lt/(10000 * new BigNumber(scAmt).multipliedBy(Math.pow(10, scDecimal)));
  return healthFactor;
}

function getLoanPeriod(endTime) {
  var DateDiff = {
    inDays: function (d1, d2) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();

      return parseInt((t2 - t1) / (86400 * 1000));
    },
    inMonths: function (d1, d2) {
      var d1Y = d1.getFullYear();
      var d2Y = d2.getFullYear();
      var d1M = d1.getMonth();
      var d2M = d2.getMonth();

      return d2M + 12 * d2Y - (d1M + 12 * d1Y);
    },
    inYears: function (d1, d2) {
      return d2.getFullYear() - d1.getFullYear();
    },
  };

  var d1 = new Date();
  var d2 = new Date();
  d2.setDate(d2.getDate() + Math.floor(endTime / 86400));
  var months = DateDiff.inYears(d1, d2) * 12;
  var month = DateDiff.inMonths(d1, d2) - months;
  var days = DateDiff.inYears(d1, d2) * 365;
  var dy = DateDiff.inDays(d1, d2) - days;
  return DateDiff.inYears(d1, d2) + " Y " + month + " M " + dy + " D";
}

function convertToDate(timestamp) {
  const unixTime = timestamp;
  const date = new Date(unixTime * 1000);
  let unlockDay = date.toLocaleDateString("en-US", {
    day: "numeric",
  });
  let unlockMonth = date.toLocaleDateString("en-US", {
    month: "short",
  });
  let unlockYear = date.toLocaleDateString("en-US", {
    year: "numeric",
  });
  let displayGraphDate = `${unlockDay} ${unlockMonth}, ${unlockYear}`;
  return displayGraphDate;
}

export const fetchLoanDetails = async (
  GRAPH_LEND_URL,
  masterContract,
  oracleContract
) => {
  let loans = [];
  let returnLoans = [];
  const client = new ApolloClient({
    uri: GRAPH_LEND_URL,
    cache: new InMemoryCache(),
  });

  const query = `query {
        loanEntities {
            id
            loanID
            wvtAddress
            wvtDecimal
            wvtAmount
            wvtTicker
            stableCoinAddress
            stableCoinDecimal
            stableCoinAmount
            stableCoinTicker
            loanToValue
            discount
            liquidationThreshold
            endTime
            initiationTime
            interestRate
            externalLiquidation
            stageOfLoan
            description
            liquidationIntoContractAmt
            liquidationFromContractToLenderAmt
            borrowerAddress
            lenderAddress
            liquidator
            completedAtTime
        }
      }`;
  try {
    const { data } = await client.query({
      query: gql(query),
    });

    loans = await data.loanEntities
      .map(async (loan) => {
        const _scAmt =
          loan?.stageOfLoan === "1" || loan?.stageOfLoan === "0"
            ? new BigNumber(
                await fetchSCAmt(
                  masterContract,
                  loan?.wvtAmount,
                  loan?.wvtAddress,
                  loan?.stableCoinAddress,
                  loan?.loanToValue,
                  loan?.discount
                )
              )
                .dividedBy(Math.pow(10, loan?.stableCoinDecimal))
                .toString(10)
            : new BigNumber(loan?.stableCoinAmount)
                .dividedBy(Math.pow(10, loan?.stableCoinDecimal))
                .toString(10);
        const _wvtAmt =
          loan?.stageOfLoan === "2" || loan?.stageOfLoan === "0"
            ? new BigNumber(
                await fetchWVTAmt(
                  masterContract,
                  loan?.stableCoinAmount,
                  loan?.wvtAddress,
                  loan?.stableCoinAddress,
                  loan?.loanToValue,
                  loan?.discount
                )
              )
                .dividedBy(Math.pow(10, loan?.wvtDecimal))
                .toString(10)
            : new BigNumber(loan?.wvtAmount)
                .dividedBy(Math.pow(10, loan?.wvtDecimal))
                .toString(10);
        const _repaymentType = "Single Repayment";
        const _status = await getLoanStatus(
          loan?.stageOfLoan,
          loan?.initiationTime,
          loan?.endTime,
          loan?.loanID,
          masterContract
        );
        const _representationType =
          _status === "Initiated" || _status === "Cancelled" || _status === "Funded" || _status === "Expired"
            ? "Loan Duration"
            : "End Time";
        const _representation =
          _status === "Initiated" || _status === "Cancelled" || _status === "Funded" || _status === "Expired"
            ? getLoanPeriod(loan?.endTime)
            : convertToDate(loan?.endTime);
        const _interestRate = new BigNumber(loan?.interestRate)
          .dividedBy(Math.pow(10, 2))
          .toString(10);   
        
        let _marketPrice = await fetchMarketPrice(oracleContract, loan?.wvtAddress);
        const _discount = new BigNumber(loan?.discount)
          .dividedBy(Math.pow(10, 2))
          .toString(10);
        const _completedAtTime = Math.floor(loan?.completedAtTime / 86400) * 86400;
        const _penalty = await fetchPenalty(masterContract);
        const _totalInterest =
            loan?.stageOfLoan === "4" 
            ? await fetchLoanRepayAmt(masterContract, loan?.loanID)
            : loan?.stageOfLoan === "5" && _completedAtTime !== loan?.endTime
            ? new BigNumber(
                getTotalInterest(
                  new BigNumber(_scAmt).multipliedBy(Math.pow(10,loan?.stableCoinDecimal)),
                  loan?.interestRate,
                  _penalty,
                  _completedAtTime - loan?.initiationTime,
                  true
                )
              ).dividedBy(Math.pow(10, loan?.stableCoinDecimal))
            : _status === "Initiated" || _status === "Cancelled" || _status === "Funded" || _status === "Expired"
            ? new BigNumber("0")
            : new BigNumber(
              getTotalInterest(
                new BigNumber(_scAmt).multipliedBy(Math.pow(10,loan?.stableCoinDecimal)),
                loan?.interestRate,
                _penalty,
                loan?.endTime - loan?.initiationTime,
                false
              )
            ).dividedBy(Math.pow(10, loan?.stableCoinDecimal));
        const _collateralValue =
          _wvtAmt * Math.floor((_marketPrice * _discount) / 100);
        const _payOffAmt = _totalInterest.plus(_scAmt);
        const _healthFactor = await getHealthFactor(oracleContract, _scAmt, loan?.stableCoinDecimal, _wvtAmt, loan?.wvtAddress ,loan?.wvtDecimal, loan?.discount, loan?.liquidationThreshold);
        console.log("Health Factor",_healthFactor, loan?.loanID);
        const _ltv = new BigNumber(loan?.loanToValue)
          .dividedBy(Math.pow(10, 2))
          .toString(10);
        const _lt = new BigNumber(loan?.liquidationThreshold)
          .dividedBy(Math.pow(10, 2))
          .toString(10);
        
        let data =  {
          loanID: loan?.loanID,
          status: _status,
          stageOfLoan: loan?.stageOfLoan,
          penalty: Math.floor(_penalty/100).toString(),
          repaymentType: _repaymentType,
          interestRate: _interestRate,
          collateralAddress: loan?.wvtAddress,
          collateralDecimal: loan?.wvtDecimal,
          collateralAmt: _wvtAmt,
          collateralTicker: loan?.wvtTicker,
          stableCoinAddress: loan?.stableCoinAddress,
          stableCoinDecimal: loan?.stableCoinDecimal,
          stableCoinAmt: _scAmt,
          stableCoinTicker: loan?.stableCoinTicker,
          loanToValue: _ltv,
          discount: _discount,
          liquidationThreshold: _lt,
          healthFactor: _healthFactor,
          timeRepresentationType: _representationType,
          timeRepresentation: _representation,
          externalLiquidation: loan?.externalLiquidation,
          payOffAmt: _payOffAmt.toString(10),
          totalInterest: _totalInterest.toString(10),
          marketPrice: _marketPrice,
          collateralVal: _collateralValue.toString(),
          borrowerAddress: loan?.borrowerAddress,
          lenderAddress: loan?.lenderAddress,
        };
        return data;
      })
      .flat();
      returnLoans = await Promise.all(loans);
  } catch (error) {
    console.log(error);
  }
  return returnLoans;
};
