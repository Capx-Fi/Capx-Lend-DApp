import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
import { SvgIcon, Row, Col } from "../../../../components/common";
import "./index.less";
import MarketLoader from "../../../../components/common/market-loader/MarketLoader";
import { LEND_ABI } from "../../../../contracts/Lend";
import { MASTER_ABI } from "../../../../contracts/Master";
import { ORACLE_ABI } from "../../../../contracts/Oracle";
import { getOrderDetails } from "../../../../utils/getOrderDetails";
import { getAdditionalInfo } from "../../../../utils/getAdditionalInfo";
import Web3 from "web3";
import AccordionCard from "../../../../components/common/accordion-card/AccordionCard";
import { fetchLoanDetailsBorrower } from "../../../../utils/fetchLoanDetailsBorrower";
import NewLendOfferComponent from "../../NewLendOfferComponent";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { getFilterValues } from "../../../../utils/getFilterValues";
import noLend from "../../../../assets/images/svg/no-lend.svg";

const { Option } = Select;

const LendTabLB = (collapsed) => {
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

	//end of filter logic

	const getLoans = async () => {
		const _loans = await fetchLoanDetailsBorrower(
			account,
			"https://api.thegraph.com/subgraphs/name/shreyas3336/capx-lend",
			masterContract,
			oracleContract
		);
		console.log("L", _loans);
		console.log("Filters", getFilterValues(_loans, "stableCoinTicker"));
		console.log("LOANS", _loans);
		return _loans;
	};

	function availableLoanStatus(loans) {
		let status = [];
		loans.forEach((loan) => {
			if (!status.includes(loan.status)) status.push(loan.status);
		});

		return status;
	}

	const pathname = window.location.pathname;
	return !pathname.includes("/new") ? (
		filteredLoans ? (
			<>
				<h1 className="mb-2">Marketplace</h1>
				<Row className="heading-row">
					<Col className="left-col">
						<h3> Filter By </h3>
						<div className="filter-container">
							<div className="select-container">
								<p>{"Company Asset:"}</p>
								<Select
									dropdownClassName="capx-dropdown"
									suffixIcon={
										<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />
									}
									defaultValue=""
									bordered={false}
									onChange={(e) => filterLoansByCompanyAsset(e)}
								>
									<Option value={""}>All</Option>
									{getFilterValues(filteredLoans, "collateralTicker").map(
										function (wvt_asset) {
											return <Option value={wvt_asset}>{wvt_asset}</Option>;
										}
									)}
								</Select>
							</div>
							<div className="select-container">
								<p>{"Lending Asset:"}</p>
								<Select
									dropdownClassName="capx-dropdown"
									suffixIcon={
										<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />
									}
									defaultValue=""
									bordered={false}
									onChange={(e) => filterLoansByLendAsset(e)}
								>
									<Option value={""}>All</Option>
									{getFilterValues(filteredLoans, "stableCoinTicker").map(
										function (wvt_asset) {
											return <Option value={wvt_asset}>{wvt_asset}</Option>;
										}
									)}
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
						>
							<Option value="sb1">Loan Amount</Option>
							<Option value="sb2">Interest Rate</Option>
							<Option value="sb3">Loan-To-Value</Option>
						</Select>
					</Col>
				</Row>
				<Row>
					<Col sm="12">
						<h2>All Offers</h2>
					</Col>
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
														//   status={loan.status}
														orderDetails={getOrderDetails(loan)}
														additonalInfo={getAdditionalInfo(loan)}
														loan={loan}
														isBorrower={false}
														lendContract={lendContract}
														masterContract={masterContract}
														externalLiquidation={true} // needs to be updated from the UI
													/>
												)
											);
										})}
									</div>
								);
							})}
							{availableLoanStatus(filteredLoans)?.length === 0 && (
								<div className="no-orders">
									<img src={noLend} alt="No Lend Orders" />
									<h2>Oops! No Lend Orders Found!</h2>
								</div>
							)}
						</div>
					</Col>
				</Row>
			</>
		) : (
			<MarketLoader />
		)
	) : (
		<NewLendOfferComponent lend_loan_assets />
	);
};

export default LendTabLB;
