import React from "react";
import SvgSprite from "./utils/SvgSpriteLoader";
import { useRoutes } from "react-router-dom";
import { Layout } from "antd";

import SideBar from "./components/layout/SideBar";
import NavigationBar from "./components/layout/NavigationBar";
import Dashboard from "./containers/Dashboard";
import LendBorrow from "./containers/Lend-Borrow";

//Svg Sprite
import svgFile from "./assets/images/svg/svg-sprite.svg";

import "./App.less";

const { Header, Content, Sider } = Layout;

const Routes = () => {
	let routes = useRoutes([
		{ path: "/", element: <Dashboard /> },
		{ path: "/lend-borrow", element: <LendBorrow /> },
		{ path: "/liquidation", element: <Dashboard /> },
	]);
	return routes;
};

const App = () => {
	return (
		<>
			<SvgSprite url={svgFile} />
			<Layout>
				<Header className='header'>
					<NavigationBar />
				</Header>
				<Layout className='main-content'>
					<Sider
						collapsible
						trigger={null}
						width={300}
						className='site-layout-background'
					>
						<SideBar />
					</Sider>
					<Content className='right-content-wrapper'>
						<Routes />
					</Content>
				</Layout>
			</Layout>
		</>
	);
};

export default App;
