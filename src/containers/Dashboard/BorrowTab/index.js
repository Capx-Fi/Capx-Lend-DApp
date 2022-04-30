import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
import {
  SvgIcon,
  Row,
  Col,
  CapxScrollbars,
  LoadingScreen,
} from "../../../components/common";
import "./index.less";
import AccordionCard from "../../../components/common/accordion-card/AccordionCard";
import { getOrderDetails } from "../../../utils/getOrderDetails";
import { getAdditionalInfo } from "../../../utils/getAdditionalInfo";
import Web3 from "web3";
import { MASTER_ABI } from "../../../contracts/Master";
import { ORACLE_ABI } from "../../../contracts/Oracle";
import { fetchBorrowerLoans } from "../../../utils/fetchBorrowerLoans";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { convertToInternationalCurrencySystem } from "../../../utils/convertToInternationalCurrencySystem";

const { Option } = Select;

const BorrowTab = () => {
  const [loans, setLoans] = useState(null);
  const [filteredLoans, setFilteredLoans] = useState(null);
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
      getLoans().then((loans) => {
        console.log(loans);
        setFilteredLoans(loans);
        setLoans(loans);
      });
  }, []);

  const getLoans = async() => {
    const _loans = await fetchBorrowerLoans(
    "https://api.thegraph.com/subgraphs/name/shreyas3336/capx-lend",
    masterContract,
    oracleContract
    );
    console.log("L",_loans);
    return _loans;
}

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

  function totalPaidOff(loans) {
    let total = 0;
    loans.forEach((loan) => {
      if (loan.status === "Completed") total += parseFloat(loan.payOffAmt);
    });
    return total;
  }

  function availableLoanStatus(loans) {
    let status = [];
    loans.forEach((loan) => {
      if (!status.includes(loan.status)) status.push(loan.status);
    });

    return status;
  }

  function filterLoansByStatus(loans, status) {
    if (status !== "")
      setFilteredLoans(loans.filter((loan) => loan.status === status));
    else setFilteredLoans(loans);
  }

  return loans ? (
    <>
      <Row>
        <Col>
          <div className="capx-card-secondary dashboard-statics-card">
            <ul>
              <li>
                <p>Borrowed Amount</p>
                <h4>{convertToInternationalCurrencySystem(totalAmount(loans))} </h4>
              </li>
              <li>
                <p>Active loans</p>
                <h4>{loans.length}</h4>
              </li>
              <li>
                <p>Interest Paid</p>
                <h4>${convertToInternationalCurrencySystem(totalInterest(loans))}</h4>
              </li>
              <li>
                <p>Loan Amount Repayed</p>
                <h4>${convertToInternationalCurrencySystem(totalPaidOff(loans))}</h4>
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
            onChange={(e) => filterLoansByStatus(loans, e)}
          >
            <Option value={""}>All</Option>
            {["Initiated", "Completed", "Cancelled"].map(function (status) {
              return <Option value={status}>{status}</Option>;
            })}
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
            {availableLoanStatus(filteredLoans).map(function (status) {
              return (
                <div className="orderlist-card">
                  <h4 className="card-title">{status}</h4>
                  {filteredLoans.map(function (loan) {
                    return (
                      loan.status === status && (
                        <AccordionCard
                          orderId={loan.loanID}
                          healthFactor={loan.healthFactor}
                          paymentType={loan.repaymentType}
                          status={loan.status}
                          orderDetails={getOrderDetails(loan)}
                          additonalInfo={getAdditionalInfo(loan)}
                        />
                      )
                    );
                  })}
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

export default BorrowTab;
