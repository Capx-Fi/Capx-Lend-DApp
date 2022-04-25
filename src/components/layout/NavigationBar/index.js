import React from "react";
import { SvgIcon } from "../../common";
import { Button, Select } from "antd";
import "./index.less";

import { useAccount, useDisconnect, useConnect } from "wagmi";

const { Option } = Select;

const NavigationBar = () => {
	const { data: account } = useAccount();
	const address = account?.address;
	const { disconnect } = useDisconnect();
	const isConnected = useConnect().isConnected;
	return (
		<>
			<div className="logo">
				<SvgIcon name="lend-logo" viewbox="0 0 2130 552" />
			</div>
			{isConnected && (
				<div className="top-bar-right">
					<div className="notifications">
						<div className="bell-icon">
							<span></span>
							<SvgIcon name="bell" viewbox="0 0 20.03 21.997" />
						</div>
					</div>
					<Select
						className="coin-select"
						dropdownClassName="coin-select-dropdown"
						defaultActiveFirstOption={true}
						defaultValue="1"
						suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
					>
						<Option key="1" value="1">
							<div className="select-inner">
								<div className="svg-icon">
									<div className="svg-icon-inner">
										<SvgIcon name="polygon" viewbox="0 0 38.3 33.7" />
									</div>
								</div>
								<div className="name">Polygon</div>
							</div>
						</Option>
					</Select>
					<div className="wallet-address" onClick={disconnect}>
						<Button
							icon={<SvgIcon name="logout" viewbox="0 0 15.501 15.383" />}
						>
							{address?.slice(0, 6)}...{address?.slice(-4)}
						</Button>
					</div>
				</div>
			)}
		</>
	);
};

export default NavigationBar;
