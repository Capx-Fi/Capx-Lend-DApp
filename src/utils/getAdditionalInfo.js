import { discountTooltip, marketPriceTooltip } from "../constants/toolTips";

export const getAdditionalInfo = () => {
  return [
    {
      label: "Market Price",
      value: "xxx %",
      tooltip: marketPriceTooltip,
    },
    {
      label: "Discount",
      value: "xxx %",
      tooltip: discountTooltip,
    },
    {
      label: "Collateral Amount",
      value: "xxx %",
    },
    {
      label: "Total Interest",
      value: "$500",
    },
    {
      label: "Interest Accrued",
      value: "$500",
    },
    {
      label: "Pay-off Amount",
      value: "$500",
    },
  ];
};
