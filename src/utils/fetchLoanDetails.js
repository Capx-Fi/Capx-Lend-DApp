import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";
import BigNumber from "bignumber.js";
import {
  fetchLoanRepayAmt,
  fetchHealthFactor,
  fetchSCAmt,
  fetchWVTAmt,
  fetchPenalty,
  fetchLiquidationAmt
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
  var unixTime = Math.floor(Math.floor(Date.now() / 1000) / 86400) * 86400;
  var startDate = new Date(new Date(unixTime * 1000).toISOString().substr(0, 10));
  var endingDate = new Date(( (unixTime + Number(endTime)) * 1000)).toISOString().substr(0, 10); // need date in YYYY-MM-DD format
  var endDate = new Date(endingDate);
  if (startDate > endDate) {
    var swap = startDate;
    startDate = endDate;
    endDate = swap;
  }
  var startYear = startDate.getFullYear();
  var february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
  var daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  var yearDiff = endDate.getFullYear() - startYear;
  var monthDiff = endDate.getMonth() - startDate.getMonth();
  if (monthDiff < 0) {
    yearDiff--;
    monthDiff += 12;
  }
  var dayDiff = endDate.getDate() - startDate.getDate();
  if (dayDiff < 0) {
    if (monthDiff > 0) {
      monthDiff--;
    } else {
      yearDiff--;
      monthDiff = 11;
    }
    dayDiff += daysInMonth[startDate.getMonth()];
  }

  return yearDiff + 'Y ' + monthDiff + 'M ' + dayDiff + 'D';
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
        let _liquidationAmount = null
        if (loan?.stageOfLoan === "4"){
          _liquidationAmount = await fetchLiquidationAmt(masterContract, loan?.loanID)
        }
        let _totalInterest =
            loan?.stageOfLoan === "4" 
            ? await fetchLoanRepayAmt(masterContract, loan?.loanID, loan)
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

        if(loan?.stageOfLoan === "4"){
          _totalInterest = _totalInterest/ Math.pow(10,loan?.stableCoinDecimal)
          _totalInterest = (new BigNumber (_totalInterest)).minus(new BigNumber (_scAmt))
        }
        const _payOffAmt = _totalInterest.plus(_scAmt);
        const _healthFactor = await getHealthFactor(oracleContract, _scAmt, loan?.stableCoinDecimal, _wvtAmt, loan?.wvtAddress ,loan?.wvtDecimal, loan?.discount, loan?.liquidationThreshold);
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
          liquidationAmt: _liquidationAmount,
        };
        return data;
      })
      .flat();
      returnLoans = await Promise.all(loans);
  } catch (error) {
    console.log("Error while fetching loan details", error);
  }
  return returnLoans;
};
