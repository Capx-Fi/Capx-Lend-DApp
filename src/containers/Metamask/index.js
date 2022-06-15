import React from "react";
import "./index.less";
import firefox from "../../assets/images/FirefoxIllustration.png";
import { SvgIcon } from "../../components/common";
import { injected } from "../../utils/connector";
import { notification } from "antd";
import useWagmi from "../../useWagmi";

const Metamask = () => {
  const {
    active,
    account,
    library,
    connector,
    activate,
    deactivate,
    chainId,
    connect,
    connectors,
  } = useWagmi();
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
      <div className="main-container">
        <p className="header">
          Please Connect your <br /> Metamask Wallet to Proceed
        </p>
        <div className="connect-btn" onClick={() => connect(connectors[0])}>
          <SvgIcon
            name="metamask-icon"
            className="metamask-icon"
            viewbox="0 0 50 50"
          />
          Connect Metamask
        </div>
        <br />
        <div className="connect-btn" onClick={() => connect(connectors[1])}>
          Wallet Connect
        </div>
        <img src={firefox} className="firefox" alt="firefox icon" />
      </div>
    </>
  );
};

export default Metamask;
