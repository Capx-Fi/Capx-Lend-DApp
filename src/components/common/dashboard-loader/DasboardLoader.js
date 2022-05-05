import React from "react";
import { Button, Select, Skeleton } from "antd";
import {
    SvgIcon,
    Row,
    Col,
  } from "..";
import "../../../containers/Dashboard/BorrowTab/index.less";

const { Option } = Select;

function DashboardLoader() {
	return (
		<>
      <h1 className="mb-2">Overview</h1>
			<Row>
          <Col>
          <div className="capx-card-secondary dashboard-statics-card">
              <Skeleton active>
              </Skeleton>
          </div>
          </Col>
      </Row>
      <Row className="heading-row">
        <Col className="left-col">
          <h3> Filter By </h3>
          <div className="filter-container">
            <div className="select-container">
              <p>{"Company Type:"}</p>
              <Select
                dropdownClassName="capx-dropdown"
                suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
                defaultValue=""
                bordered={false}
                disabled={true}
              >
                <Option value={""}>All</Option>
              </Select>
            </div>
            <div className="select-container">
              <p>{"Lending Asset:"}</p>
              <Select
                dropdownClassName="capx-dropdown"
                suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
                defaultValue=""
                bordered={false}
                disabled={true}
              >
                <Option value={""}>All</Option>
              </Select>
            </div>
            <div className="select-container">
              <p>{"Loan Status:"}</p>
              <Select
                dropdownClassName="capx-dropdown"
                suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
                defaultValue=""
                disabled={true}
                bordered={false}
              >
                <Option value={""}>All</Option>
                {[
                  "Initiated",
                  "Completed",
                  "Cancelled",
                  "Expired",
                  "Defaulted",
                  "Funded",
                  "Active",
                ].map(function (status) {
                  return <Option value={status}>{status}</Option>;
                })}
              </Select>
            </div>
          </div>
        </Col>
        <Col className="right-col">
          <Select
            dropdownClassName="capx-dropdown"
            suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
            placeholder="Sort By"
            style={{ minWidth: 120 }}
            disabled={true}
          >
            <Option value="stableCoinAmt">Loan Amount</Option>
            <Option value="interestRate">Interest Rate</Option>
            <Option value="loanToValue">Loan-To-Value</Option>
          </Select>
        </Col>
        <Col sm="12">
          <h2>All Projects</h2>
        </Col>
      </Row>
      <Row>
        <Col>
        <div className="capx-card" style={{ marginBottom: "20px" }}>
          <Skeleton active>
          </Skeleton>
        </div>
        <div className="capx-card" style={{ marginBottom: "20px" }}>
          <Skeleton active>
          </Skeleton>
        </div>
        </Col>
      </Row>
		</>
	);
}

export default DashboardLoader;
