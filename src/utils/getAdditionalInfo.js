import { discountTooltip, marketPriceTooltip } from "../constants/toolTips";
export function getAdditionalInfo(loan) {
  return [
    {
      label: "Market Price",
      value: loan.marketPrice.toString(),
      tooltip: marketPriceTooltip,
    },
    {
      label: "Discount",
      value: loan.discount.toString(),
      tooltip: discountTooltip,
    },
    {
      label: "Collateral Amount",
      value: loan.collateralAmt.toString(),
    },
    {
      label: "Total Interest",
      value: loan.totalInterest.toString(),
    },
    // {
    //   label: "Interest Accrued",
    //   value: "$500",
    // },
    {
      label: "Pay-off Amount",
      value: loan.payOffAmt.toString(),
    },
  ];
}
