import React from "react";
import SvgSprite from "./utils/SvgSpriteLoader";
import { useRoutes } from "react-router-dom";
import { Layout, Button } from "antd";

import SideBar from "./components/layout/SideBar";
import NavigationBar from "./components/layout/NavigationBar";
import Dashboard from "./containers/Dashboard";
import LendBorrow from "./containers/Lend-Borrow";
import Metamask from "./containers/Metamask";

//Svg Sprite
import svgFile from "./assets/images/svg/svg-sprite.svg";

// Metamask imports

import "./App.less";
import { useConnect } from "wagmi";
import { SvgIcon } from "./components/common";

const { Header, Content, Sider, Footer } = Layout;

const Routes = () => {
	let routes = useRoutes([
		{ path: "/", element: <Dashboard /> },
		{ path: "/lend-borrow", element: <LendBorrow /> },
		{ path: "/liquidation", element: <Dashboard /> },
	]);
	return routes;
};

const App = () => {
	const [collapsed, setCollapsed] = React.useState(false);
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};
	const isConnected = useConnect();
	console.log(isConnected.isConnected);
	if (isConnected?.isConnected) {
		return (
			<>
				<SvgSprite url={svgFile} />
				<Layout>
					<Header className="header">
						<NavigationBar />
					</Header>
					<Layout className="main-content">
						<Sider width={290} className="capx-sider" collapsed={collapsed}>
							<SideBar />
							<Button
								className="menu-link"
								type="link"
								onClick={toggleCollapsed}
								style={{ marginBottom: 16 }}
							>
								{collapsed ? (
									<SvgIcon name="chevron-right" viewbox="0 0 5.333 9.333" />
								) : (
									<SvgIcon name="chevron-left" viewbox="0 0 5.333 9.333" />
								)}
							</Button>
						</Sider>
						<Content className="right-content-wrapper">
							<Routes />
						</Content>
					</Layout>
				</Layout>
			</>
		);
	} else {
		return (
			<>
				<SvgSprite url={svgFile} />
				<Layout>
					<Header className="header">
						<NavigationBar />
					</Header>
					<Layout className="main-content">
						<Content className="right-content-wrapper">
							<Metamask />
						</Content>
					</Layout>
					<Footer className="main-footer">
						© 2021 Capx All rights reserved.
					</Footer>
				</Layout>
			</>
		);
	}
};

export default App;
