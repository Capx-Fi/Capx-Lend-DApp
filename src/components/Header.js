import React from "react";
import "./Header.scss"
import LendLogo from "../assets/lend-logo.svg";

export default function Header() {
	return (
		<>
		<header
        className={`header z-40 ${
			"border-b border-dark-200"
        }`}
    >
        <a href="/">
        <div>
			<img
			className={`${"header_logo"} ${"phone:flex"}`}
			src={LendLogo}
			alt="capx logo"
			/>
        </div>
        </a>
		</header>
		</>
	)
}

