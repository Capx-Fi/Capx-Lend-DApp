import React from "react";
import { Button, Select, Tooltip, Radio } from "antd";
import {
  SvgIcon,
  Row,
  Col,
  CapxScrollbars,
} from "../../../../components/common";
import "./index.less";
import AccordionCard from "../../../../components/common/accordion-card/AccordionCard";
import { getLendBorrowProjects } from "../../../../utils/getLendBorrowProjects";
import { getAdditionalInfo } from "../../../../utils/getAdditionalInfo";
import LendBorrow from "../../NewOffer";

const { Option } = Select;

const LendTabLB = (collapsed) => {
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed);
  const [value, setValue] = React.useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const pathname = window.location.pathname;
  return !pathname.includes("/new") ? (
    <>
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
          <CapxScrollbars style={{ height: "70vh" }}>
            <div className="order-list">
              <div className="orderlist-card">
                <h4 className="card-title">Expired</h4>
                <AccordionCard
                  orderId={"321234"}
                  healthFactor={"1.2"}
                  paymentType={"Single Payment"}
                  orderDetails={getLendBorrowProjects()}
                  additonalInfo={getAdditionalInfo()}
                />
              </div>
              <div className="orderlist-card">
                <h4 className="card-title">Funded</h4>
                <AccordionCard
                  orderId={"321234"}
                  healthFactor={"1.2"}
                  paymentType={"Single Payment"}
                  orderDetails={getLendBorrowProjects()}
                  additonalInfo={getAdditionalInfo()}
                />
              </div>
              <div className="orderlist-card">
                <h4 className="card-title">Upcoming Orders</h4>
                <AccordionCard
                  orderId={"321234"}
                  healthFactor={"1.2"}
                  paymentType={"Single Payment"}
                  orderDetails={getLendBorrowProjects()}
                  additonalInfo={getAdditionalInfo()}
                />
              </div>
              <div className="orderlist-card">
                <AccordionCard
                  orderId={"321234"}
                  healthFactor={"1.2"}
                  paymentType={"Single Payment"}
                  orderDetails={getLendBorrowProjects()}
                  additonalInfo={getAdditionalInfo()}
                />
              </div>
            </div>
          </CapxScrollbars>
        </Col>
      </Row>
    </>
  ) : (
    <LendBorrow />
  );
};

export default LendTabLB;
