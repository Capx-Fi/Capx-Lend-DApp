import { Button, Col, Row, Tooltip } from "antd";
import React, { useState } from "react";
import SvgIcon from "../svg-icon/svg-icon";
import "../../../containers/Dashboard/index.less";
import {
  healthFactorTooltip,
  marketPriceTooltip,
} from "../../../constants/toolTips";
import ClaimAssets from "./accordion-right/ClaimAssets";
import AcceptLoanOffer from "./accordion-right/AcceptLoanOffer";
import RepayLoan from "./accordion-right/RepayLoan";
import CancelLoan from "./accordion-right/CancelLoan";
import StatusText from "./accordion-right/StatusText";
import { convertToInternationalCurrencySystem } from "../../../utils/convertToInternationalCurrencySystem";
import StartLoanOffer from "./accordion-right/StartLoanOffer";

function AccordionCard({
  orderId,
  healthFactor,
  paymentType,
  status,
  orderDetails,
  additonalInfo,
  statusTitle,
  statusType,
  loan,
  isBorrower,
  lendContract,
  masterContract
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <div>
      <div className="capx-card" style={{ marginBottom: 20 }}>
        <div className="ordercard-upper">
          <div className="upper-left">
            <b>Order ID: {orderId}</b>
            <span className="ml-4 helthfactor-title">
              Health Factor : <b>{
                loan?.status === "Cancelled" 
                ? "N/A"
                : convertToInternationalCurrencySystem(healthFactor)
              }</b>
              <Tooltip
                className="tooltip-icon"
                placement="top"
                title={healthFactorTooltip}
              >
                <SvgIcon name="info" viewbox="0 0 22 22.001" />
              </Tooltip>
            </span>
          </div>
          <div className="upper-right">
            <span className="badge badge-green">{paymentType}</span>
            {status && (
              <span className={`badge badge-${status.toLowerCase()}`}>
                {status}
              </span>
            )}
          </div>
        </div>
        <div className={`ordercard-bottom-${orderDetails.length}`}>
          <ul>
            {orderDetails.map((item, index) => {
              return (
                <li key={index}>
                  <p>{item.label}</p>
                  <h4>{item.value}</h4>
                </li>
              );
            })}
          </ul>
          <Button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`arrow-collapse ${isCollapsed ? "down" : "up"}`}
            type="link"
          >
            <SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />
          </Button>
        </div>
      </div>
      <div
        className={`additional-info collapse-content ${
          isCollapsed ? "collapsed" : "expanded"
        }`}
      >
        <div className="additional-info-inner">
          <h3>Additional Info</h3>
          <div className="additional-info-dtl">
            <div className="additionalinfo-left">
              <ul>
                {additonalInfo.map((item, index) => {
                  return (
                    <li key={index}>
                      <p>
                        {item.label}
                        {item.tooltip && (
                          <Tooltip
                            className="tooltip-icon"
                            placement="top"
                            title={item.tooltip}
                          >
                            <SvgIcon name="info" viewbox="0 0 22 22.001" />
                          </Tooltip>
                        )}
                      </p>
                      <h4>{item.value}</h4>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="additionalinfo-right">
              <div className="additionalinfo-right-inner">
                {status === "Expired" && (
                  <ClaimAssets lendContract={lendContract} loan={loan} amount={isBorrower ? convertToInternationalCurrencySystem(loan?.collateralAmt).toString() + " " + loan?.collateralTicker : convertToInternationalCurrencySystem(loan?.stableCoinAmt).toString() + " " + loan?.stableCoinTicker} penalty={(loan?.penalty).toString() + " %"} />
                )}
                {status === "Defaulted" && (
                  <ClaimAssets lendContract={lendContract} loan={loan} amount={isBorrower ? convertToInternationalCurrencySystem(loan?.collateralAmt).toString() + " " + loan?.collateralTicker : convertToInternationalCurrencySystem(loan?.stableCoinAmt).toString() + " " + loan?.stableCoinTicker} penalty={(loan?.penalty).toString() + " %"} />
                )}
                {status === "Funded" && (
                  <StartLoanOffer lendContract={lendContract} loan={loan} />
                )}
                {status === "Active" && (
                  <RepayLoan
                    lendContract = {lendContract} loan = {loan} masterContract = {masterContract} 
                  // repayAmount={"$3000"}
                    // isInstallment={paymentType === "Installment"}
                  />
                )}
                {status === "Initiated" && (
                  <CancelLoan
                  lendContract={lendContract} loan={loan}
                  />
                )}
                {statusType && (
                  <StatusText type={statusType} title={statusTitle} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccordionCard;
