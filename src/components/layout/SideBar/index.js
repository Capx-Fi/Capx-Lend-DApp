import React from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon  from "../../../assets/images/svg/Dashboard.svg";
import LiquidIcon from "../../../assets/images/svg/Liquid.svg";
import WalletIcon from "../../../assets/images/svg/Wallet.svg";
import ArrowIcon from "../../../assets/images/svg/arrow-up-right.svg";
import "./index.less";

const SideBar = () => {
    return (
        <div className="sidebar-inner">
            <div className="sidebar-menu">
                <ul>
                    <li><NavLink to="/lend-borrow" className={(navData) => (navData.isActive ? "selected" : '')}><img src={WalletIcon} className="sidebar-icon" alt="icon" /> Lend/Borrow</NavLink></li>
                    <li><NavLink to="/" className={(navData) => (navData.isActive ? "selected" : '')}><img src={DashboardIcon} alt="icon" className="sidebar-icon" /> Dashboard</NavLink></li>
                    <li><NavLink to="/Liquidation" className={(navData) => (navData.isActive ? "selected" : '')}><img src={LiquidIcon} alt="icon" className="sidebar-icon"  /> Liquidation</NavLink></li>
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