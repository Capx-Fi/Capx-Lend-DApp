import React from "react";
import { Button } from "antd";

const Summary = (props) => {
	return (
		<>
			<div className="summary-head">
				<h3>Summary</h3>
				<p>Authorise your loan before initiating the loan request</p>
			</div>
			<div className="summary-content">
				<ul>
					{props.loanamount &&
						<li>
							<label>Loan Amount</label>
							<span>${props.loanamount}</span>
						</li>
					}
					{props.collateralamount &&
						<li>
							<label>Collateral Amount</label>
							<span>{props.collateralamount} WVT</span>
						</li>
					}
					{props.marketprice && 
						<li>
							<label>Market Price</label>
							<span>${props.marketprice}</span>
						</li>
					}
					{props.loantype && 
						<li>
							<label>Loan Type</label>
							<span>{props.loantype}</span>
						</li>
					}
					{props.ltv &&
						<li>
							<label>LTV</label>
							<span>{props.ltv}%</span>
						</li>
					}
					{props.collateralprice &&
						<li>
							<label>Collateral Price</label>
							<span>${props.collateralprice}</span>
						</li>
					}
					{props.liquidationthreshold &&
						<li>
							<label>Liquidation Threshold</label>
							<span>{props.liquidationthreshold}%</span>
						</li>
					}
					{props.interestrate &&
						<li>
							<label>Interest Rate</label>
							<span>{props.interestrate}%</span>
						</li>
					}
					{props.loanterm &&
						<li>
							<label>Loan Term</label>
							<span>{props.loanterm}</span>
						</li>
					}
					{props.interestaccured &&
						<li>
							<label>Interest Accured</label>
							<span>${props.interestaccured}</span>
						</li>
					}
					{props.noofinstallments &&
						<li>
							<label>No. Of Installments</label>
							<span>{props.noofinstallments}</span>
						</li>
					}
					{props.defaultscenario &&
						<li>
							<label>Default Scenario</label>
							<span>{props.defaultscenario}</span>
						</li>
					}
					{props.repaymenttype &&
						<li>
							<label>Repayment Type</label>
							<span>{props.repaymenttype}</span>
						</li>	
					}
					{props.paymentperinstallment &&
						<li>
							<label>Payment-Per-Installment</label>
							<span>${props.paymentperinstallment}</span>
						</li>	
					}
					{props.servicefee &&
						<li>
							<label>Service Fee</label>
							<span>{props.servicefee}%</span>
						</li>
					}
				</ul>
			</div>
			<div className="summary-footer">
				<div className="left">
					<small>Pay-Off Amount</small>
					<h2>$4250</h2>
					<small>($1000/installment)</small>
				</div>
				<div className="right">
					<Button type="secondary" size="large">Approve Parameters</Button>
				</div>
			</div>
		</>
	);
};

export default Summary;
