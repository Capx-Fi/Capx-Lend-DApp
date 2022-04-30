import React, { useEffect, useState } from "react";
import { convertToInternationalCurrencySystem } from "../../../utils/convertToInternationalCurrencySystem";
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
import { getFilterValues } from "../../../utils/getFilterValues";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import AccordionCard from "../../../components/common/accordion-card/AccordionCard";
import { getOrderDetails } from "../../../utils/getOrderDetails";
import { getAdditionalInfo } from "../../../utils/getAdditionalInfo";

const { Option } = Select;

const LendTab = (collapsed) => {
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

  // useEffect(() => {
  //   active &&
  //     fetchLenderLoans(
  //       account,
  //       "https://api.thegraph.com/subgraphs/name/shreyas3336/capx-lend",
  //       "https://api.thegraph.com/subgraphs/name/chester-king/lendnftsubgraph",
  //       masterContract,
  //       oracleContract
  //     ).then((loans) => {
  //       setLoans(loans);
  //     });
  // }, []);
  useEffect(() => {
    active &&
      getLoans().then((loans) => {
        console.log(loans);
        setFilteredLoans(loans);
        setLoans(loans);
      });
  }, []);
  const getLoans = async() => {
    const _loans = await fetchLenderLoans(
    "0xBC7a2925D5C194D1DbEdeB99F13c326851dC8230",
    "https://api.thegraph.com/subgraphs/name/shreyas3336/capx-lend",
    "https://api.thegraph.com/subgraphs/name/chester-king/lendnftsubgraph",
    masterContract,
    oracleContract
    );
    console.log("L",_loans);
    console.log("Filters", getFilterValues(_loans,"stableCoinTicker"));
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

  function totalPending(loans) {
    let total = 0;
    loans.forEach((loan) => {
      if (loan.status === "Active") total += parseFloat(loan.totalInterest);
    });
    return total;
  }
  function filterLoansByCompanyAsset(loans, companyAsset) {
    if (companyAsset !== "") {
      setFilteredLoans(loans.filter((loan) => loan.collateralTicker === companyAsset));
    } else setFilteredLoans(loans);
  }

  function filterLoansByLendAsset(loans, lendAsset) {
    if (lendAsset !== "") {
      setFilteredLoans(loans.filter((loan) => loan.stableCoinTicker === lendAsset));
    } else setFilteredLoans(loans);
  }

  function filterLoansByStatus(loans, status) {
    if (status !== "")
      setFilteredLoans(loans.filter((loan) => loan.status === status));
    else setFilteredLoans(loans);
  }

  function availableLoanStatus(loans) {
    let status = [];
    loans.forEach((loan) => {
      if (!status.includes(loan.status)) status.push(loan.status);
    });

    return status;
  }
  return loans ? (
    <>
      <Row>
        <Col>
          <div className="capx-card-secondary dashboard-statics-card">
            <ul>
              <li>
                <p>Lent Amount</p>
                <h4>{convertToInternationalCurrencySystem(totalAmount(loans))}</h4>
              </li>
              <li>
                <p>Number of loans</p>
                <h4>{loans.length}</h4>
              </li>
              <li>
                <p>Interest Accured</p>
                <h4>${convertToInternationalCurrencySystem(totalInterest(loans))}</h4>
              </li>
              <li>
                <p>Interest Pending</p>
                <h4>${convertToInternationalCurrencySystem(totalPending(loans))}</h4>
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
            <Option value="1">Loan Type</Option>
            <Option value="2">Loan Type</Option>
          </Select> */}
          <Select
            dropdownClassName="capx-dropdown"
            suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
            placeholder="Company Asset"
            bordered={false}
            onChange={(e) => filterLoansByCompanyAsset(loans, e)}
          >
            <Option value={""}>All</Option>
            {getFilterValues(loans, "collateralTicker").map(function (wvt_asset) {
              return <Option value={wvt_asset}>{wvt_asset}</Option>;
            })}
          </Select>
          <Select
            dropdownClassName="capx-dropdown"
            suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
            placeholder="Lending Asset"
            bordered={false}
            onChange={(e) => filterLoansByLendAsset(loans, e)}
          >
            <Option value={""}>All</Option>
            {getFilterValues(loans, "stableCoinTicker").map(function (wvt_asset) {
              return <Option value={wvt_asset}>{wvt_asset}</Option>;
            })}
          </Select>
          <Select
            dropdownClassName="capx-dropdown"
            suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
            placeholder="Loan Status"
            bordered={false}
            onChange={(e) => filterLoansByStatus(loans, e)}
          >
            <Option value={""}>All</Option>
            {["Initiated", "Completed", "Cancelled", , "Expired", "Defaulted", "Funded", "Active"].map(function (status) {
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
                          loan
                        />
                      )
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
