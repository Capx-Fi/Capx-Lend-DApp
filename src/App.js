import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Landing from "./components/views/Landing";
import routes from "./routes";
import SvgSprite from "./utility/SvgSpriteLoader";
import { Layout, Button } from "antd";
import { LoadingScreen, SvgIcon } from "./components/common";
import './App.less';
import history from './common/history';

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
class App extends React.Component { 
  render(){
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
                            <Landing />
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
}

export default App;
