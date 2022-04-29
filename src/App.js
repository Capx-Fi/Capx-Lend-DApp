import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import routes from "./routes";
import SvgSprite from "./utils/SvgSpriteLoader";
import { Layout, Button } from "antd";
import { LoadingScreen, SvgIcon } from "./components/common";
import SideBar from "./components/layout/SideBar";
import NavigationBar from "./components/layout/NavigationBar";
import history from './common/history';
import Dashaboard from "./components/views/Dashboard";
import Metamask from "./components/views/Metamask";
import { useConnect } from "wagmi";
import './App.less';


//Svg Sprite
import svgFile from './assets/images/svg/svg-sprite.svg';

const { Header, Content, Sider, Footer } = Layout;

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
const App = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const isConnected = useConnect();
  console.log(isConnected.isConnected);

  setTimeout(() => {
    setLoading(false);
  }, 3500);
    return (
      <React.Fragment>        
      {!loading ? (
        <>
          <SvgSprite url={svgFile} />
          <Layout>
            <Header className="header">
              <NavigationBar />
            </Header>
            <Layout className="main-content">
              {isConnected.isConnected ? (
                <>
                  <Sider
                    width={290}
                    className="capx-sider"
                    collapsed={collapsed}
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
                  <Content className="right-content-wrapper">
                    <Router history={history}>
                        <Switch>
                          {routes.map((route, i) => (
                            <RouteWithSubRoutes exact key={i} {...route} />
                          ))}
                          <Route path="*">
                            <Dashaboard />
                          </Route>
                        </Switch>
                    </Router>
                  </Content>
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
        </>
      ) : (
        <LoadingScreen />
      )}
      </React.Fragment>
    );
  }

export default App;
