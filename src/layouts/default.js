import React from "react";
import PropTypes from "prop-types";

import SideBar from "../containers/SideBar";
import NavigationBar from "../containers/NavigationBar";

const DefaultLayout = ({ children, navigationbar, sideBar }) => (
  <React.Fragment>
    {!navigationbar && <NavigationBar />}
    <main>
      <div className="main-wrapper">
        <div className="main-wrapper-inner">
          {!sideBar && <SideBar />}
          <div className="right-content-wrapper">
            {children}
          </div>
        </div>
      </div>
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