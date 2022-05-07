import React, { useEffect } from "react";
import { SvgIcon } from "../../common";
import { Button, Select, Tooltip } from "antd";
import "./index.less";
import { useMetamask } from "../../../metamaskReactHook";

import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injected } from "../../../utils/connector";

import Web3 from "web3";

const { Option } = Select;

const NavigationBar = () => {
	const { active, account, library, connector, activate, deactivate, chainId } =
		useWeb3React();

	const web3 = new Web3(Web3.currentProvider);
	console.log(chainId);

	const chainNames = {
		// 1: "mainnet",
		4: "Ethereum",
		97: "BSC",
		80001: "Matic",
	};

	const chainChange = async (chainName) => {
		if (chainName === "Ethereum") {
			try {
				await web3?.givenProvider?.request({
					method: "wallet_switchEthereumChain",
					params: [{ chainId: "0x4" }],
				});
			} catch (error) {
				console.log(error);
			}
		} else if (chainName === "Matic") {
			try {
				await web3?.givenProvider?.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: "0x13881",
							chainName: "Polygon Testnet",
							nativeCurrency: {
								name: "MATIC",
								symbol: "MATIC",
								decimals: 18,
							},
							rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
							blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
						},
					],
				});
			} catch (error) {}
		} else if (chainName === "BSC") {
			try {
				await web3?.givenProvider?.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: "0x61",
							chainName: "Binance Smart Chain Test",
							nativeCurrency: {
								name: "BNB",
								symbol: "BNB",
								decimals: 18,
							},
							rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
							blockExplorerUrls: ["https://testnet.bscscan.com/"],
						},
					],
				});
			} catch (error) {
				console.log(error);
			}
		} else if (chainName === "Avalanche") {
			try {
				await web3.currentProvider.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: "0xA869",
							chainName: "Avalanche Fuji",
							nativeCurrency: {
								name: "AVAX",
								symbol: "AVAX",
								decimals: 18,
							},
							rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
							blockExplorerUrls: ["https://testnet.snowtrace.io/"],
						},
					],
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	const [chainName, setChainName] = React.useState(
		chainNames[chainId ? chainId : 1]
	);

	useEffect(() => {
		if (chainId) {
			setChainName(chainNames[chainId]);
		}
	}, [chainId, chainNames]);
	return (
		<>
			<div className="logo">
				<SvgIcon name="lend-logo" viewbox="0 0 2130 552" />
			</div>
			{active && (
				<div className="top-bar-right">
					<div className="notifications">
						<div className="bell-icon">
							<span></span>
							<Tooltip title="Notifications Coming Soon!">
								<SvgIcon name="bell" viewbox="0 0 20.03 21.997" />
							</Tooltip>
						</div>
					</div>
					<Select
						labelInValue
						className="coin-select"
						dropdownClassName="coin-select-dropdown"
						value={chainName}
						suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
						onChange={(e) =>
							chainChange(e.value).then(setChainName(chainNames[chainId]))
						}
					>
						<Option key="1" value="Ethereum">
							<div className="select-inner">
								<div className="svg-icon">
									<div className="svg-icon-inner">
										<SvgIcon name="eth-icon" viewbox="0 0 38.3 33.7" />
									</div>
								</div>
								<div className="name">Ethereum</div>
							</div>
						</Option>
						{/* <Option key="2" value="Matic">
							<div className="select-inner">
								<div className="svg-icon">
									<div className="svg-icon-inner">
										<SvgIcon name="polygon" viewbox="0 0 38.3 33.7" />
									</div>
								</div>
								<div className="name">Matic</div>
							</div>
						</Option>
						<Option key="3" value="BSC">
							<div className="select-inner">
								<div className="svg-icon">
									<div className="svg-icon-inner">
										<SvgIcon name="bsc-icon" viewbox="0 0 38.3 33.7" />
									</div>
								</div>
								<div className="name">BSC</div>
							</div>
						</Option> */}
					</Select>
					<div className="wallet-address" onClick={deactivate}>
						<Button
							icon={<SvgIcon name="logout" viewbox="0 0 15.501 15.383" />}
						>
							{account?.slice(0, 6)}...{account?.slice(-4)}{" "}
						</Button>
					</div>
				</div>
			)}
		</>
	);
};

export default NavigationBar;
