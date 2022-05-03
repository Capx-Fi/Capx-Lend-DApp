import React, { useState, useEffect } from "react";
import {
  Button,
  Radio,
  Input,
  Select,
  Slider,
  Tooltip,
  Checkbox,
  Form,
} from "antd";
import { Row, Col, SvgIcon } from "../../../components/common";
import Summary from "../Summary";
import isNumeric from "antd/lib/_util/isNumeric";
import { fetchUserWVTs } from "../../../utils/fetchUserWVTs";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import Web3 from "web3";
import { MASTER_ABI } from "../../../contracts/Master";
import { ORACLE_ABI } from "../../../contracts/Oracle";
import { getLoanAmt } from "../../../utils/fetchMasterContract";
import { convertToInternationalCurrencySystem } from "../../../utils/convertToInternationalCurrencySystem";

const { Option } = Select;

const marks = {
  0: { label: "0%", style: { fontSize: "13px" } },
  5: "5%",
  10: "10%",
  15: "15%",
  20: "20%",
  25: "25%",
  30: "30%",
  35: "35%",
  40: "40%",
  45: "45%",
  50: { label: "50%", style: { fontSize: "13px", marginLeft: "5px" } },
  55: "55%",
  60: "60%",
  65: "65%",
  70: "70%",
  75: "75%",
  80: "80%",
  85: "85%",
  90: "90%",
  95: "95%",
  100: { label: "100%", style: { fontSize: "13px" } },
};

const stableCoinList = [
  {
    stableCoin: "USDT",
    stableCoinAdd: "0x96711f91eb24a3d1dfa3ed308a84380dfd4cc1c7",
    stableCoinDecimal: "18",
  },
  {
    stableCoin: "USDC",
    stableCoinAdd: "0xd18062920706712ed789f81004780499dbe5d0c5",
    stableCoinDecimal: "18",
  },
];

