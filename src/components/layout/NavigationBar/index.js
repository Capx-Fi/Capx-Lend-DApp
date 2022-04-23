import React from "react";
import { Menu, Dropdown } from "antd";
import { SvgIcon } from "../../common";
import "./index.less";

const { Option } = Select;

const NavigationBar = () => {
	const menu = (
		<Menu
			selectable
			items={[
				{
					label: <a href='https://www.antgroup.com'>1st menu item</a>,
					key: "0",
				},
				{
					label: <a href='https://www.aliyun.com'>2nd menu item</a>,
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
	const address = "0xA9B6401865F788e7ca031f174F67c29d74865395";
	const currentChain = "Ethereum";

	return (
		<>
			<SvgIcon name='lend-logo' className='logo' viewbox='0 0 2130 552' />
			<div className='top-bar-right'>
				<div className='notification'>
					<Dropdown overlay={menu}>
						<SvgIcon
							name='bell'
							className='notification-bell'
							viewbox='0 0 24 24'
						/>
					</Dropdown>
				</div>
				<Dropdown overlay={menu} trigger={["click"]}>
					<button
						className='ant-dropdown-link'
						onClick={(e) => e.preventDefault()}
					>
						{currentChain}
						<SvgIcon name='dropdown-arrow' viewbox='0 0 24 24' fill='none' />
					</button>
				</Dropdown>
				<div className='address' onClick={console.log("disconnect?")}>
					<div className='address-right'>
						{address.slice(0, 6)}...{address.slice(-4)}
					</div>
					<SvgIcon name='dropdown-arrow' viewbox='0 0 24 24' fill='none' />
				</div>
			</div>
		</>
	);
};

export default NavigationBar;
