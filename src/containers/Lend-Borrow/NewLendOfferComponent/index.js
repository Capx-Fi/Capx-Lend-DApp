import React, { useState } from "react";
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

const NewLendOfferComponent = (props) => {
  const balance = 200; //FETCH THIS
  const [value, setValue] = React.useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const [collateral, setCollateral] = useState(10);
  const [collatCurrency, setCollatCurrency] = useState("WVT");
  const onCollatCurrencyChange = (val, e) => {
    setCollatCurrency(val);
  };
  const onCollateralChange = (e) => {
    const val = e.target.value;
    if (isNaN(val) || val < 0) {
      return;
    }
    setCollateral(val);
  };

  const [loanYears, setLoanYears] = useState(1);
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

  const [loanDays, setLoanDays] = useState(0);
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
    if (isNaN(val) || val < 0) {
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

  const [loanToValue, setLoanToValue] = useState(10);
  const onLoanToValueChange = (val) => {
    setLoanToValue(val);
    if (liquidationThreshold < val) {
      setLiquidationThreshold(val);
    }
  };

  const [liquidationThreshold, setLiquidationThreshold] = useState(10);
  const onLiquidationThresholdChange = (val) => {
    setLiquidationThreshold(val <= loanToValue ? loanToValue : val);
  };

  return (
    <>
      <div className="lendborrow-wrapper">
        <div className="lendborrow-left">
          <Row>
            <Col sm="12" className="mb-4">
              <label className="lb-label">Loan type</label>
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>Single Repayment</Radio>
                <Radio value={2}>Installment-Based Repayment</Radio>
              </Radio.Group>
            </Col>
          </Row>
          {props.borrow_loan_assets && (
            <Row>
              <Col className="mb-4">
                <label className="lb-label">
                  Collateral Amount{" "}
                  <small className="align-right">Bal: {balance}</small>
                </label>
                <Input.Group
                  className="groupwith-select"
                  style={
                    collateral > balance
                      ? { border: "2px solid #ff4d4f", borderRadius: "8px" }
                      : { borderRadius: "8px" }
                  }
                >
                  <Input
                    style={
                      collateral > balance
                        ? { border: "none", width: "70%" }
                        : { width: "70%" }
                    }
                    value={collateral}
                    onChange={onCollateralChange}
                  />

                  <Select
                    dropdownClassName="capx-dropdown"
                    style={{ width: "30%" }}
                    value={collatCurrency}
                    onSelect={onCollatCurrencyChange}
                    suffixIcon={
                      <SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />
                    }
                  >
                    <Option value="WVT">WVT</Option>
                    <Option value="WVT2">wvt2</Option>
                  </Select>
                </Input.Group>
                {collateral > balance && (
                  <div className="insufficient-loan-error">
                    <SvgIcon name="error-icon" viewbox="0 0 18.988 15.511" />
                    <span>Insufficient Balance</span>
                  </div>
                )}
              </Col>
              <Col className="mb-4">
                <label className="lb-label">Loan Asset</label>
                <Input.Group className="loanassets-select">
                  <Input style={{ width: "70%" }} defaultValue="100" />
                  <Select
                    dropdownClassName="capx-dropdown"
                    style={{ width: "30%" }}
                    defaultValue="usdt"
                    suffixIcon={
                      <SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />
                    }
                  >
                    <Option value="usdt">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                          style={{
                            paddingTop: "0.225rem",
                            paddingRight: "0.4rem",
                          }}
                        >
                          <SvgIcon name="tether-icon" viewbox="0 0 24 24" />
                        </div>
                        <div>USDT</div>
                      </div>
                    </Option>
                    <Option value="usdt2">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                          style={{
                            paddingTop: "0.225rem",
                            paddingRight: "0.4rem",
                          }}
                        >
                          <SvgIcon name="tether-icon" viewbox="0 0 24 24" />
                        </div>
                        <div>USDT2</div>
                      </div>
                    </Option>
                  </Select>
                </Input.Group>
              </Col>
            </Row>
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
          <Col sm="6" className="mb-4 mt-2" style={{ padding: "0" }}>
            <Checkbox disabled={true}>Payable by Collateral</Checkbox>
          </Col>
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
                          style={{ width: "70%" }}
                          value={loanYears}
                          onChange={onLoanYearsChange}
                          placeholder="Years"
                        />
                        <Button style={{ width: "30%" }} type="primary">
                          Y
                        </Button>
                      </Input.Group>
                    </Col>
                    <Col sm="3">
                      <Input.Group className="loanassets-group">
                        <Input
                          style={{ width: "70%" }}
                          value={loanMonths}
                          onChange={onLoanMonthsChange}
                          placeholder="Months"
                        />
                        <Button style={{ width: "30%" }} type="primary">
                          M
                        </Button>
                      </Input.Group>
                    </Col>
                    <Col sm="3">
                      <Input.Group className="loanassets-group">
                        <Input
                          style={{ width: "70%" }}
                          value={loanDays}
                          onChange={onLoanDaysChange}
                          placeholder="Days"
                        />
                        <Button style={{ width: "30%" }} type="primary">
                          D
                        </Button>
                      </Input.Group>
                    </Col>
                  </Row>
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
                      style={{ width: "70%" }}
                      value={interestRate}
                      onChange={onInterestRateChange}
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
                      style={{ width: "70%" }}
                      value={discount}
                      onChange={onDiscountChange}
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
                <Col sm="4">
                  <Checkbox>Payable by Collateral</Checkbox>
                </Col>
              </Row>
            </>
          )}
        </div>
        <div className="lendborrow-right">
          <Summary
            loanamount="4000"
            collateralamount={
              collateral > balance ? "-" : `${collateral} ${collatCurrency}`
            }
            marketprice="1700"
            loantype="Single Repayment"
            ltv="10"
            collateralprice="400"
            loanToValue={loanToValue}
            liquidationthreshold={liquidationThreshold}
            interestrate={isNumeric(interestRate) ? `${interestRate} %` : "-"}
            discount={isNumeric(discount) ? `${discount} %` : "-"}
            loanterm={getLoanDurationText()}
            interestaccured="250"
            noofinstallments="4"
            defaultscenario="2"
            repaymenttype="Principle + Interest"
            paymentperinstallment="1000"
            servicefee="2.5"
          />
        </div>
      </div>
    </>
  );
};

export default NewLendOfferComponent;
