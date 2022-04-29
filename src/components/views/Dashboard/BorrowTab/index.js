import React from "react";
import { Select } from "antd";
import { SvgIcon, Row, Col, CapxScrollbars } from "../../../common";
import "./index.less";
import AccordionCard from "../../../common/accordion-card/AccordionCard";
import { getOrderDetails } from "../../../../utils/getOrderDetails";
import { getAdditionalInfo } from "../../../../utils/getAdditionalInfo";

const { Option } = Select;

const BorrowTab = (collapsed) => {
  return (
    <>
      <Row>
        <Col>
          <div className="capx-card-secondary dashboard-statics-card">
            <ul>
              <li>
                <p>Borrowed Amount</p>
                <h4>125567.11 </h4>
              </li>
              <li>
                <p>Active loans</p>
                <h4>3</h4>
              </li>
              <li>
                <p>Interest Paid</p>
                <h4>$560.00</h4>
              </li>
              <li>
                <p>Loan Amount Repayed</p>
                <h4>$560.00</h4>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      <Row className="heading-row">
        <Col className="left-col">
          <Select
            dropdownClassName="capx-dropdown"
            suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
            placeholder="Loan Type"
            bordered={false}
          >
            <Option value="1">Loan Type</Option>
            <Option value="2">Loan Type</Option>
          </Select>
          <Select
            dropdownClassName="capx-dropdown"
            suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
            placeholder="Company Asset"
            bordered={false}
          >
            <Option value="1">Company Asset</Option>
            <Option value="2">Company Asset</Option>
          </Select>
          <Select
            dropdownClassName="capx-dropdown"
            suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
            placeholder="Lending Asset"
            bordered={false}
          >
            <Option value="1">Lending Asset</Option>
            <Option value="2">Lending Asset</Option>
          </Select>
          <Select
            dropdownClassName="capx-dropdown"
            suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
            placeholder="Loan Status"
            bordered={false}
          >
            <Option value="1">Loan Status</Option>
            <Option value="2">Loan Status</Option>
          </Select>
        </Col>
        <Col className="right-col">
          <Select
            dropdownClassName="capx-dropdown"
            suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
            placeholder="Sort By"
            style={{ minWidth: 120 }}
          >
            <Option value="sb1">Order Status</Option>
            <Option value="sb2">Order Type</Option>
            <Option value="sb3">Health Factor</Option>
          </Select>
        </Col>
        <Col sm="12">
          <h2>All Projects</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <CapxScrollbars style={{ height: "59vh" }}>
            <div className="order-list">
              <div className="orderlist-card">
                <h4 className="card-title">Expired</h4>
                <AccordionCard
                  orderId={"321234"}
                  healthFactor={"1.2"}
                  paymentType={"Single Payment"}
                  status="Expired"
                  orderDetails={getOrderDetails()}
                  additonalInfo={getAdditionalInfo()}
                />
              </div>
              <div className="orderlist-card">
                <h4 className="card-title">Funded</h4>
                <AccordionCard
                  orderId={"321234"}
                  healthFactor={"1.2"}
                  paymentType={"Single Payment"}
                  status="Funded"
                  orderDetails={getOrderDetails()}
                  additonalInfo={getAdditionalInfo()}
                />
              </div>
              <div className="orderlist-card">
                <h4 className="card-title">Upcoming Orders</h4>
                <AccordionCard
                  orderId={"321234"}
                  healthFactor={"1.2"}
                  paymentType={"Single Payment"}
                  status="Active"
                  orderDetails={getOrderDetails()}
                  additonalInfo={getAdditionalInfo()}
                />
              </div>
              <div className="orderlist-card">
                <AccordionCard
                  orderId={"321234"}
                  healthFactor={"1.2"}
                  paymentType={"Installment"}
                  status="Active"
                  orderDetails={getOrderDetails()}
                  additonalInfo={getAdditionalInfo()}
                />
              </div>
              <div className="orderlist-card">
                <h4 className="card-title">Orders</h4>
                <AccordionCard
                  orderId={"321234"}
                  healthFactor={"1.2"}
                  paymentType={"Single Payment"}
                  status="Completed"
                  statusType="completed-loan"
                  statusTitle="Loan Completed"
                  orderDetails={getOrderDetails()}
                  additonalInfo={getAdditionalInfo()}
                />
              </div>
              <div className="orderlist-card">
                <h4 className="card-title">Orders</h4>
                <AccordionCard
                  orderId={"321234"}
                  healthFactor={"1.2"}
                  paymentType={"Single Payment"}
                  status="Cancelled"
                  statusType="cancelled-loan"
                  statusTitle="Loan Cancelled"
                  orderDetails={getOrderDetails()}
                  additonalInfo={getAdditionalInfo()}
                />
              </div>
            </div>
          </CapxScrollbars>
        </Col>
      </Row>
    </>
  );
};

export default BorrowTab;
