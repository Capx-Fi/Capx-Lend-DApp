import { Button, Col, Row, Tooltip } from "antd";
import React from "react";
import { claimAssetsTooltip } from "../../../../constants/toolTips";
import { SvgIcon } from "../../../common";

function ClaimAssets({ amount, penalty }) {
  return (
    <div>
      <Row className="mb-2">
        <Col sm="12">
          <b>Claim Assets</b>
        </Col>
      </Row>
      <Row>
        <Col sm="7">Amount to be paid :</Col>
        <Col sm="5" className="text-right">
          <b>{amount}</b>
        </Col>
      </Row>
      <Row>
        <Col sm="7">
          Penalty :
          <Tooltip
            className="tooltip-icon"
            placement="top"
            title={claimAssetsTooltip}
          >
            <SvgIcon name="info" viewbox="0 0 22 22.001" />
          </Tooltip>
        </Col>
        <Col sm="5" className="text-right">
          <b>{penalty}</b>
        </Col>
      </Row>
      <Button className="action-btn mt-3" block>
        Claim Assets
      </Button>
    </div>
  );
}

export default ClaimAssets;
