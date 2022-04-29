import React from "react";
import { SvgIcon } from "../../common";
import { Button, Select } from "antd";
import "./index.less";
import { useMetamask } from "../../../metamaskReactHook";

import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injected } from "../../../utils/connector";

// import { useAccount, useDisconnect, useConnect } from "wagmi";

const { Option } = Select;

const NavigationBar = () => {
  // const { data: account } = useAccount();
  // const address = account?.address;
  // // const { disconnect } = useDisconnect();
  // const isConnected = true;

  const { active, account, library, connector, activate, deactivate, chainId } =
    useWeb3React();
  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      if (ex instanceof UnsupportedChainIdError) {
        console.log(ex);
      }
    }
  }
  return (
    <>
      <div className="logo">
        <SvgIcon name="lend-logo" viewbox="0 0 2130 552" />
      </div>
      {true && (
        <div className="top-bar-right">
          <div className="notifications">
            <div className="bell-icon">
              <span></span>
              <SvgIcon name="bell" viewbox="0 0 20.03 21.997" />
            </div>
          </div>
          <Select
            className="coin-select"
            dropdownClassName="coin-select-dropdown"
            defaultActiveFirstOption={true}
            defaultValue="1"
            suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
          >
            <Option key="1" value="1">
              <div className="select-inner">
                <div className="svg-icon">
                  <div className="svg-icon-inner">
                    <SvgIcon name="polygon" viewbox="0 0 38.3 33.7" />
                  </div>
                </div>
                <div className="name">Polygon</div>
              </div>
            </Option>
          </Select>
          <div className="wallet-address" onClick={connect}>
            <Button
              icon={<SvgIcon name="logout" viewbox="0 0 15.501 15.383" />}
            >
              {active ? "12345" : "Connect"}{" "}
              {/* {address?.slice(0, 6)}...{address?.slice(-4)} */}23232
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationBar;
