export const getOrderDetails = (loan) => {
  return [
    {
      label: "Loan Amount",
      value: loan.stableCoinAmt.toString(),
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
      value: loan.interestRate.toString(),
    },
    {
      label: "Collateral Asset",
      value: loan.collateralVal.toString(),
    },
  ];
};
