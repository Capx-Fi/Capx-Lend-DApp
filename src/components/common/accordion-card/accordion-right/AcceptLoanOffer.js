import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { cancelLoan } from "../../../../utils/cancelLoan";
import { approveAcceptLoan } from "../../../../utils/acceptLoan";
import { acceptLoan } from "../../../../utils/acceptLoan";
import { ERC20_ABI } from "../../../../contracts/ERC20";
import { useDispatch } from "react-redux";

function AcceptLoanOffer({
  masterContract,
  lendContract,
  loan,
  amount,
  isBorrower,
  externalLiquidation,
}) {
  const web3 = new Web3(Web3.givenProvider);
  const { active, account, chainId } = useWeb3React();
  const [approved, setApproved] = useState(false);
  const dispatch = useDispatch();
  return (
    <div>
      <Row className="mb-2">
        <Col sm="12">
          <b>Accept Loan Offer</b>
        </Col>
      </Row>
      <Row>
        <Col sm="7">Loan Amount : $ &nbsp;</Col>
        <Col sm="5" className="text-right">
          <b> {amount}</b>
        </Col>
      </Row>
      {!approved ? (
        <Button
          className="action-btn mt-3"
          block
          onClick={() =>
            approveAcceptLoan(
              masterContract,
              account,
              ERC20_ABI,
              lendContract._address,
              loan?.loanID,
              isBorrower,
              loan,
              setApproved,
              dispatch
            )
          }
        >
          Approve Loan
        </Button>
      ) : (
        <Button
          className="action-btn mt-3"
          block
          onClick={() =>
            acceptLoan(
              lendContract,
              account,
              loan?.loanID,
              externalLiquidation,
              setApproved,
              dispatch
            )
          }
        >
          Accept Loan
        </Button>
      )}
    </div>
  );
}

export default AcceptLoanOffer;
