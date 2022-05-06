import React from "react";
import "./index.less";
import firefox from "../../assets/images/FirefoxIllustration.png";
import { SvgIcon } from "../../components/common";
import { injected } from "../../utils/connector";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { notification } from "antd";

const Metamask = () => {
	const { active, account, library, connector, activate, deactivate, chainId } =
		useWeb3React();
	const { error } = useWeb3React();
	const unsupportedChainIdError =
		error && error instanceof UnsupportedChainIdError;
	notification.config({
		duration: 30000,
		className: "notification",
	});
	const closeIcon = (
		<SvgIcon name="close" viewBox="0 0 19 19" fill={"#ffffff"} />
	);

	async function tryConnect() {
		try {
			await activate(injected);
			if (unsupportedChainIdError) {
				notification.open({
					description: "Unsupported Chain ID",
					icon: (
						<SvgIcon name="info" viewBox="0 0 22 22.001" fill={"#ffffff"} />
					),
					style: {
						backgroundColor: "red",
						color: "white",
					},
					closeIcon,
				});
			}
		} catch (ex) {
			if (ex instanceof UnsupportedChainIdError) {
				console.log(ex);
			}
		}
	}
	return (
		<>
			<div className="main-container">
				<p className="header">
					Please Connect your <br /> Metamask Wallet to Proceed
				</p>
				<div className="connect-btn" onClick={tryConnect}>
					<SvgIcon
						name="metamask-icon"
						className="metamask-icon"
						viewbox="0 0 50 50"
					/>
					Connect Metamask
				</div>
				<img src={firefox} className="firefox" alt="firefox icon" />
			</div>
		</>
	);
};

export default Metamask;
