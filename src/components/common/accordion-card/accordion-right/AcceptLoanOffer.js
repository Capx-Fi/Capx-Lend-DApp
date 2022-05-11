import { Button, Col, Row, Checkbox, Tooltip } from "antd";
import React, { useState } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { cancelLoan } from "../../../../utils/cancelLoan";
import { approveAcceptLoan } from "../../../../utils/acceptLoan";
import { acceptLoan } from "../../../../utils/acceptLoan";
import { ERC20_ABI } from "../../../../contracts/ERC20";
import { useDispatch } from "react-redux";
import { useQueryClient } from "react-query";
import SvgIcon from "../../svg-icon/svg-icon";

function AcceptLoanOffer({
	masterContract,
	lendContract,
	loan,
	amount,
	isBorrower,
	externalLiquidation,
	from,
	isLendMarket,
}) {
	const web3 = new Web3(Web3.givenProvider);
	const { active, account, chainId } = useWeb3React();
	const [approved, setApproved] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	const onCheckboxChange = (e) => {
		console.log(`checked = ${e.target.checked}`);
		setIsChecked(e.target.checked);
	};

	return (
		<div>
			<div style={{ marginTop: "-1rem", paddingBottom: "1.5rem" }}>
				<Row className="mb-2">
					<Col sm="12">
						<b>Accept Loan Offer</b>
					</Col>
				</Row>
				<Row>
					<Col sm="7">Loan Amount : $ &nbsp;</Col>
					<Col sm="5" className="text-right">
						<b> {amount}</b>
					</Col>
				</Row>
			</div>
			{!approved ? (
				<>
					{isLendMarket ? (
						<Checkbox onChange={onCheckboxChange} value={isLendMarket}>
							Can Anyone Liquidate?{" "}
							<Tooltip
								className="tooltip-icon"
								placement="top"
								title={"If you check this box, anyone can liquidate your loan."}
							>
								<SvgIcon name="info" viewbox="0 0 22 22.001" />
							</Tooltip>
						</Checkbox>
					) : null}
					<Button
						className="action-btn mt-3"
						block
						onClick={() =>
							approveAcceptLoan(
								masterContract,
								account,
								ERC20_ABI,
								lendContract._address,
								loan?.loanID,
								isBorrower,
								loan,
								setApproved,
								dispatch,
								queryClient,
								from
							)
						}
					>
						Approve Loan
					</Button>
				</>
			) : (
				<>
					{isLendMarket ? (
						<Checkbox disabled onChange={onCheckboxChange} value={isChecked}>
							Can Anyone Liquidate?{" "}
							<Tooltip
								className="tooltip-icon"
								placement="top"
								title={"If you check this box, anyone can liquidate your loan."}
							>
								<SvgIcon name="info" viewbox="0 0 22 22.001" />
							</Tooltip>
						</Checkbox>
					) : null}
					<Button
						className="action-btn mt-3"
						block
						onClick={() =>
							acceptLoan(
								lendContract,
								account,
								loan?.loanID,
								isChecked,
								setApproved,
								dispatch,
								queryClient,
								from
							)
						}
					>
						Accept Loan
					</Button>
				</>
			)}
		</div>
	);
}

export default AcceptLoanOffer;
