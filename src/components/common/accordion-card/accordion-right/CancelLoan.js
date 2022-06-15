import { Button, Col, Row, Tooltip } from "antd";
import React from "react";
import { cancelLoanTooltip } from "../../../../constants/toolTips";
import SvgIcon from "../../svg-icon/svg-icon";
import Web3 from "web3";
import { cancelLoan } from "../../../../utils/cancelLoan";
import { useDispatch } from "react-redux";
import { useQueryClient } from "react-query";
import useWagmi from "../../../../useWagmi";
function CancelLoan({ lendContract, loan, from }) {
  const web3 = new Web3(Web3.givenProvider);
  const { active, account, chainId } = useWagmi();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return (
    <div>
      <Row className="mb-2">
        <Col sm="12">
          <b className="titles-right">Cancel Loan Offer</b>
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
        className="action-btn mt-3"
        block
        onClick={() =>
          cancelLoan(
            lendContract,
            account,
            loan?.loanID,
            dispatch,
            queryClient,
            from
          )
        }
      >
        Cancel Loan
      </Button>
    </div>
  );
}

export default CancelLoan;
