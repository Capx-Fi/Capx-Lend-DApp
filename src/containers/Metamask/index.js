import React from "react";
import "./index.less";
import firefox from "../../assets/images/FirefoxIllustration.png";
import { SvgIcon } from "../../components/common";
import { injected } from "../../utils/connector";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";

const Metamask = () => {
	const { active, account, library, connector, activate, deactivate, chainId } =
		useWeb3React();

	async function tryConnect() {
		try {
			await activate(injected);
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
