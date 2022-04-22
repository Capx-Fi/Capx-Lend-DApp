import React from "react";
import { NavLink } from "react-router-dom";
import { SvgIcon } from "../../common";
import ArrowIcon from "../../../assets/images/svg/arrow-up-right.svg";
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
                <a href="https://liquid.capx.fi" target="_blank" rel="noreferrer" >Capx Liquid<img src={ArrowIcon} alt="icon" className="sidebar-icon" /></a>
                <a href="https://exchange.capx.fi" target="_blank" rel="noreferrer">Capx Exchange<img src={ArrowIcon} alt="icon" className="sidebar-icon" /></a>
            </div>
        </div>
    )
}

export default SideBar