import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { SvgIcon } from "../../components/common";
import "./index.less";

const SideBar = () => {
    return (
        <div className="sidebar-inner">
            <div className="sidebar-menu">
                <ul>
                    <li><NavLink to="/lend-borrow" activeClassName="selected"><SvgIcon name="rect" viewbox="0 0 24 24" /> Lend/Borrow</NavLink></li>
                    <li><NavLink to="/" activeClassName="selected"><SvgIcon name="rect" viewbox="0 0 24 24" /> Dashboard</NavLink></li>
                    <li><NavLink to="/Liquidation" activeClassName="selected"><SvgIcon name="rect" viewbox="0 0 24 24" /> Liquidation</NavLink></li>
                </ul>
            </div>
            <div className="sidebar-bottom">
                <Link to="/">Capx Liquid <SvgIcon name="top-right" viewbox="0 0 12.083 12.083" /></Link>
                <Link to="/">Capx Exchange <SvgIcon name="top-right" viewbox="0 0 12.083 12.083" /></Link>
            </div>
        </div>
    )
}

export default SideBar