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
import { LEND_ABI } from "../../../contracts/Lend";
import AccordionCard from "../../../components/common/accordion-card/AccordionCard";
import { getOrderDetails } from "../../../utils/getOrderDetails";
import { getAdditionalInfo } from "../../../utils/getAdditionalInfo";
import Web3 from "web3";
import { MASTER_ABI } from "../../../contracts/Master";
import { ORACLE_ABI } from "../../../contracts/Oracle";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { convertToInternationalCurrencySystem } from "../../../utils/convertToInternationalCurrencySystem";
import { getFilterValues } from "../../../utils/getFilterValues";
import { fetchBorrowerLoans } from "../../../utils/fetchBorrowerLoans";
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

  const lendContract = new web3.eth.Contract(
    LEND_ABI,
    "0x309D0Ff4b655bAD183A3FA88A0547b41e877DcF1"
  );

  const { active, account } = useWeb3React();

  useEffect(() => {
    active &&
      getLoans().then((loans) => {
        setFilteredLoans(loans);
        setLoans(loans);
      });
  }, []);

  //filter logic
  const [filters, setFilters] = useState({
    lendAsset: "",
    companyAsset: "",
    status: "",
  });

  useEffect(() => {
    let finalLoans = loans;
    if (filters.lendAsset !== "") {
      finalLoans = finalLoans.filter(
        (loan) => loan.stableCoinTicker === filters.lendAsset
      );
    }
    if (filters.companyAsset !== "") {
      finalLoans = finalLoans.filter(
        (loan) => loan.collateralTicker === filters.companyAsset
      );
    }
    if (filters.status !== "") {
      finalLoans = finalLoans.filter((loan) => loan.status === filters.status);
    }

    setFilteredLoans(finalLoans);
  }, [filters, loans]);

  function filterLoansByCompanyAsset(companyAsset) {
    setFilters({ ...filters, companyAsset });
  }

  function filterLoansByLendAsset(lendAsset) {
    setFilters({ ...filters, lendAsset });
  }

  function filterLoansByStatus(status) {
    setFilters({ ...filters, status });
  }

  //end of filter logic

  const getLoans = async () => {
    const _loans = await fetchBorrowerLoans(
      "0xBC7a2925D5C194D1DbEdeB99F13c326851dC8230",
      "https://api.thegraph.com/subgraphs/name/shreyas3336/capx-lend",
      masterContract,
      oracleContract
    );
    console.log("L", _loans);
    console.log("Filters", getFilterValues(_loans, "stableCoinTicker"));
    return _loans;
  };

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

  function sortBy(key) {
    let arrayCopy = [...filteredLoans];
    arrayCopy.sort((a, b) => {
      if (parseFloat(a[key]) < parseFloat(b[key])) return -1;
      if (parseFloat(a[key]) > parseFloat(b[key])) return 1;
      return 0;
    });
    setFilteredLoans(arrayCopy);
  }
  return loans ? (
    <>
      <br></br>
      <h1>Overview</h1>
      <Row>
        <Col>
          <div className="capx-card-secondary dashboard-statics-card">
            <ul>
              <li>
                <p>Borrowed Amount</p>
                <h4>
                  $ {convertToInternationalCurrencySystem(totalAmount(loans))}{" "}
                </h4>
              </li>
              <li>
                <p>Active loans</p>
                <h4>{loans.length}</h4>
              </li>
              <li>
                <p>Interest Paid</p>
                <h4>
                  $ {convertToInternationalCurrencySystem(totalInterest(loans))}
                </h4>
              </li>
              <li>
                <p>Loan Amount Repayed</p>
                <h4>
                  $ {convertToInternationalCurrencySystem(totalPaidOff(loans))}
                </h4>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      <Row className="heading-row">
        <Col className="left-col">
          {/* <Select
            dropdownClassName="capx-dropdown"
            suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
            placeholder="Loan Type"
            bordered={false}
          >
            <Option value="Single Repayment">Single Repayment</Option>
            <Option value="Instalment Repayment">Instalment Repayment</Option>
          </Select> */}
          <div className="filter-container">
            <div className="select-container">
              <p>{"Company Type:"}</p>
              <Select
                dropdownClassName="capx-dropdown"
                suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
                defaultValue=""
                bordered={false}
                onChange={(e) => filterLoansByCompanyAsset(e)}
              >
                <Option value={""}>All</Option>
                {getFilterValues(loans, "collateralTicker").map(function (
                  wvt_asset
                ) {
                  return <Option value={wvt_asset}>{wvt_asset}</Option>;
                })}
              </Select>
            </div>
            <div className="select-container">
              <p>{"Lending Asset:"}</p>
              <Select
                dropdownClassName="capx-dropdown"
                suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
                defaultValue=""
                bordered={false}
                onChange={(e) => filterLoansByLendAsset(e)}
              >
                <Option value={""}>All</Option>
                {getFilterValues(loans, "stableCoinTicker").map(function (
                  wvt_asset
                ) {
                  return <Option value={wvt_asset}>{wvt_asset}</Option>;
                })}
              </Select>
            </div>
            <div className="select-container">
              <p>{"Loan Status:"}</p>
              <Select
                dropdownClassName="capx-dropdown"
                suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
                defaultValue=""
                bordered={false}
                onChange={(e) => filterLoansByStatus(e)}
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
            onChange={(e) => sortBy(e)}
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
          <CapxScrollbars style={{ height: "49.5vh" }}>
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
                            loan={loan}
                            isBorrower={true}
                            lendContract={lendContract}
                            masterContract={masterContract}
                          />
                        )
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </CapxScrollbars>
        </Col>
      </Row>
    </>
  ) : (
    <LoadingScreen />
  );
};

export default BorrowTab;
