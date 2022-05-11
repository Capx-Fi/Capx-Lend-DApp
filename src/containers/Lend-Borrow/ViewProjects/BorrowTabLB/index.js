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
import { fetchLoanDetailsLender } from "../../../../utils/fetchLoanDetailsLender";
import NewLendOfferComponent from "../../NewLendOfferComponent";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { getFilterValues } from "../../../../utils/getFilterValues";
import noBorrow from "../../../../assets/images/svg/no-borrow.svg";
import { useQuery } from "react-query";
import {
	getLendContract,
	getMasterContract,
	getMasterURL,
	getOracleContract,
} from "../../../../constants/getChainConfig";

const { Option } = Select;

const BorrowTabLB = () => {
	//filter logic
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

	function filterLoansByCompanyAsset(companyAsset) {
		setFilters({ ...filters, companyAsset });
	}

	function filterLoansByLendAsset(lendAsset) {
		setFilters({ ...filters, lendAsset });
	}

	//end of filter logic

	const getLoans = async () => {
		const _loans = await fetchLoanDetailsLender(
			account,
			masterURL,
			masterContract,
			oracleContract
		);
		console.log("L", _loans);
		console.log("Filters", getFilterValues(_loans, "stableCoinTicker"));
		console.log("LOANS", _loans);
		return _loans;
	};

	const {
		data: loans,
		isLoading,
		isFetched,
		isFetchedAfterMount,
		isFetching,
	} = useQuery(["borrowLB", account, chainId, active], getLoans);

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

	const pathname = window.location.pathname;
	return !pathname.includes("/new") ? (
		!isLoading && !isFetching && filteredLoans ? (
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
					<Col sm="12">
						<h2>All Offers</h2>
					</Col>
					<Col>
						<div className="order-list">
							{/* {availableLoanStatus(filteredLoans).map(function (status) {
								return ( */}
							<div className="orderlist-card">
								{filteredLoans.map(function (loan) {
									return (
										<AccordionCard
											orderId={loan.loanID}
											healthFactor={loan.healthFactor}
											paymentType={loan.repaymentType}
											//   status={loan.status}
											orderDetails={getOrderDetails(loan)}
											additonalInfo={getAdditionalInfo(loan)}
											loan={loan}
											from={"borrowLB"}
											isBorrower={true}
											lendContract={lendContract}
											masterContract={masterContract}
											externalLiquidation={false} // externalLiquidation does not have any affect on borrower accepting loan
										/>
									);
								})}
							</div>

							{availableLoanStatus(filteredLoans)?.length === 0 && (
								<div className="no-orders">
									<img src={noBorrow} alt="No Borrows" />
									<h2>Oops! No Borrow Orders Found!</h2>
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
		<NewLendOfferComponent borrow_loan_assets />
	);
};

export default BorrowTabLB;
