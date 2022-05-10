import React, { useEffect, useState } from "react";
import { convertToInternationalCurrencySystem } from "../../../utils/convertToInternationalCurrencySystem";
import { Button, Select, Tooltip, Skeleton } from "antd";
import { Scrollbar } from "react-scrollbars-custom";
import { SvgIcon, Row, Col, LoadingScreen } from "../../../components/common";
import DashboardLoader from "../../../components/common/dashboard-loader/DasboardLoader";
import "./index.less";
import Web3 from "web3";
import { MASTER_ABI } from "../../../contracts/Master";
import { ORACLE_ABI } from "../../../contracts/Oracle";
import { LEND_ABI } from "../../../contracts/Lend";
import { fetchLenderLoans } from "../../../utils/fetchLenderLoans";
import { getFilterValues } from "../../../utils/getFilterValues";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import AccordionCard from "../../../components/common/accordion-card/AccordionCard";
import { getOrderDetails } from "../../../utils/getOrderDetails";
import { getAdditionalInfo } from "../../../utils/getAdditionalInfo";
import noLend from "../../../assets/images/svg/no-lend.svg";
import { useQuery } from "react-query";

const { Option } = Select;

const LendTab = (collapsed) => {
  const [filteredLoans, setFilteredLoans] = useState(null);
  const web3 = new Web3(Web3.givenProvider);
  const [sortBy, setSortBy] = useState("stableCoinAmt");

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

  const { active, account, chainId } = useWeb3React();

  //filter logic
  const [filters, setFilters] = useState({
    lendAsset: "",
    companyAsset: "",
    status: "",
  });

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
    const _loans = await fetchLenderLoans(
      account,
      "https://api.thegraph.com/subgraphs/name/shreyas3336/capx-lend",
      "https://api.thegraph.com/subgraphs/name/chester-king/lendnftsubgraph",
      masterContract,
      oracleContract
    );
    console.log("L", _loans);
    console.log("Filters", getFilterValues(_loans, "stableCoinTicker"));
    return _loans;
  };

  const {
    data: loans,
    isLoading,
    isFetched,
    isFetchedAfterMount,
    isFetching,
  } = useQuery(["lendDashboard", account, chainId, active], getLoans);

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
  }, [isFetching, loans, filters, sortBy]);

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

  function availableLoanStatus(loans) {
    let status = [];
    loans.forEach((loan) => {
      if (!status.includes(loan.status)) status.push(loan.status);
    });

    return status;
  }
  return !isLoading && !isFetching && filteredLoans ? (
    <>
      <h1 className="mb-2">Overview</h1>
      <Row>
        <Col>
          <div className="capx-card-secondary dashboard-statics-card">
            <ul>
              <li>
                <p>Lent Amount</p>
                <h4>
                  $ {convertToInternationalCurrencySystem(totalAmount(loans))}
                </h4>
              </li>
              <li>
                <p>Number of loans</p>
                <h4>{loans.length}</h4>
              </li>
              <li>
                <p>Interest Accured</p>
                <h4>
                  $ {convertToInternationalCurrencySystem(totalInterest(loans))}
                </h4>
              </li>
              <li>
                <p>Interest Pending</p>
                <h4>
                  $ {convertToInternationalCurrencySystem(totalPending(loans))}
                </h4>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      <Row className="heading-row">
        <Col className="left-col">
          <h3> Filter By </h3>
          {/* <Select
            dropdownClassName="capx-dropdown"
            suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
            placeholder="Loan Type"
            bordered={false}
          >
            <Option value="1">Loan Type</Option>
            <Option value="2">Loan Type</Option>
          </Select> */}
          <div className="filter-container">
            <div className="select-container">
              <p>{"Company Asset"}</p>
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
              <p>{"Lending Asset"}</p>
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
              <p>{"Loan Status"}</p>
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
            value={sortBy}
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
          <Scrollbar style={{ height: "calc(100vh - 510px)" }}>
            <div className="order-list">
              {/* {availableLoanStatus(filteredLoans).map(function (status) {
                return ( */}
              <div className="orderlist-card">
                {/* <h4 className="card-title">{status}</h4> */}
                {filteredLoans.map(function (loan) {
                  return (
                    <AccordionCard
                      orderId={loan.loanID}
                      healthFactor={loan.healthFactor}
                      paymentType={loan.repaymentType}
                      status={loan.status}
                      orderDetails={getOrderDetails(loan)}
                      additonalInfo={getAdditionalInfo(loan)}
                      loan={loan}
                      from={"lendDashboard"}
                      isBorrower={false}
                      lendContract={lendContract}
                      masterContract={masterContract}
                      isLendDashboard={true}
                    />
                  );
                })}
                {/* <h4 className="card-title">{status}</h4>
                    { <h4 className="card-title">Expired</h4> }
                    <AccordionCard
                      orderId={loan.loanID}
                      healthFactor={"1.2"}
                      paymentType={loan.repaymentType}
                      status={loan.status}
                      orderDetails={getOrderDetails(loan)}
                      additonalInfo={getAdditionalInfo(loan)}
                    /> */}
              </div>
              );
              {availableLoanStatus(filteredLoans)?.length === 0 && (
                <div className="no-orders">
                  <img src={noLend} alt="No Borrows" />
                  <h2>Oops! No Lend Orders Found!</h2>
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

export default LendTab;
