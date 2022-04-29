import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";
import BigNumber from "bignumber.js";
import {
  fetchLoanRepayAmt,
  fetchHealthFactor,
  fetchSCAmt,
  fetchWVTAmt,
} from "./fetchMasterContract";
import { fetchMarketPrice } from "./fetchOracleContract";
BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 36],
});

function getLoanStatus(
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
      fetchHealthFactor(masterContract, loanID) < 1)
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

function getTotalInterest(scAmt, interestRate, duration) {
  let num = scAmt * interestRate * duration;
  let den = 10000 * 86400 * 365;
  let val = Math.floor(num / den);
  return val;
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
    month: "long",
  });
  let unlockYear = date.toLocaleDateString("en-US", {
    year: "numeric",
  });
  let displayGraphDate = `${unlockDay} ${unlockMonth}, ${unlockYear}`;
  return displayGraphDate;
}

export const fetchBorrowerLoans = async (
  account,
  GRAPH_LEND_URL,
  masterContract,
  oracleContract
) => {
  let loans = [];
  const client = new ApolloClient({
    uri: GRAPH_LEND_URL,
    cache: new InMemoryCache(),
  });

  const query = `query {
        loanEntities  {
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
            externalLiquidation
            stageOfLoan
            description
            liquidationIntoContractAmt
            liquidationFromContractToLenderAmt
            borrowerAddress
            lenderAddress
            liquidator
        }
      }`;
  try {
    const { data } = await client.query({
      query: gql(query),
    });

    loans = data.loanEntities
      .map((loan) => {
        const _scAmt =
          loan?.stageOfLoan === "1" || loan?.stageOfLoan === "0"
            ? new BigNumber(
                fetchSCAmt(
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
                fetchWVTAmt(
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
        const _status = getLoanStatus(
          loan?.stageOfLoan,
          loan?.initiationTime,
          loan?.endTime,
          loan?.loanID,
          masterContract
        );
        const _representationType =
          _status === "Initiated" || _status === "Cancelled"
            ? "Loan Duration"
            : "End Time";
        const _representation =
          _status === "Initiated" || _status === "Cancelled"
            ? getLoanPeriod(loan?.endTime)
            : convertToDate(loan?.endTime);
        const _interestRate = new BigNumber(loan?.interestRate)
          .dividedBy(Math.pow(10, 2))
          .toString(10);
        const _marketPrice = fetchMarketPrice(oracleContract, loan?.wvtAddress);
        const _discount = new BigNumber(loan?.discount)
          .dividedBy(Math.pow(10, 2))
          .toString(10);
        const _totalInterest =
          loan?.stageOfLoan === "4"
            ? fetchLoanRepayAmt(masterContract, loan?.loanID)
            : new BigNumber(
                getTotalInterest(
                  _scAmt * loan?.stableCoinDecimal,
                  loan?.interestRate,
                  loan?.endTime
                )
              ).dividedBy(Math.pow(10, loan?.stableCoinDecimal));
        const _collateralValue =
          _wvtAmt * Math.floor((_marketPrice * _discount) / 100);
        const _payOffAmt = _totalInterest + _scAmt;
        const _ltv = new BigNumber(loan?.loanToValue)
          .dividedBy(Math.pow(10, 2))
          .toString(10);
        const _lt = new BigNumber(loan?.liquidationThreshold)
          .dividedBy(Math.pow(10, 2))
          .toString(10);

        return {
          loanID: loan?.loanID,
          status: _status,
          stageOfLoan: loan?.stageOfLoan,
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
          timeRepresentationType: _representationType,
          timeRepresentation: _representation,
          externalLiquidation: loan?.externalLiquidation,
          payOffAmt: _payOffAmt,
          totalInterest: _totalInterest,
          marketPrice: _marketPrice,
          collateralVal: _collateralValue,
          borrowerAddress: loan?.borrowerAddress,
          lenderAddress: loan?.lenderAddress,
        };
      })
      .flat();
  } catch (error) {
    console.log(error);
  }
  return loans;
};
