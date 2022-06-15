import React from "react";
import "./index.less";
import firefox from "../../assets/images/FirefoxIllustration.png";
import { SvgIcon } from "../../components/common";
import { injected } from "../../utils/connector";
import { notification } from "antd";
import BreakpointIcon from "../../assets/images/svg/BreakPoint.svg";
import useWagmi from "../../useWagmi";

const Breakpoint = () => {
  const { active, account, library, connector, activate, deactivate, chainId } =
    useWagmi();
  const { error } = useWagmi();

  notification.config({
    duration: 4500,
    className: "notification",
    width: "300px",
  });

  const closeIcon = (
    <SvgIcon
      className={"closeIcon"}
      name="close"
      viewbox="0 0 19 19"
      fill={"#ffffff"}
    />
  );

  return (
    <>
      <div className="main-container-bp">
        <div className="main-container-bp-inner">
          <p className="header-bp">
            Please open Capx Lend on a larger viewport
            <br /> .i.e Desktops or Laptops to leverage the full experience
          </p>
          <img className="breakpoint-image" src={BreakpointIcon}></img>
        </div>
      </div>
    </>
  );
};

export default Breakpoint;
