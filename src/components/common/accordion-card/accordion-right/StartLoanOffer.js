import { Button, Col, Row } from "antd";
import React from "react";
import Web3 from "web3";
import { pullAssets } from "../../../../utils/pullAssets";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import { useQueryClient } from "react-query";

function StartLoanOffer({ lendContract, loan, from }) {
  const web3 = new Web3(Web3.givenProvider);
  const { active, account, chainId } = useWeb3React();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return (
    <div>
      <Row className="mb-2">
        <Col sm="12">
          <b>Start Loan Offer</b>
        </Col>
      </Row>
      <Row>
        <Col sm="7">Loan Amount : $ &nbsp;</Col>
        <Col sm="5" className="text-right">
          <b> {loan?.stableCoinAmt}</b>
        </Col>
      </Row>
      <Button
        className="action-btn mt-3"
        block
        onClick={() =>
          pullAssets(
            lendContract,
            account,
            loan?.loanID,
            dispatch,
            queryClient,
            from
          )
        }
      >
        Start Loan
      </Button>
    </div>
  );
}

export default StartLoanOffer;
