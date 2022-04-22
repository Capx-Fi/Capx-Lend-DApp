import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { SvgIcon } from "../../common";
import "./index.less";

const SideBar = () => {
    return (
        <div className="sidebar-inner">
            <div className="sidebar-menu">
                <ul>
                    <li><NavLink to="/lend-borrow" className={(navData) => (navData.isActive ? "selected" : '')}><SvgIcon name="lend-borrow" viewbox="0 0 21.539 17.647" /> Lend/Borrow</NavLink></li>
                    <li><NavLink to="/" className={(navData) => (navData.isActive ? "selected" : '')}><SvgIcon name="dashboard" viewbox="0 0 20 20" /> Dashboard</NavLink></li>
                    <li><NavLink to="/Liquidation" className={(navData) => (navData.isActive ? "selected" : '')}><SvgIcon name="liquidation" viewbox="0 0 20 20" /> Liquidation</NavLink></li>
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