import { Button, Col, Radio, Row } from "antd";
import React, { useState } from "react";
import {
  repaymentLoan,
  approveRepaymentLoan,
} from "../../../../utils/repaymentLoan";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { ERC20_ABI } from "../../../../contracts/ERC20";
import { convertToInternationalCurrencySystem } from "../../../../utils/convertToInternationalCurrencySystem";
import { useDispatch } from "react-redux";

function RepayLoan({ lendContract, loan, masterContract }) {
  const [value, setValue] = React.useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const dispatch = useDispatch();
  const [approved, setApproved] = useState(false);
  const web3 = new Web3(Web3.givenProvider);
  const { active, account, chainId } = useWeb3React();
  return (
    <div>
      {/* {isInstallment && (
        <Row className="mb-2">
          <Col sm="12" className="mb-2">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Installment</Radio>
              <Radio value={2}>Complete Payment</Radio>
            </Radio.Group>
          </Col>
        </Row>
      )} */}
      <Row className="mb-2">
        <Col sm="12">
          <b>Repay Loan</b>
        </Col>
      </Row>
      <Row>
        <Col sm="7">Amount to be paid :</Col>
        <Col sm="5" className="text-right">
          <b>
            &nbsp;$&nbsp;
            {convertToInternationalCurrencySystem(loan?.payOffAmt).toString()}
          </b>
        </Col>
      </Row>
      {!approved ? (
        <Button
          className="action-btn mt-3"
          block
          onClick={() =>
            approveRepaymentLoan(
              masterContract,
              account,
              loan?.loanID,
              ERC20_ABI,
              lendContract._address,
              loan?.stableCoinAddress,
              setApproved,
              dispatch
            )
          }
        >
          Approve Loan Repayment
        </Button>
      ) : (
        <Button
          className="action-btn mt-3"
          block
          onClick={() =>
            repaymentLoan(
              lendContract,
              account,
              loan?.loanID,
              setApproved,
              dispatch
            )
          }
        >
          Repay Loan
        </Button>
      )}
    </div>
  );
}

export default RepayLoan;
