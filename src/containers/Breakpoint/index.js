import React from "react";
import "./index.less";
import firefox from "../../assets/images/FirefoxIllustration.png";
import { SvgIcon } from "../../components/common";
import { injected } from "../../utils/connector";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { notification } from "antd";
import BreakpointIcon from "../../assets/images/svg/BreakPoint.svg";

const Breakpoint = () => {
	const { active, account, library, connector, activate, deactivate, chainId } =
		useWeb3React();
	const { error } = useWeb3React();
	const unsupportedChainIdError =
		error && error instanceof UnsupportedChainIdError;

	notification.config({
		duration: 4500,
		className: "notification",
		width: "300px",
	});

	const closeIcon = (
		<SvgIcon
			className={"closeIcon"}
			name="close"
			viewbox="0 0 19 19"
			fill={"#ffffff"}
		/>
	);

	async function tryConnect() {
		try {
			await activate(injected);
			if (unsupportedChainIdError) {
				notification.open({
					description: "Unsupported Chain. Please connect to Rinkeby Network",
					icon: (
						<SvgIcon
							name="info"
							viewbox="0 0 22 22.001"
							width={"1.5rem"}
							height={"1.5rem"}
							fill={"#ffffff"}
						/>
					),
					style: {
						backgroundColor: "#bf0000",
						color: "#ffffff",
					},
					closeIcon,
					duration: 2000,
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
			<div className="main-container-bp">
				<div className="main-container-bp-inner">
					<p className="header-bp">
					Please open Capx Lend on a larger viewport<br/> .i.e Desktops or
						Laptops to leverage the full experience
					</p>
					<img className="breakpoint-image" src={BreakpointIcon}></img>
				</div>
			</div>
		</>
	);
};

export default Breakpoint;
