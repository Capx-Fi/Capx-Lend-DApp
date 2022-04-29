import React from "react";
import { Link } from "react-router-dom";
import { SvgIcon } from "../../common";
import "./index.less";

const SideBar = () => {
	return (
		<div className="sidebar-inner">
			<div className="sidebar-menu">
				<ul>
					<li>
						<div
							// to="/lend-borrow"
							className={(navData) => (navData.isActive ? "selected" : "")}
						>
							<SvgIcon
								name="wallet"
								className="sidebar-icon"
								viewbox="0 0 48 48"
							/>{" "}
							Lend/Borrow
						</div>
					</li>
					<li>
						<div
							// to="/"
							className={(navData) => (navData.isActive ? "selected" : "")}
						>
							<SvgIcon
								name="dashboard"
								className="sidebar-icon"
								viewbox="0 0 48 48"
								fill="none"
							/>{" "}
							Dashboard
						</div>
					</li>
					<li>
						<div
							// to="/Liquidation"
							className={(navData) => (navData.isActive ? "selected" : "")}
						>
							<SvgIcon
								name="liquid"
								className="sidebar-icon"
								viewbox="0 0 48 48"
							/>{" "}
							Liquidation
						</div>
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
