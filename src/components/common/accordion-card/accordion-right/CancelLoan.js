import { Button, Col, Row, Tooltip } from "antd";
import React from "react";
import { cancelLoanTooltip } from "../../../../constants/toolTips";
import SvgIcon from "../../svg-icon/svg-icon";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { cancelLoan } from "../../../../utils/cancelLoan";
function CancelLoan({ lendContract, loan }) {
  const web3 = new Web3(Web3.givenProvider);
  const { active, account, chainId } = useWeb3React();
  return (
    <div>
      <Row className="mb-2">
        <Col sm="12">
          <b>Cancel Loan Offer</b>
          <Tooltip
            className="tooltip-icon"
            placement="top"
            title={cancelLoanTooltip}
          >
            <SvgIcon name="info" viewbox="0 0 22 22.001" />
          </Tooltip>
        </Col>
      </Row>
      <Button 
        className="action-btn mt-3" block
        onClick={() => cancelLoan(lendContract,account, loan?.loanID)}
      >
        Cancel Loan
      </Button>
    </div>
  );
}

export default CancelLoan;
