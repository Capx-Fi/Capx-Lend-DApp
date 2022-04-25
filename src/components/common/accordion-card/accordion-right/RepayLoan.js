import { Button, Col, Radio, Row } from "antd";
import React from "react";

function RepayLoan({ repayAmount, isInstallment }) {
  const [value, setValue] = React.useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      {isInstallment && (
        <Row className="mb-2">
          <Col sm="12" className="mb-2">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Installment</Radio>
              <Radio value={2}>Complete Payment</Radio>
            </Radio.Group>
          </Col>
        </Row>
      )}
      <Row className="mb-2">
        <Col sm="12">
          <b>Repay Loan</b>
        </Col>
      </Row>
      <Row>
        <Col sm="7">Amount to be paid :</Col>
        <Col sm="5" className="text-right">
          <b>{repayAmount}</b>
        </Col>
      </Row>
      <Button className="action-btn mt-3" block>
        Repay Loan
      </Button>
    </div>
  );
}

export default RepayLoan;
