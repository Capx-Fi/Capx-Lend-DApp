import { Button, Col, Row } from "antd";
import React from "react";

function AcceptLoanOffer({ loanAmount }) {
  return (
    <div>
      <Row className="mb-2">
        <Col sm="12">
          <b>Accept Loan Offer</b>
        </Col>
      </Row>
      <Row>
        <Col sm="7">Loan Amount : </Col>
        <Col sm="5" className="text-right">
          <b>{loanAmount}</b>
        </Col>
      </Row>
      <Button className="action-btn mt-3" block>
        Accept Loan
      </Button>
    </div>
  );
}

export default AcceptLoanOffer;
