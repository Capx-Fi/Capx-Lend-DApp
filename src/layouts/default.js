import React from "react";
import PropTypes from "prop-types";
import Map from "../components/views/Map"
import { Header, Footer} from "../components/layout";

const DefaultLayout = ({ component, header, footer, props }) => (
  <React.Fragment>
    {header && <Header />}
    <main>
      <div className="main-wrapper">
          <Map />
          {component}
      </div>
    </main>
    {footer && <Footer />}
  </React.Fragment>
);

DefaultLayout.propTypes = {
  header: PropTypes.bool,
  footer: PropTypes.bool
};

DefaultLayout.defaultProps = {
  header: true,
  footer: false
};

export default DefaultLayout;