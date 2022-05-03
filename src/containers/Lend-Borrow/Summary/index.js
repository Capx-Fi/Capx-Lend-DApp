import React from "react";
import { Button } from "antd";

const Summary = (props) => {
  return (
    <>
      <div className="summary-head">
        <h3>Summary</h3>
        <p>Authorize your loan before initiating the loan request</p>
      </div>
      <div className="summary-content">
        <ul>
          {props.stableCoinAmount && (
            <li>
              <label>Loan Amount</label>
              <span>{props.stableCoinAmount}</span>
            </li>
          )}
          {props.collateralAmount && (
            <li>
              <label>Collateral Amount</label>
              <span>{props.collateralAmount}</span>
            </li>
          )}
          {props.marketPrice && (
            <li>
              <label>Market Price</label>
              <span>{props.marketPrice}</span>
            </li>
          )}
          {props.loanType && (
            <li>
              <label>Loan Type</label>
              <span>{props.loanType}</span>
            </li>
          )}
          {props.collateralPrice && (
            <li>
              <label>Collateral Price</label>
              <span>{props.collateralPrice}</span>
            </li>
          )}
          {props.loanToValue && (
            <li>
              <label>Loan-To-Value</label>
              <span>{props.loanToValue} %</span>
            </li>
          )}
          {props.liquidationThreshold && (
            <li>
              <label>Liquidation Threshold</label>
              <span>{props.liquidationThreshold} %</span>
            </li>
          )}
          {props.canLiquidateLoan && (
            <li>
              <label>Can Liquidate Loan</label>
              <span>{props.canLiquidateLoan}</span>
            </li>
          )}

          {props.interestRate && (
            <li>
              <label>Interest Rate</label>
              <span>{props.interestRate} %</span>
            </li>
          )}
          {props.discount && (
            <li>
              <label>Discount</label>
              <span>{props.discount} %</span>
            </li>
          )}
          {props.loanTerm && (
            <li>
              <label>Loan Term</label>
              <span>{props.loanTerm}</span>
            </li>
          )}
          {/* {props.interestaccured && (
            <li>
              <label>Interest Accured</label>
              <span>${props.interestaccured}</span>
            </li>
          )}
          {props.noofinstallments && (
            <li>
              <label>No. Of Installments</label>
              <span>{props.noofinstallments}</span>
            </li>
          )}
          {props.defaultscenario && (
            <li>
              <label>Default Scenario</label>
              <span>{props.defaultscenario}</span>
            </li>
          )}
          {props.repaymenttype && (
            <li>
              <label>Repayment Type</label>
              <span>{props.repaymenttype}</span>
            </li>
          )}
          {props.paymentperinstallment && (
            <li>
              <label>Payment-Per-Installment</label>
              <span>${props.paymentperinstallment}</span>
            </li>
          )} */}
          {props.serviceFee && (
            <li>
              <label>Service Fee</label>
              <span>{props.serviceFee} %</span>
            </li>
          )}
        </ul>
      </div>
      <div className="summary-footer">
        <div className="left">
          <small>Pay-Off Amount</small>
          <h2>$4250</h2>
          <small>($1000/installment)</small>
        </div>
        <div className="right">
          <Button type="secondary" size="large">
            Approve Parameters
          </Button>
        </div>
      </div>
    </>
  );
};

export default Summary;