const NewLendOfferComponent = (props) => {
	const web3 = new Web3(Web3.givenProvider);
	const [globalDisabled, setGlobalDisabled] = useState(0); //0 is Loading, 1 is disabled due to empty wvt array, 2 is active
	const [balance, setBalance] = useState(10);
	const [value, setValue] = React.useState(1);
	const onChange = (e) => {
		setValue(e.target.value);
	};

	const [currentCoinIndex, setCurrentCoinIndex] = useState(0);
	const onCoinChange = (val, e) => {
		setCurrentCoinIndex(stableCoinList.findIndex((item) => item.stableCoin === val));
	};

	const [collateral, setCollateral] = useState(10);
	const [collatCurrency, setCollatCurrency] = useState(null);
	const [marketPrice, setMarketPrice] = useState(1);	
	const [userWVTs, setUserWVTs] = useState(null);
	const { active, account } = useWeb3React();

	const [loanAsset, setLoanAsset] = useState(null);

  useEffect(() => {
    active &&
		getUserWVTs().then((wvts) => {
			if (wvts.length === 0) {
			  setGlobalDisabled(1);
			} else {
				setGlobalDisabled(2);
		  }
        setUserWVTs(wvts);
      });
  }, []);
	
	useEffect(() => {
		if (userWVTs?.length > 0) {
			const index = userWVTs.findIndex((wvt) => wvt.asset === collatCurrency);
			if (index !== -1) {
				setBalance(userWVTs[index].quantity);
				setMarketPrice(userWVTs[index].marketPrice);
			}
		}
	}, [userWVTs, collatCurrency]);

	
	const getUserWVTs = async () => {
	  const masterContract = new web3.eth.Contract(
      MASTER_ABI,
      "0x793130DFbFDC30629015C0f07b41Dc97ec14d8B5"
    );
    const oracleContract = new web3.eth.Contract(
      ORACLE_ABI,
      "0x49d396Eb1B3E2198C32D2FE2C7146FD64f8BcF27"
    );
    const _WVTs = await fetchUserWVTs(
      account,
		"https://api.studio.thegraph.com/query/16341/liquid-original/v3.0.0",
		masterContract,
		oracleContract
    );
		console.log("WVTs", _WVTs);
		if (_WVTs.length !== 0) {
			setCollatCurrency(_WVTs[0]?.asset);
		}
    return _WVTs;
  };

  const onCollatCurrencyChange = (val, e) => {
    setCollatCurrency(val);
  };
  const onCollateralChange = (e) => {
    const val = e.target.value;
    if (isNaN(val) || val < 0 || val>balance) {
      return;
    }
    setCollateral(val);
  };

  const [loanYears, setLoanYears] = useState(0);
  const onLoanYearsChange = (e) => {
    const val = e.target.value;
    if (isNaN(val) || val < 0) {
      return;
    }
    setLoanYears(val);
  };

  const [loanMonths, setLoanMonths] = useState(0);
  const onLoanMonthsChange = (e) => {
    const val = e.target.value;
    if (isNaN(val) || val < 0) {
      return;
    }
    if (val >= 12) {
    } else {
      setLoanMonths(val);
    }
  };

  const [loanDays, setLoanDays] = useState(2);
  const onLoanDaysChange = (e) => {
    const val = e.target.value;
    if (isNaN(val) || val < 0) {
      return;
    }
    if (val > 31) {
    } else {
      setLoanDays(val);
    }
  };

  const getLoanDurationText = () => {
    let text = "";
    const years = parseInt(loanYears);
    const months = parseInt(loanMonths);
    const days = parseInt(loanDays);
    if (years > 0) {
      if (years === 1) {
        text += years + " Year";
      } else {
        text += years + " Years";
      }
    }
    if (months > 0) {
      if (months === 1) {
        text += " " + months + " Month";
      } else {
        text += " " + months + " Months";
      }
    }
    if (days > 0) {
      if (days === 1) {
        text += " " + days + " Day";
      } else {
        text += " " + days + " Days";
      }
    }
    return text.length === 0 ? "-" : text;
  };

  const [interestRate, setInterestRate] = useState(10);
  const onInterestRateChange = (e) => {
    const val = e.target.value;
    if (isNaN(val) || val < 0 || val>100) {
      return;
    }
    setInterestRate(val);
  };

  const [discount, setDiscount] = useState(10);
  const onDiscountChange = (e) => {
    const val = e.target.value;
    if (isNaN(val) || val < 0) {
      return;
    }
    if (val >= 100) {
    } else {
      setDiscount(val);
    }
  };

  const [loanToValue, setLoanToValue] = useState(40);
  const onLoanToValueChange = (val) => {
    setLoanToValue(val);
    if (liquidationThreshold < val) {
      setLiquidationThreshold(val);
    }
  };

  const [liquidationThreshold, setLiquidationThreshold] = useState(45);
  const onLiquidationThresholdChange = (val) => {
    setLiquidationThreshold(val <= loanToValue ? loanToValue : val);
	};
	
	useEffect(() => {
    if (active && userWVTs?.length > 0) {
      const index = userWVTs.findIndex((wvt) => wvt.asset === collatCurrency);
		if (isNumeric(collateral) && parseFloat(collateral) > 0 && index >= 0) {
        setLoanAsset(
          getLoanAmt(
            marketPrice,
            parseFloat(stableCoinList[currentCoinIndex].stableCoinDecimal),
            collateral,
            userWVTs[index].tokenDecimal,
            loanToValue,
            discount,
            true
          )
        );
      } else {
        setLoanAsset(null);
      }
    }
  }, [collateral, discount, loanToValue, marketPrice, userWVTs, currentCoinIndex]);

  return (
    <>
      <div className="lendborrow-wrapper">
        <div className="lendborrow-left">
          {globalDisabled !== 2 && (
            <>
              <div className="insufficient-loan-error mb-4">
                <SvgIcon name="error-icon" viewbox="0 0 18.988 15.511" />
                <span>
                  {globalDisabled === 0
                    ? "Fetching data"
                    : "No compatible assets found"}
                </span>
              </div>
            </>
          )}
          <Row>
            <Col sm="12" className="mb-4">
              <label className="lb-label">Loan type</label>
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>Single Repayment</Radio>
                <Radio value={2} disabled={true}>
                  Installment-Based Repayment
                  <span style={{ fontStyle: "italic" }}> (Coming soon)</span>
                </Radio>
              </Radio.Group>
            </Col>
          </Row>
          {props.borrow_loan_assets && (
            <>
              <Row>
                <Col className="mb-4">
                  <label className="lb-label">
                    Collateral Amount{" "}
                    <small className="align-right">Bal: {convertToInternationalCurrencySystem(balance)}</small>
                  </label>
                  <Input.Group
                    className="groupwith-select"
                    style={
                      parseFloat(collateral) === 0
                        ? { border: "2px solid #ff4d4f", borderRadius: "8px" }
                        : { borderRadius: "8px" }
                    }
                  >
                    <Input
                      style={
                        globalDisabled !== 2
                          ? {
                              background: "#192229",
                              color: "white",
                              width: "70%",
                            }
                          : {
                              width: "70%",
                              background: "#233039",
                              color: "white",
                            }
                      }
                      value={collateral}
                      onChange={onCollateralChange}
                      disabled={globalDisabled !== 2}
                    />

                    <Select
                      dropdownClassName="capx-dropdown"
                      value={collatCurrency}
                      onSelect={onCollatCurrencyChange}
                      disabled={globalDisabled !== 2}
                      suffixIcon={
                        <SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />
                      }
                      style={
                        globalDisabled !== 2
                          ? {
                              background: "#192229",
                              color: "white",
                              width: "30%",
                            }
                          : {
                              width: "30%",
                              background: "#233039",
                              color: "white",
                            }
                      }
                    >
                      {userWVTs?.length > 0 &&
                        userWVTs.map((val, index) => {
                          return (
                            <Option key={index} value={val.asset}>
                              {val.asset}
                            </Option>
                          );
                        })}
                    </Select>
                  </Input.Group>
                  {isNumeric(collateral) && parseFloat(collateral) === 0 && (
                    <div className="insufficient-loan-error">
                      <SvgIcon name="error-icon" viewbox="0 0 18.988 15.511" />
                      <span>Invalid Collateral Amount</span>
                    </div>
                  )}
                </Col>
                <Col className="mb-4">
                  <label className="lb-label">Loan Asset</label>
                  <Input.Group className="loanassets-select">
                    <Input
                      style={
                        globalDisabled !== 2
                          ? {
                              background: "#192229",
                              color: "white",
                              width: "70%",
                            }
                          : {
                              width: "70%",
                              background: "#233039",
                              color: "white",
                            }
                      }
                      value={
                        isNumeric(loanAsset) && loanAsset > 0
                          ? parseFloat(loanAsset).toFixed(5)
                          : "N/A"
                      }
                      disabled={true}
                    />
                    <Select
                      dropdownClassName="capx-dropdown"
                      disabled={globalDisabled !== 2}
                      style={{ width: "30%" }}
                      onSelect={onCoinChange}
                      value={stableCoinList[currentCoinIndex].stableCoin}
                      suffixIcon={
                        <SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />
                      }
                    >
                      {stableCoinList.map((val, index) => (
                        <Option value={val.stableCoin} key={index}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div
                              style={{
                                paddingTop: "0.225rem",
                                paddingRight: "0.4rem",
                              }}
                            >
                              <SvgIcon name="tether-icon" viewbox="0 0 24 24" />
                            </div>
                            <div>{val.stableCoin}</div>
                          </div>
                        </Option>
                      ))}
                    </Select>
                  </Input.Group>
                </Col>
              </Row>
            </>
          )}
          {props.lend_loan_assets && (
            <Row>
              <Col className="mb-4">
                <label className="lb-label">
                  Loan Amount{" "}
                  <small className="align-right">Bal: {balance} USDT</small>
                </label>
                <Input.Group className="loanassets-select">
                  <Input style={{ width: "70%" }} defaultValue="100" />
                  <Button
                    icon={<SvgIcon name="tether-icon" viewbox="0 0 24 24" />}
                    style={{ width: "30%" }}
                    type="primary"
                  >
                    USDT
                  </Button>
                </Input.Group>
                <div className="insufficient-loan-error">
                  <SvgIcon name="error-icon" viewbox="0 0 18.988 15.511" />
                  Insufficient Loan Amount
                </div>
              </Col>
              <Col className="mb-4">
                <label className="lb-label">Collateral Amount</label>
                <Input.Group className="groupwith-select">
                  <Input style={{ width: "70%" }} defaultValue="100" />
                  <Select
                    dropdownClassName="capx-dropdown"
                    style={{ width: "30%" }}
                    value={collatCurrency}
                    suffixIcon={
                      <SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />
                    }
                  >
                    <Option value="WVT">WVT</Option>
                    <Option value="WVT2">WVT2</Option>
                  </Select>
                </Input.Group>
              </Col>
            </Row>
          )}

          <Row>
            <Col className="mb-4">
              <label className="lb-label">
                Loan-To-Value
                <Tooltip className="tooltip-icon" placement="top" title="text">
                  <SvgIcon name="info" viewbox="0 0 22 22.001" />
                </Tooltip>
              </label>
              <Slider
                label={null}
                className="slider-capx"
                step={null}
                disabled={globalDisabled !== 2}
                marks={marks}
                value={loanToValue}
                onChange={onLoanToValueChange}
              />
            </Col>
          </Row>
          <Row>
            <Col className="mb-4" style={{ overflow: "hidden" }}>
              <label className="lb-label">
                Liquidation Threshold
                <Tooltip className="tooltip-icon" placement="top" title="text">
                  <SvgIcon name="info" viewbox="0 0 22 22.001" />
                </Tooltip>
              </label>
              <Slider
                label={null}
                disabled={globalDisabled !== 2}
                className="slider-capx"
                step={null}
                marks={marks}
                value={liquidationThreshold}
                onChange={onLiquidationThresholdChange}
              />
            </Col>
          </Row>
          {value === 1 ? (
            <>
              <Row>
                <Col className="mb-4">
                  <label className="lb-label">Loan Period</label>
                  <Row>
                    <Col sm="3">
                      <Input.Group className="loanassets-group">
                        <Input
                          style={
                            globalDisabled !== 2
                              ? {
                                  background: "#192229",
                                  color: "white",
                                  width: "70%",
                                }
                              : {
                                  width: "70%",
                                  background: "#233039",
                                  color: "white",
                                }
                          }
                          value={loanYears}
                          onChange={onLoanYearsChange}
                          placeholder="Years"
                          disabled={globalDisabled !== 2}
                        />
                        <Button style={{ width: "30%" }} type="primary">
                          Y
                        </Button>
                      </Input.Group>
                    </Col>
                    <Col sm="3">
                      <Input.Group className="loanassets-group">
                        <Input
                          style={
                            globalDisabled !== 2
                              ? {
                                  background: "#192229",
                                  color: "white",
                                  width: "70%",
                                }
                              : {
                                  width: "70%",
                                  background: "#233039",
                                  color: "white",
                                }
                          }
                          value={loanMonths}
                          onChange={onLoanMonthsChange}
                          placeholder="Months"
                          disabled={globalDisabled !== 2}
                        />
                        <Button style={{ width: "30%" }} type="primary">
                          M
                        </Button>
                      </Input.Group>
                    </Col>
                    <Col sm="3">
                      <Input.Group className="loanassets-group">
                        <Input
                          style={
                            globalDisabled !== 2
                              ? {
                                  background: "#192229",
                                  color: "white",
                                  width: "70%",
                                }
                              : {
                                  width: "70%",
                                  background: "#233039",
                                  color: "white",
                                }
                          }
                          value={loanDays}
                          onChange={onLoanDaysChange}
                          placeholder="Days"
                          disabled={globalDisabled !== 2}
                        />
                        <Button style={{ width: "30%" }} type="primary">
                          D
                        </Button>
                      </Input.Group>
                    </Col>
                  </Row>
                  {getLoanDurationText() === "-" && (
                    <div className="insufficient-loan-error">
                      <SvgIcon name="error-icon" viewbox="0 0 18.988 15.511" />
                      <span>Invalid Loan Period</span>
                    </div>
                  )}
                </Col>
              </Row>

              <Row>
                <Col sm="3">
                  <label className="lb-label">
                    Interest Rate
                    <Tooltip
                      className="tooltip-icon"
                      placement="top"
                      title="text"
                    >
                      <SvgIcon name="info" viewbox="0 0 22 22.001" />
                    </Tooltip>
                  </label>
                  <Input.Group className="loanassets-group">
                    <Input
                      style={
                        globalDisabled !== 2
                          ? {
                              background: "#192229",
                              color: "white",
                              width: "70%",
                            }
                          : {
                              width: "70%",
                              background: "#233039",
                              color: "white",
                            }
                      }
                      value={interestRate}
                      onChange={onInterestRateChange}
                      disabled={globalDisabled !== 2}
                    />
                    <Button style={{ width: "30%" }} type="primary">
                      %
                    </Button>
                  </Input.Group>
                </Col>
                <Col sm="3">
                  <label className="lb-label">
                    Discount %
                    <Tooltip
                      className="tooltip-icon"
                      placement="top"
                      title="text"
                    >
                      <SvgIcon name="info" viewbox="0 0 22 22.001" />
                    </Tooltip>
                  </label>
                  <Input.Group className="loanassets-group">
                    <Input
                      style={
                        globalDisabled !== 2
                          ? {
                              background: "#192229",
                              color: "white",
                              width: "70%",
                            }
                          : {
                              width: "70%",
                              background: "#233039",
                              color: "white",
                            }
                      }
                      value={discount}
                      onChange={onDiscountChange}
                      disabled={globalDisabled !== 2}
                    />
                    <Button style={{ width: "30%" }} type="primary">
                      %
                    </Button>
                  </Input.Group>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Row>
                <Col className="mb-4">
                  <label className="lb-label">Loan Period</label>
                  <Row className="pr-4">
                    <Col sm="4">
                      <Input.Group className="loanassets-group">
                        <Input style={{ width: "70%" }} placeholder="Years" />
                        <Button style={{ width: "30%" }} type="primary">
                          Y
                        </Button>
                      </Input.Group>
                    </Col>
                    <Col sm="4">
                      <Input.Group className="loanassets-group">
                        <Input style={{ width: "70%" }} placeholder="Months" />
                        <Button style={{ width: "30%" }} type="primary">
                          M
                        </Button>
                      </Input.Group>
                    </Col>
                    <Col sm="4">
                      <Input.Group className="loanassets-group">
                        <Input style={{ width: "70%" }} placeholder="Days" />
                        <Button style={{ width: "30%" }} type="primary">
                          D
                        </Button>
                      </Input.Group>
                    </Col>
                  </Row>
                </Col>
                <Col sm="3">
                  <label className="lb-label">
                    Interest Rate
                    <Tooltip
                      className="tooltip-icon"
                      placement="top"
                      title="text"
                    >
                      <SvgIcon name="info" viewbox="0 0 22 22.001" />
                    </Tooltip>
                  </label>
                  <Input.Group className="loanassets-group">
                    <Input style={{ width: "70%" }} defaultValue="10" />
                    <Button style={{ width: "30%" }} type="primary">
                      %
                    </Button>
                  </Input.Group>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col sm="4">
                  <label className="lb-label">
                    No. Of Installments
                    <Tooltip
                      className="tooltip-icon"
                      placement="top"
                      title="text"
                    >
                      <SvgIcon name="info" viewbox="0 0 22 22.001" />
                    </Tooltip>
                  </label>
                  <Input defaultValue="4" />
                </Col>
                <Col sm="4">
                  <label className="lb-label">
                    Default Scenario
                    <Tooltip
                      className="tooltip-icon"
                      placement="top"
                      title="text"
                    >
                      <SvgIcon name="info" viewbox="0 0 22 22.001" />
                    </Tooltip>
                  </label>
                  <Input defaultValue="2" />
                </Col>
                <Col sm="4">
                  <label className="lb-label">
                    Discount %
                    <Tooltip
                      className="tooltip-icon"
                      placement="top"
                      title="text"
                    >
                      <SvgIcon name="info" viewbox="0 0 22 22.001" />
                    </Tooltip>
                  </label>
                  <Input.Group className="loanassets-group">
                    <Input style={{ width: "70%" }} defaultValue="33" />
                    <Button style={{ width: "30%" }} type="primary">
                      %
                    </Button>
                  </Input.Group>
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <label className="lb-label">
                    No. Of Installments
                    <Tooltip
                      className="tooltip-icon"
                      placement="top"
                      title="text"
                    >
                      <SvgIcon name="info" viewbox="0 0 22 22.001" />
                    </Tooltip>
                  </label>
                </Col>
                <Col sm="8">
                  <Radio.Group onChange={onChange} value={value}>
                    <Radio value={3}>Only Interest</Radio>
                    <Radio value={4}>Principle + Interest</Radio>
                  </Radio.Group>
                </Col>
              </Row>
            </>
          )}
        </div>
        <div className="lendborrow-right">
          <Summary
            loanamount={
              isNumeric(loanAsset) && loanAsset > 0
                ? `$ ${convertToInternationalCurrencySystem(loanAsset)}`
                : "N/A"
            }
            collateralamount={
              collateral > balance
                ? "-"
                : `${convertToInternationalCurrencySystem(
                    collateral
                  )} ${collatCurrency}`
            }
            marketprice={
              isNumeric(marketPrice)
                ? `$ ${convertToInternationalCurrencySystem(marketPrice)}`
                : "-"
            }
            loantype="Single Repayment"
            ltv="10"
            collateralprice="400"
            loanToValue={loanToValue}
            liquidationthreshold={liquidationThreshold}
            interestrate={isNumeric(interestRate) ? `${interestRate} %` : "-"}
            discount={isNumeric(discount) ? `${discount} %` : "-"}
            loanterm={getLoanDurationText()}
            // interestaccured="250"
            // noofinstallments="4"
            // defaultscenario="2"
            // repaymenttype="Principle + Interest"
            // paymentperinstallment="1000"
            servicefee="2.5"
          />
        </div>
      </div>
    </>
  );
};

export default NewLendOfferComponent;
