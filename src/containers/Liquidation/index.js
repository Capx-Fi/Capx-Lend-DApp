import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
import { Scrollbar } from "react-scrollbars-custom";
import { SvgIcon, Row, Col } from "../../components/common";
import "./index.less";
import LiquidationLoader from "../../components/common/liquidation-loader/LiquidationLoader";
import { LEND_ABI } from "../../contracts/Lend";
import AccordionCard from "../../components/common/accordion-card/AccordionCard";
import { getOrderDetails } from "../../utils/getOrderDetails";
import { getAdditionalInfo } from "../../utils/getAdditionalInfo";
import Web3 from "web3";
import { MASTER_ABI } from "../../contracts/Master";
import { ORACLE_ABI } from "../../contracts/Oracle";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { convertToInternationalCurrencySystem } from "../../utils/convertToInternationalCurrencySystem";
import { getFilterValues } from "../../utils/getFilterValues";
// import { fetchLiquidationLoans } from "../../utils/fetchLiquidationLoans";
import { fetchLoanDetails } from "../../utils/fetchLoanDetails";
import { fetchLiquidationLoans } from "../../utils/fetchLiquidationLoans";
import noLiquidate from "../../assets/images/svg/no-liquidate.svg";
import { useQuery } from "react-query";
import {
	getLendContract,
	getMasterContract,
	getMasterURL,
	getOracleContract,
} from "../../constants/getChainConfig";
const { Option } = Select;
const Liquidation = () => {
	const [filters, setFilters] = useState({
		lendAsset: "",
		companyAsset: "",
		status: "",
	});
	const [filteredLoans, setFilteredLoans] = useState(null);
	const [sortBy, setSortBy] = useState("stableCoinAmt");
	const web3 = new Web3(Web3.givenProvider);
	const { active, account, chainId } = useWeb3React();

	const masterContract = new web3.eth.Contract(
		MASTER_ABI,
		getMasterContract(chainId)
	);

	const oracleContract = new web3.eth.Contract(
		ORACLE_ABI,
		getOracleContract(chainId)
	);

	const lendContract = new web3.eth.Contract(
		LEND_ABI,
		getLendContract(chainId)
	);

	const masterURL = getMasterURL(chainId);

	const getLoans = async () => {
		const _loans = await fetchLiquidationLoans(
			account,
			masterURL,
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
	} = useQuery(["liquidation", account, chainId, active], getLoans);

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

	function availableLoanStatus(loans) {
		let status = [];
		loans.forEach((loan) => {
			if (!status.includes(loan.status)) status.push(loan.status);
		});
		return status;
	}
	function filterLoansByCompanyAsset(companyAsset) {
		setFilters({ ...filters, companyAsset });
	}

	function filterLoansByLendAsset(lendAsset) {
		setFilters({ ...filters, lendAsset });
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
			<Row className="heading-row">
				<Col sm="12">
					<h2>Liquidation Market</h2>
					<p>Liquidate the collateral from Defaulted loans.</p>
				</Col>
				<Col sm="12" className="filterby-heading"><h3> Filter By </h3></Col>
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
							<p>{"Company Asset:"}</p>
							<Select
								dropdownClassName="capx-dropdown"
								suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
								defaultValue=""
								bordered={false}
								onChange={(e) => filterLoansByCompanyAsset(loans, e)}
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
								onChange={(e) => filterLoansByLendAsset(loans, e)}
							>
								<Option value={""}>All</Option>
								{getFilterValues(loans, "stableCoinTicker").map(function (
									wvt_asset
								) {
									return <Option value={wvt_asset}>{wvt_asset}</Option>;
								})}
							</Select>
						</div>
					</div>
					{/* <Select
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
          </Select> */}
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
			</Row>
			<Row> 
				<Col>
					<Scrollbar style={{ height: "calc(100vh - 322px)" }}>
						<div className="order-list">
							<h2 className="card-title">Defaulted Loans</h2>
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
														orderDetails={getOrderDetails(loan)}
														additonalInfo={getAdditionalInfo(loan)}
														loan={loan}
														isBorrower={false}
														from={"liquidation"}
														status={loan.status}
														lendContract={lendContract}
														masterContract={masterContract}
													/>
												)
											);
										})}
									</div>
								);
							})}
							{availableLoanStatus(filteredLoans)?.length === 0 && (
								<div className="no-orders">
									<img src={noLiquidate} alt="No Borrows" />
									<h2>Nothing to Liquidate!</h2>
								</div>
							)}
						</div>
					</Scrollbar>
				</Col>
			</Row>
		</>
	) : (
		<LiquidationLoader />
	);
};
export default Liquidation;
