import React from "react";
import { Menu, Dropdown } from "antd";
import { SvgIcon } from "../../common";
import { useAccount, useDisconnect, useConnect } from "wagmi";
import "./index.less";

const NavigationBar = () => {
	const menu = (
		<Menu
			selectable
			items={[
				{
					label: <a href="https://www.antgroup.com">1st menu item</a>,
					key: "0",
				},
				{
					label: <a href="https://www.aliyun.com">2nd menu item</a>,
					key: "1",
				},
				{
					type: "divider",
				},
				{
					label: "3rd menu item",
					key: "3",
				},
			]}
		/>
	);
	const currentChain = "Ethereum";
	const { data: account } = useAccount();
	console.log(account?.address);
	const address = account?.address;
	const { disconnect } = useDisconnect();
	const isConnected = useConnect().isConnected;
	return (
		<>
			<SvgIcon name="lend-logo" className="logo" viewbox="0 0 2130 552" />
			{isConnected && (
				<div className="top-bar-right">
					<div className="notification">
						<Dropdown overlay={menu}>
							<SvgIcon
								name="bell"
								className="notification-bell"
								viewbox="0 0 24 24"
							/>
						</Dropdown>
					</div>
					<Dropdown overlay={menu} trigger={["click"]}>
						<button
							className="ant-dropdown-link"
							onClick={(e) => e.preventDefault()}
						>
							{currentChain}
							<SvgIcon name="dropdown-arrow" viewbox="0 0 24 24" fill="none" />
						</button>
					</Dropdown>
					<div className="address" onClick={disconnect}>
						<div className="address-right">
							{address?.slice(0, 6)}...{address?.slice(-4)}
						</div>
						<SvgIcon
							name="logout"
							viewbox="0 0 24 24"
							fill="#7fe7a3"
							onClick={disconnect}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default NavigationBar;
