import React from "react";
import "./index.less";
import firefox from "../../assets/images/FirefoxIllustration.png";
import { SvgIcon } from "../../components/common";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Metamask = () => {
	const { data: account } = useAccount();

	const { connect } = useConnect({
		connector: new InjectedConnector(),
	});

	const tryConnect = () => {
		try {
			connect();
		} catch (ex) {
			console.error(ex);
		}
	};

	console.log(connect);
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
