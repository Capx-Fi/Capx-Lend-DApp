import React from "react";
import PropTypes from "prop-types";

import SideBar from "../containers/SideBar";
import NavigationBar from "../containers/NavigationBar";
import { Layout } from 'antd';

const { Header, Content, Sider } = Layout;

const DefaultLayout = ({ children, navigationbar, sideBar }) => (
  <React.Fragment>
    <main>
      <Layout>
        <Header className="header">
          {!navigationbar && <NavigationBar />}
        </Header>
        <Layout className="main-content">
          <Sider width={300} className="site-layout-background">
            {!sideBar && <SideBar />}
          </Sider>
          <Content className="right-content-wrapper">
            {children}
          </Content>
        </Layout>
      </Layout>
    </main>
  </React.Fragment>
);

DefaultLayout.propTypes = {
  navbar: PropTypes.bool,
  footer: PropTypes.bool
};

DefaultLayout.defaultProps = {
  navbar: false,
  footer: false
};

export default DefaultLayout;