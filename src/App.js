import React, { useState } from "react";
import SvgSprite from "./utils/SvgSpriteLoader";
import { Layout, Button } from "antd";
import { Scrollbar } from "react-scrollbars-custom";
import SideBar from "./components/layout/SideBar";
import NavigationBar from "./components/layout/NavigationBar";
import Dashboard from "./containers/Dashboard";
import LendBorrow from "./containers/Lend-Borrow";
import Metamask from "./containers/Metamask";
import { useMediaQuery } from "react-responsive";

//Svg Sprite
import svgFile from "./assets/images/svg/svg-sprite.svg";

// Metamask imports

import "./App.less";
// import { useConnect } from "wagmi";
import { LoadingScreen, SvgIcon } from "./components/common";
import ViewLendBorrow from "./containers/Lend-Borrow/ViewProjects";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import Liquidation from "./containers/Liquidation";
import { useSelector } from "react-redux";
import CapxModal from "./components/common/modals/CapxModal";

const { Header, Content, Sider, Footer } = Layout;

const App = () => {
	const [collapsed, setCollapsed] = React.useState(false);
	const [loading, setLoading] = React.useState(true);
	const isMobile = useMediaQuery({ query: "(max-width: 1240px)" });
	const [isOpen, setIsOpen] = useState(!!isMobile);
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};
	const isConnected = true;
	console.log(isConnected.isConnected);

	setTimeout(() => {
		setLoading(false);
	}, 3500);

	const { active, account, library, connector, activate, deactivate, chainId } =
		useWeb3React();

	const modal = useSelector((state) => state.modal);
	return (
		<>
			{!loading ? (
				<>
					<SvgSprite url={svgFile} />
					<Router>
						<Layout>
							<Header className="header">
								<NavigationBar />
							</Header>
							<Layout className="main-content">
								{active ? (
									<>
										{modal.modalType !== null && <CapxModal {...modal} />}
										<Sider
											width={290}
											collapsible
											collapsedWidth="0"
											breakpoint="xl"
											className="capx-sider"
											collapsed={collapsed}
											trigger={null}
										>
											<SideBar />

											<Button
												className="menu-link"
												type="link"
												onClick={toggleCollapsed}
												style={{ marginBottom: 16 }}
											>
												{collapsed ? (
													<SvgIcon
														name="chevron-right"
														viewbox="0 0 5.333 9.333"
													/>
												) : (
													<SvgIcon
														name="chevron-left"
														viewbox="0 0 5.333 9.333"
													/>
												)}
											</Button>
										</Sider>
										<Scrollbar style={{ height: 'calc(100vh - 95px)' }}>
											<Content className="right-content-wrapper">
												<Switch>
													<Route path="/liquidation" component={Liquidation} />
													<Route path="/market" component={ViewLendBorrow} />
													<Route path="/" component={Dashboard} />
												</Switch>
											</Content>
										</Scrollbar>
									</>
								) : (
									<Content className="right-content-wrapper">
										<Metamask />
									</Content>
								)}
							</Layout>
							<Footer className="main-footer">
								© 2021 Capx All rights reserved.
							</Footer>
						</Layout>
					</Router>
				</>
			) : (
				<LoadingScreen />
			)}
		</>
	);
};

export default App;
