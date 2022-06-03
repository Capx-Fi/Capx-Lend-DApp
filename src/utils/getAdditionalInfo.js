import { discountTooltip, marketPriceTooltip } from "../constants/toolTips";
import { convertToInternationalCurrencySystem } from "./convertToInternationalCurrencySystem";
export function getAdditionalInfo(loan) {
  return [
    {
      label: "Market Price",
      value: "$ "+convertToInternationalCurrencySystem(loan.marketPrice).toString(),
      tooltip: marketPriceTooltip,
    },
    {
      label: "Discount",
      value: (100 - loan.discount).toString() + " %",
      tooltip: discountTooltip,
    },
    {
      label: "Collateral Amount",
      value: convertToInternationalCurrencySystem(loan.collateralAmt).toString() + "  " + loan.collateralTicker.toString(),
    },
    {
      label: "Total Interest",
      value: "$ " + convertToInternationalCurrencySystem(loan.totalInterest).toString(),
    },
    // {
    //   label: "Interest Accrued",
    //   value: "$500",
    // },
    {
      label: "Pay-off Amount",
      value: "$ " + convertToInternationalCurrencySystem(loan.payOffAmt).toString(),
    },
  ];
}
