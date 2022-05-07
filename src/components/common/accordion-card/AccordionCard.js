import { Button, Col, Row, Tooltip, Skeleton } from "antd";
import React, { useState } from "react";
import SvgIcon from "../svg-icon/svg-icon";
import "../../../containers/Dashboard/index.less";
import {
	healthFactorTooltip,
	marketPriceTooltip,
} from "../../../constants/toolTips";
import ClaimAssets from "./accordion-right/ClaimAssets";
import AcceptLoanOffer from "./accordion-right/AcceptLoanOffer";
import RepayLoan from "./accordion-right/RepayLoan";
import CancelLoan from "./accordion-right/CancelLoan";
import StatusText from "./accordion-right/StatusText";
import LiquidateLoan from "./accordion-right/LiquidateLoan";
import { convertToInternationalCurrencySystem } from "../../../utils/convertToInternationalCurrencySystem";
import StartLoanOffer from "./accordion-right/StartLoanOffer";

function AccordionCard({
	orderId,
	healthFactor,
	paymentType,
	status,
	orderDetails,
	additonalInfo,
	statusTitle,
	statusType,
	loan,
	isBorrower,
	lendContract,
	masterContract,
	externalLiquidation,
}) {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const pathname = window.location.pathname;
	return (
		<div>
			<div className="capx-card" style={{ marginBottom: "20px" }}>
					<div className="ordercard-upper">
						<div className="upper-left">
							<b>Order ID: {orderId}</b>
							<span className="helthfactor-title">
								Health Factor :{" "}
								<b>
									{loan?.status === "Cancelled"
										? "N/A"
										: convertToInternationalCurrencySystem(healthFactor)}
								</b>
								<Tooltip
									className="tooltip-icon"
									placement="top"
									title={healthFactorTooltip}
								>
									<SvgIcon name="info" viewbox="0 0 22 22.001" />
								</Tooltip>
							</span>
						</div>
						<div className="upper-right">
							<span className="badge badge-green">{paymentType}</span>
							{status && (
								<span className={`badge badge-${status.toLowerCase()}`}>
									{status}
								</span>
							)}
						</div>
					</div>
					<div className={`ordercard-bottom-${orderDetails.length}`}>
						<ul>
							{orderDetails.map((item, index) => {
								return (
									<li key={index}>
										<p>{item.label}</p>
										<h4>{item.value}</h4>
									</li>
								);
							})}
						</ul>
						<Button
							onClick={() => setIsCollapsed(!isCollapsed)}
							className={`arrow-collapse ${isCollapsed ? "down" : "up"}`}
							type="link"
						>
							<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />
						</Button>
					</div>
			</div>
			<div
				className={`additional-info collapse-content ${
					isCollapsed ? "collapsed" : "expanded"
				}`}
			>
				<div className="additional-info-inner">
					<h3>Additional Info</h3>
					<div className="additional-info-dtl">
						<div className="additionalinfo-left">
							<ul>
								{additonalInfo.map((item, index) => {
									return (
										<li key={index}>
											<p>
												{item.label}
												{item.tooltip && (
													<Tooltip
														className="tooltip-icon"
														placement="top"
														title={item.tooltip}
													>
														<SvgIcon name="info" viewbox="0 0 22 22.001" />
													</Tooltip>
												)}
											</p>
											<h4>{item.value}</h4>
										</li>
									);
								})}
							</ul>
						</div>
						<div className="additionalinfo-right">
							<div className="additionalinfo-right-inner">
								{!status && loan?.status === "Initiated" && (
									<AcceptLoanOffer
										masterContract={masterContract}
										lendContract={lendContract}
										loan={loan}
										amount={
											isBorrower
												? convertToInternationalCurrencySystem(
														loan?.collateralAmt
												  ).toString() +
												  " " +
												  loan?.collateralTicker
												: convertToInternationalCurrencySystem(
														loan?.stableCoinAmt
												  ).toString() +
												  " " +
												  loan?.stableCoinTicker
										}
										isBorrower={isBorrower}
										externalLiquidation={externalLiquidation}
									/>
								)}
								{status === "Expired" && (
									<ClaimAssets
										lendContract={lendContract}
										loan={loan}
										amount={
											isBorrower
												? convertToInternationalCurrencySystem(
														loan?.collateralAmt
												  ).toString() +
												  " " +
												  loan?.collateralTicker
												: convertToInternationalCurrencySystem(
														loan?.stableCoinAmt
												  ).toString() +
												  " " +
												  loan?.stableCoinTicker
										}
										penalty={(loan?.penalty).toString() + " %"}
									/>
								)}
								{status === "Funded" && (
									<StartLoanOffer lendContract={lendContract} loan={loan} />
								)}
								{status === "Active" && (
									<RepayLoan
										lendContract={lendContract}
										loan={loan}
										masterContract={masterContract}
										// repayAmount={"$3000"}
										// isInstallment={paymentType === "Installment"}
									/>
								)}
								{status === "Initiated" && (
									<CancelLoan lendContract={lendContract} loan={loan} />
								)}
								{statusType && (
									<StatusText type={statusType} title={statusTitle} />
								)}
								{status === "Completed" && (
									<div className="statusIcon">
										<SvgIcon
											name="completed-loan"
											viewBox="0 0 115.002 115.002"
											width="6.5rem"
											fill="#00ff00"
										/>
										<div className="statusTitle" style={{ color: "#00ff00" }}>
											{"Completed"}
										</div>
									</div>
								)}
								{status === "Defaulted"  && pathname.includes("/Liquidation") &&
									(
										<LiquidateLoan
											lendContract={lendContract}
											loan={loan}
											masterContract={masterContract}
										/>
									)
								}
								{status === "Defaulted"  && !pathname.includes("/Liquidation") &&
									(
										<div className="statusIcon">
										<SvgIcon
											className="statusIcon"
											name="defaulted-loan"
											viewBox="0 0 115.002 115.002"
											width="6.5rem"
											fill="#ff0000"
										/>
										<div className="statusTitle" style={{ color: "#ff0000" }}>
											{"Defaulted"}
										</div>
									</div>
									)
								}
								{status === "Liquidated" &&
								 (
									<div className="statusIcon">
										<SvgIcon
											className="statusIcon"
											name="defaulted-loan"
											viewBox="0 0 115.002 115.002"
											width="6.5rem"
											fill="#5ba1ca"
										/>
										<div className="statusTitle" style={{ color: "#5ba1ca" }}>
											{"Liquidated"}
										</div>
									</div>
								)}
								{status === "Cancelled" && (
									<div className="statusIcon">
										<SvgIcon
											className="statusIcon"
											name="cancelled-loan"
											viewBox="0 0 115.002 115.002"
											width="6.5rem"
											fill="#238b92"
										/>
										<div className="statusTitle" style={{ color: "#238b92" }}>
											{"Cancelled"}
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AccordionCard;
