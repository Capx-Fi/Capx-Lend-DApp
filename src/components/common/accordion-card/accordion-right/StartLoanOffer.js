import { Button, Col, Row } from "antd";
import React from "react";
import Web3 from "web3";
import { pullAssets } from "../../../../utils/pullAssets";
import { useDispatch } from "react-redux";
import { useQueryClient } from "react-query";
import useWagmi from "../../../../useWagmi";

function StartLoanOffer({ lendContract, loan, from }) {
  const web3 = new Web3(Web3.givenProvider);
  const { active, account, chainId } = useWagmi();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return (
    <div>
      <Row className="mb-2">
        <Col sm="12">
          <b className="titles-right">Start Loan Offer</b>
        </Col>
      </Row>
      <Row className="align-items-center">
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
