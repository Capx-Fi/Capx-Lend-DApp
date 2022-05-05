import React from "react";
import { Button, Select, Skeleton } from "antd";
import {
    SvgIcon,
    Row,
    Col,
  } from "..";
import "../../../containers/Lend-Borrow/ViewProjects/LendTabLB/index.less";

const { Option } = Select;

function MarketLoader() {
	return (
		<>
      <h1 className="mb-2">Marketplace</h1>
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
      </Row>
      <Row>
        <Col sm="12">
          <h3>All Offers</h3>
        </Col>
        <Col>
        <div className="capx-card" style={{ marginBottom: "20px" }}>
          <Skeleton active>
          </Skeleton>
        </div>
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

export default MarketLoader;