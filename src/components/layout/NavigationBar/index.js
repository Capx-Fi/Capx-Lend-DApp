import React, { useEffect } from "react";
import { SvgIcon } from "../../common";
import { Button, Select, Tooltip } from "antd";
import "./index.less";
import { useMetamask } from "../../../metamaskReactHook";

import { injected } from "../../../utils/connector";

import Web3 from "web3";
import {
  getSupportedChainNames,
  supportedChainsObject,
  SUPPORTED_CHAIN_IDS,
  SUPPORTED_CHAIN_NAMES,
} from "../../../constants/config";
import useWagmi from "../../../useWagmi";

const { Option } = Select;

const NavigationBar = () => {
  const {
    active,
    account,
    library,
    connector,
    activate,
    deactivate,
    chainId,
    switchNetwork,
  } = useWagmi();

  const web3 = new Web3(Web3.currentProvider);
  console.log(chainId);

  const chainNames = getSupportedChainNames();

  console.log(getSupportedChainNames());

  const chainChange = async (chainId) => {
    await switchNetwork(chainId);
  };

  const [chainName, setChainName] = React.useState(
    chainNames[chainId ? chainId : 1]
  );

  useEffect(() => {
    if (chainId) {
      setChainName(chainNames[chainId]);
    }
  }, [chainId, chainNames]);
  return (
    <>
      <div className="logo">
        <SvgIcon name="lend-logo" viewbox="0 0 2130 552" />
      </div>
      {active && (
        <div className="top-bar-right">
          <div className="notifications">
            <div className="bell-icon">
              <span></span>
              <Tooltip title="Notifications Coming Soon!">
                <SvgIcon name="bell" viewbox="0 0 20.03 21.997" />
              </Tooltip>
            </div>
          </div>
          <Select
            labelInValue
            className="coin-select"
            dropdownClassName="coin-select-dropdown"
            value={chainName}
            suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}
            onChange={(e) =>
              chainChange(e.value).then(setChainName(chainNames[chainId]))
            }
          >
            {SUPPORTED_CHAIN_IDS.split(",").map((chain, id) => {
              return (
                <Option key={id} value={chain}>
                  <div className="select-inner">
                    <div className="svg-icon">
                      <div className="svg-icon-inner">
                        <SvgIcon
                          name={
                            chain === "80001"
                              ? "polygon"
                              : chain === "97"
                              ? "bsc-icon"
                              : chain === "4"
                              ? "eth-icon"
                              : "avax-icon"
                          }
                          viewbox="0 0 38.3 33.7"
                        />
                      </div>
                    </div>
                    <div className="name">
                      {SUPPORTED_CHAIN_NAMES.split(",")[id]}
                    </div>
                  </div>
                </Option>
              );
            })}
          </Select>
          <div className="wallet-address" onClick={deactivate}>
            <Button
              icon={<SvgIcon name="logout" viewbox="0 0 15.501 15.383" />}
            >
              {account?.slice(0, 6)}...{account?.slice(-4)}{" "}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationBar;
