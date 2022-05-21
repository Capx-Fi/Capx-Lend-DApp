import React, { useEffect, useState } from "react";
import { Button } from "antd";
import Web3 from "web3";
import BigNumber from "bignumber.js";
import { MASTER_ABI } from "../../../contracts/Master";
import { ORACLE_ABI } from "../../../contracts/Oracle";
import { LEND_ABI } from "../../../contracts/Lend";
import { approveCreateLoan, createLoan } from "../../../utils/createLoan";
import { ERC20_ABI } from "../../../contracts/ERC20";
import { useWeb3React } from "@web3-react/core";
import { convertToInternationalCurrencySystemTotalInterest } from "../../../utils/convertToInternationalCurrencySystem";
import { getInterest } from "../../../utils/fetchLoanDetails";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 36],
});
const Summary = (props) => {
  const web3 = new Web3(Web3.givenProvider);
  const [isValid, setIsValid] = useState(false);
  const { active, account, chainId } = useWeb3React();
  const approved = props.approved;
  const setApproved = props.setApproved;
  const masterContract = new web3.eth.Contract(
    MASTER_ABI,
    "0x793130DFbFDC30629015C0f07b41Dc97ec14d8B5"
  );

  const oracleContract = new web3.eth.Contract(
    ORACLE_ABI,
    "0x49d396Eb1B3E2198C32D2FE2C7146FD64f8BcF27"
  );

  useEffect(() => {
    setIsValid(Object.values(props).every((item) => item !== "-"));
  }, [props]);

  const lendContract = new web3.eth.Contract(
    LEND_ABI,
    "0x309D0Ff4b655bAD183A3FA88A0547b41e877DcF1"
  );
  console.log(props.durationValid);
  const history = useHistory();
  console.log(props.collateralAmount);
  const dispatch = useDispatch();
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
          <h2>{`$${
            isNaN(
              getInterest(
                Number(props.stableCoinActualAmount),
                Number(props.interestRate),
                Number(props.loanDurationInSeconds),
                Number(props.stableCoinDecimal)
              )
            )
              ? "    -"
              : convertToInternationalCurrencySystemTotalInterest(
                  getInterest(
                    Number(props.stableCoinActualAmount),
                    Number(props.interestRate),
                    Number(props.loanDurationInSeconds),
                    Number(props.stableCoinDecimal)
                  )
                )
          }`}</h2>
          <small>Approx.</small>
        </div>
        <div className={`right ${isValid === true ? "" : "disabled-button"}`}>
          {!approved ? (
            <Button
              type="secondary"
              size="large"
              onClick={() =>
                approveCreateLoan(
                  account,
                  ERC20_ABI,
                  lendContract._address,
                  props.isBorrower,
                  props.isBorrower
                    ? new BigNumber(props?.collateralActualAmount).multipliedBy(
                        Math.pow(10, props?.collateralDecimal).toString(10)
                      )
                    : new BigNumber(props?.stableCoinActualAmount).multipliedBy(
                        Math.pow(10, props?.stableCoinDecimal).toString(10)
                      ),
                  props.collateralAddress,
                  props.stableCoinAddress,
                  dispatch,
                  setApproved
                )
              }
            >
              Approve Parameters
            </Button>
          ) : (
            <Button
              type="secondary"
              size="large"
              onClick={() =>
                createLoan(
                  lendContract,
                  account,
                  props.collateralAddress,
                  props.stableCoinAddress,
                  props.isBorrower,
                  props.isBorrower
                    ? new BigNumber(props?.collateralActualAmount).multipliedBy(
                        Math.pow(10, props?.collateralDecimal).toString(10)
                      )
                    : new BigNumber(props?.stableCoinActualAmount).multipliedBy(
                        Math.pow(10, props?.stableCoinDecimal).toString(10)
                      ),
                  props.interestRate * 100,
                  props.loanToValue * 100,
                  props.liquidationThreshold * 100,
                  props.loanDurationInSeconds,
                  props.discount * 100,
                  props.isBorrower ? false : false,
                  dispatch,
                  setApproved,
                  history
                )
              }
            >
              Create Loan Request
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Summary;
