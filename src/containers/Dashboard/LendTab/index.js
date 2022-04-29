import React, { useEffect, useState } from "react";
import { Button, Select, Tooltip, Radio } from "antd";
import {
  SvgIcon,
  Row,
  Col,
  CapxScrollbars,
  LoadingScreen,
} from "../../../components/common";
import "./index.less";
import Web3 from "web3";
import { MASTER_ABI } from "../../../contracts/Master";
import { ORACLE_ABI } from "../../../contracts/Oracle";
import { fetchLenderLoans } from "../../../utils/fetchLenderLoans";

import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import AccordionCard from "../../../components/common/accordion-card/AccordionCard";
import { getOrderDetails } from "../../../utils/getOrderDetails";
import { getAdditionalInfo } from "../../../utils/getAdditionalInfo";

const { Option } = Select;

const LendTab = (collapsed) => {
  const [loans, setLoans] = useState(null);
  const web3 = new Web3(Web3.givenProvider);

  const masterContract = new web3.eth.Contract(
    MASTER_ABI,
    "0x793130DFbFDC30629015C0f07b41Dc97ec14d8B5"
  );

  const oracleContract = new web3.eth.Contract(
    ORACLE_ABI,
    "0x49d396Eb1B3E2198C32D2FE2C7146FD64f8BcF27"
  );

  const { active, account } = useWeb3React();

  useEffect(() => {
    active &&
      fetchLenderLoans(
        account,
        "https://api.thegraph.com/subgraphs/name/shreyas3336/capx-lend",
        "https://api.thegraph.com/subgraphs/name/chester-king/lendnftsubgraph",
        masterContract,
        oracleContract
      ).then((loans) => {
        setLoans(loans);
      });
  }, []);

  function totalAmount(loans) {
    let total = 0;
    loans.forEach((loan) => {
      if (loan.stableCoinAmt !== "NaN") total += parseFloat(loan.stableCoinAmt);
    });
    return total;
  }

  function totalInterest(loans) {
    let total = 0;
    loans.forEach((loan) => {
      if (loan.status === "Completed") total += parseFloat(loan.totalInterest);
    });
    return total;
  }

  function totalPending(loans) {
    let total = 0;
    loans.forEach((loan) => {
      if (loan.status === "Active") total += parseFloat(loan.totalInterest);
    });
    return total;
  }

  return loans ? (
    <>
      <Row>
        <Col>
          <div className="capx-card-secondary dashboard-statics-card">
            <ul>
              <li>
                <p>Lent Amount</p>
                <h4>{totalAmount(loans)}</h4>
              </li>
              <li>
                <p>Number of loans</p>
                <h4>{loans.length}</h4>
              </li>
              <li>
                <p>Interest Accured</p>
                <h4>${totalInterest(loans)}</h4>
              </li>
              <li>
                <p>Interest Pending</p>
                <h4>${totalPending(loans)}</h4>
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
          <div className="order-list">
            {loans.map(function (loan) {
              return (
                <div className="orderlist-card">
                  {/* <h4 className="card-title">Expired</h4> */}
                  <AccordionCard
                    orderId={loan.loanID}
                    healthFactor={"1.2"}
                    paymentType={loan.repaymentType}
                    status={loan.status}
                    orderDetails={getOrderDetails(loan)}
                    additonalInfo={getAdditionalInfo(loan)}
                  />
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </>
  ) : (
    <LoadingScreen />
  );
};

export default LendTab;
