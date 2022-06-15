import React, { useEffect, useState } from "react";
import { Button, Select, Skeleton } from "antd";
import { SvgIcon, Row, Col, LoadingScreen } from "../../../components/common";
import { Scrollbar } from "react-scrollbars-custom";
import DashboardLoader from "../../../components/common/dashboard-loader/DasboardLoader";
import "./index.less";
import { LEND_ABI } from "../../../contracts/Lend";
import AccordionCard from "../../../components/common/accordion-card/AccordionCard";
import { getOrderDetails } from "../../../utils/getOrderDetails";
import { getAdditionalInfo } from "../../../utils/getAdditionalInfo";

import { MASTER_ABI } from "../../../contracts/Master";
import { ORACLE_ABI } from "../../../contracts/Oracle";
import { convertToInternationalCurrencySystem } from "../../../utils/convertToInternationalCurrencySystem";
import { getFilterValues } from "../../../utils/getFilterValues";
import { fetchBorrowerLoans } from "../../../utils/fetchBorrowerLoans";
import noBorrow from "../../../assets/images/svg/no-borrow.svg";
import { useQuery } from "react-query";
import {
  getLendContract,
  getMasterContract,
  getMasterURL,
  getOracleContract,
} from "../../../constants/getChainConfig";
import useWagmi from "../../../useWagmi";
import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider);

const { Option } = Select;

const BorrowTab = () => {
  const [filters, setFilters] = useState({
    lendAsset: "",
    companyAsset: "",
    status: "",
  });

  const [filteredLoans, setFilteredLoans] = useState(null);
  const [sortBy, setSortBy] = useState("stableCoinAmt");
  const [refresh, setRefresh] = useState(false);
  const { active, account, chainId } = useWagmi();

  const masterContract = new web3.eth.Contract(
    MASTER_ABI,
    getMasterContract(chainId)
  );

  const oracleContract = new web3.eth.Contract(
    ORACLE_ABI,
    getOracleContract(chainId).toString()
  );

  console.log("oracleContract", oracleContract);

  const lendContract = new web3.eth.Contract(
    LEND_ABI,
    getLendContract(chainId).toString()
  );

  const masterURL = getMasterURL(chainId).toString();

  const getLoans = async () => {
    console.log("getLoans---");
    const _loans = await fetchBorrowerLoans(
      account,
      masterURL,
      masterContract,
      oracleContract
    );
    console.log("L", _loans);
    console.log("Filters", getFilterValues(_loans, "stableCoinTicker"));
    return _loans;
  };

  //useQuery

  const {
    data: loans,
    isLoading,
    isFetched,
    isFetching,
    isFetchedAfterMount,
  } = useQuery(["borrowDashboard", account, chainId, active], getLoans);

  useEffect(() => {
    if (loans) {
      let finalLoans = loans;
      if (filters?.lendAsset !== "") {
        finalLoans = finalLoans.filter(
          (loan) => loan.stableCoinTicker === filters.lendAsset
        );
      }
      if (filters?.companyAsset !== "") {
        finalLoans = finalLoans.filter(
          (loan) => loan.collateralTicker === filters.companyAsset
        );
      }
      if (filters?.status !== "") {
        finalLoans = finalLoans.filter(
          (loan) => loan.status === filters.status
        );
      }
      sortLoans(finalLoans);
    }
  }, [isFetched, isFetchedAfterMount, loans, filters, sortBy]);

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

  function sortLoans(finalLoans) {
    console.log("sortLoans", sortBy);
    let arrayCopy = [...finalLoans];
    arrayCopy.sort((a, b) => {
      console.log("a", b[sortBy]);
      if (parseFloat(a[sortBy]) < parseFloat(b[sortBy])) return -1;
      if (parseFloat(a[sortBy]) > parseFloat(b[sortBy])) return 1;
      return 0;
    });
    setFilteredLoans(arrayCopy);
  }

  return !isLoading && !isFetching && filteredLoans ? (
    <>
      <h1 className="mb-2">Overview</h1>
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
        <Col sm="12" className="filterby-heading">
          <h3> Filter By </h3>
        </Col>
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
            onChange={(e) => setSortBy(e)}
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
          <Scrollbar className="dashboard-scroll">
            <div className="order-list">
              {filteredLoans && (
                // availableLoanStatus(filteredLoans).map(function (status) {
                //   return (
                <div className="orderlist-card">
                  {/*  //       <h4 className="card-title">{status}</h4> */}
                  {filteredLoans.map(function (loan) {
                    return (
                      /*      loan.status === status && */ <AccordionCard
                        orderId={loan.loanID}
                        healthFactor={loan.healthFactor}
                        paymentType={loan.repaymentType}
                        status={loan.status}
                        orderDetails={getOrderDetails(loan)}
                        additonalInfo={getAdditionalInfo(loan)}
                        loan={loan}
                        from={"borrowDashboard"}
                        isBorrower={true}
                        lendContract={lendContract}
                        masterContract={masterContract}
                      />
                    );
                  })}
                </div>
              )}
            </div>
            <div>
              {availableLoanStatus(filteredLoans)?.length === 0 && (
                <div className="no-orders">
                  <img src={noBorrow} alt="No Borrows" />
                  <h2>Oops! No Borrow Orders Found!</h2>
                </div>
              )}
            </div>
          </Scrollbar>
        </Col>
      </Row>
    </>
  ) : (
    <DashboardLoader />
  );
};

export default BorrowTab;
