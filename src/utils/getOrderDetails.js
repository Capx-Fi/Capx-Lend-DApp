import { convertToInternationalCurrencySystem } from "./convertToInternationalCurrencySystem";
export const getOrderDetails = (loan) => {
  return [
    {
      label: "Loan Amount",
      value: "$ " + convertToInternationalCurrencySystem(loan.stableCoinAmt).toString(),
    },
    {
      label: loan.timeRepresentationType,
      value: loan.timeRepresentation,
    },
    // {
    //   label: "End Time",
    //   value: "22/09/2022",
    // },
    {
      label: "Interest Rate",
      value: loan.interestRate.toString() + " %",
    },
    {
      label: "Loan-To-Value",
      value: loan.loanToValue.toString() + " %",
    },
    {
      label: "Liquidation Threshold",
      value: loan.liquidationThreshold.toString() + " %",
    },
    {
      label: "Collateral Asset",
      value: loan.collateralTicker.toString(),
    },
    {
      label: "Loan Asset",
      value: loan.stableCoinTicker.toString(),
    },
  ];
};
