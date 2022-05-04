import React from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { SvgIcon } from "../../common";
import "./index.less";

const SideBar = () => {
  const location = useLocation();
  return (
    <div className="sidebar-inner">
      <div className="sidebar-menu">
        <ul>
          <li>
            <NavLink
              to="/market"
              className={
                location.pathname.includes("/market") ? "selected" : ""
              }
            >
              <SvgIcon
                name="wallet"
                className="sidebar-icon"
                viewbox="0 0 48 48"
              />{" "}
              Lend/Borrow
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={location.pathname === "/" ? "selected" : ""}
            >
              <SvgIcon
                name="dashboard"
                className="sidebar-icon"
                viewbox="0 0 48 48"
                fill="none"
              />{" "}
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Liquidation"
              className={location.pathname === "/Liquidation" ? "selected" : ""}
            >
              <SvgIcon
                name="liquid"
                className="sidebar-icon"
                viewbox="0 0 48 48"
              />{" "}
              Liquidation
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="sidebar-bottom">
        <a href="https://liquid.capx.fi" target="_blank" rel="noreferrer">
          Capx Liquid
          <SvgIcon
            name="arrow-up-right"
            className="sidebar-icon"
            viewbox="0 0 24 24"
            fill="none"
          />
        </a>
        <a href="https://exchange.capx.fi" target="_blank" rel="noreferrer">
          Capx Exchange
          <SvgIcon
            name="arrow-up-right"
            className="sidebar-icon"
            viewbox="0 0 24 24"
            fill="none"
          />
        </a>
      </div>
    </div>
  );
};

export default SideBar;
