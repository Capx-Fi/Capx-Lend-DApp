import { Button, Col, Row, Tooltip } from "antd";
import React from "react";
import { claimAssetsTooltip } from "../../../../constants/toolTips";
import SvgIcon from "../../svg-icon/svg-icon";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { pullAssets } from "../../../../utils/pullAssets";
import { showModal } from "../../../../redux/features/modalSlice";
import { useDispatch } from "react-redux";
import { useQueryClient } from "react-query";
function ClaimAssets({ lendContract, loan, amount, penalty, from }) {
  const web3 = new Web3(Web3.givenProvider);
  const { active, account, chainId } = useWeb3React();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return (
    <div>
      <Row className="mb-2">
        <Col sm="12">
          <b>Claim Asset</b>
        </Col>
      </Row>
      <Row>
        <Col sm="7">Asset :&nbsp;</Col>
        <Col sm="5" className="text-right">
          <b>{amount}</b>
        </Col>
      </Row>
      <Row>
        <Col sm="7">
          Penalty
          <Tooltip
            className="tooltip-icon"
            placement="top"
            title={claimAssetsTooltip}
          >
            <SvgIcon name="info" viewbox="0 0 22 22.001" />
          </Tooltip>
          &nbsp;:&nbsp;
        </Col>
        <Col sm="5" className="text-right">
          <b>{penalty}</b>
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
        Claim Assets
      </Button>
    </div>
  );
}

export default ClaimAssets;
