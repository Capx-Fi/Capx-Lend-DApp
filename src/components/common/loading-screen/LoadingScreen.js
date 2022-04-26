import React from "react";
import SvgSprite from "../../../utils/SvgSpriteLoader";
import SvgIcon from "../svg-icon/svg-icon";
import svgFile from "../../../assets/images/svg/svg-sprite.svg";
import "./LoadingScreen.less";

function LoadingScreen() {
	return (
		<>
			<SvgSprite url={svgFile} />
			<div className="mainContainer">
				<SvgIcon
					name="lend-logo"
					viewbox="0 0 2130 552"
					className="lend-logo"
					fill="none"
					width="20rem"
					height="20rem"
				/>
			</div>
		</>
	);
}

export default LoadingScreen;
