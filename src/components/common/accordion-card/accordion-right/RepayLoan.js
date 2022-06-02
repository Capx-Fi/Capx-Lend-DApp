import { Button, Col, Radio, Row, Tooltip } from "antd";
import React, { useState } from "react";
import SvgIcon from "../../svg-icon/svg-icon";
import {
  repaymentLoan,
  approveRepaymentLoan,
} from "../../../../utils/repaymentLoan";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { ERC20_ABI } from "../../../../contracts/ERC20";
import { convertToInternationalCurrencySystem } from "../../../../utils/convertToInternationalCurrencySystem";
import { useDispatch } from "react-redux";
import { useQueryClient } from "react-query";

function RepayLoan({ lendContract, loan, masterContract, from }) {
  const [value, setValue] = React.useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const dispatch = useDispatch();
  const [approved, setApproved] = useState(false);
  const web3 = new Web3(Web3.givenProvider);
  const queryClient = useQueryClient();
  const { active, account, chainId } = useWeb3React();
  let isEarly = parseInt(loan?.loanEndTime) > Math.floor(Date.now() / (86400 * 1000)) * 86400 ? true : false;
  console.log("isEarly Repayment", isEarly);
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
          <b className="titles-right">Repay Loan</b>
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
      {isEarly ? (
        <Row>
        <Col sm="7">
          Early Loan Repayment Penalty
          <Tooltip
            className="tooltip-icon"
            placement="top"
            title={"Early Loan Repayment Penalty"}
          >
            <SvgIcon name="info" viewbox="0 0 22 22.001" />
          </Tooltip>
          &nbsp;:&nbsp;
        </Col>
        <Col sm="5" className="text-right">
          <b>{loan?.penalty} %</b>
        </Col>
      </Row>) : null
      }
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
              dispatch,
              queryClient,
              from
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
              dispatch,
              queryClient,
              from
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
