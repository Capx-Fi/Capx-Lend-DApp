import React from "react";
import { Button, Radio, Input, Select, Slider, Tooltip, Checkbox } from "antd";
import { Row, Col, SvgIcon } from "../../../common";
import Summary from "../Summary";

const { Option } = Select;

const marks = {
	0: { label: "0%", style: {fontSize: '13px'} },
	5: '5%',
	10: '10%',
	15: '15%',
	20: '20%',
	25: '25%',
	30: '30%',
	35: '35%',
	40: '40%',
	45: '45%',
	50: { label: "50%", style: {fontSize: '13px', marginLeft: '5px'} },
	55: '55%',
	60: '60%',
	65: '65%',
	70: '70%',
	75: '75%',
	80: '80%',
	85: '85%',
	90: '90%',
	95: '95%',
	100: { label: "100%", style: {fontSize: '13px'} },
  };

const LendBorrowComponent = (props) => {
	const [value, setValue] = React.useState(1);
	const onChange = (e) => {
		setValue(e.target.value);
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
					{props.borrow_loan_assets && 
						<Row>
							<Col className="mb-4">
								<label className="lb-label">Collateral Amount <small className="align-right">Bal: 200</small></label>
								<Input.Group className="groupwith-select">
									<Input style={{ width: '70%' }} defaultValue="100" />
									<Select dropdownClassName="capx-dropdown" style={{ width: '30%' }} defaultValue="wvt" suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}>
										<Option value="wvt">WVT</Option>
										<Option value="wvt2">wvt2</Option>
									</Select>
								</Input.Group>
							</Col>
							<Col className="mb-4">
								<label className="lb-label">Loan Asset</label>
								<Input.Group className="loanassets-select">
									<Input style={{ width: '70%' }} defaultValue="100" />
									<Button icon={<SvgIcon name="tether-icon" viewbox="0 0 24 24" />} style={{ width: '30%' }} type="primary">USDT</Button>
								</Input.Group>
							</Col>
						</Row>
					}
					{props.lend_loan_assets && 
						<Row>
							<Col className="mb-4">
								<label className="lb-label">Loan Amount  <small className="align-right">Bal: 4000 USDT</small></label>
								<Input.Group className="loanassets-select">
									<Input style={{ width: '70%' }} defaultValue="100" />
									<Button icon={<SvgIcon name="tether-icon" viewbox="0 0 24 24" />} style={{ width: '30%' }} type="primary">USDT</Button>
								</Input.Group>
								<div className="insufficient-loan-error">
									<SvgIcon name="error-icon" viewbox="0 0 18.988 15.511" />
									Insufficient Loan Amount
								</div>
							</Col>
							<Col className="mb-4">
								<label className="lb-label">Collateral Amount</label>
								<Input.Group className="groupwith-select">
									<Input style={{ width: '70%' }} defaultValue="100" />
									<Select dropdownClassName="capx-dropdown" style={{ width: '30%' }} defaultValue="wvt" suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}>
										<Option value="wvt">WVT</Option>
										<Option value="wvt2">wvt2</Option>
									</Select>
								</Input.Group>
							</Col>
						</Row>
					}
					<Row>
						<Col className="mb-4">
							<label className="lb-label">Loan-To-Value 
								<Tooltip className="tooltip-icon" placement="top" title="text">
									<SvgIcon name="info" viewbox="0 0 22 22.001" />
								</Tooltip>
							</label>
							<Slider label={null} className="slider-capx" step={null} marks={marks} defaultValue={10} />
						</Col>
					</Row>
					<Row>
						<Col className="mb-4">
							<label className="lb-label">Liquidation Threshold
								<Tooltip className="tooltip-icon" placement="top" title="text">
									<SvgIcon name="info" viewbox="0 0 22 22.001" />
								</Tooltip>
							</label>
							<Slider label={null} className="slider-capx" step={null} marks={marks} defaultValue={10} />
						</Col>
					</Row>
					{value === 1 ? 
						<>
							<Row>
								<Col className="mb-4">
									<label className="lb-label">Loan Period</label>
									<Row>
										<Col sm="3">
											<Input.Group className="loanassets-group">
												<Input style={{ width: '70%' }} placeholder="Years" />
												<Button style={{ width: '30%' }} type="primary">Y</Button>
											</Input.Group>
										</Col>
										<Col sm="3">
											<Input.Group className="loanassets-group">
												<Input style={{ width: '70%' }} placeholder="Months" />
												<Button style={{ width: '30%' }} type="primary">M</Button>
											</Input.Group>
										</Col>
										<Col sm="3">
											<Input.Group className="loanassets-group">
												<Input style={{ width: '70%' }} placeholder="Days" />
												<Button style={{ width: '30%' }} type="primary">D</Button>
											</Input.Group>
										</Col>
									</Row>
								</Col>
							</Row>
							<Row>
								<Col sm="3">
									<label className="lb-label">Interest Rate
										<Tooltip className="tooltip-icon" placement="top" title="text">
											<SvgIcon name="info" viewbox="0 0 22 22.001" />
										</Tooltip>
									</label>
									<Input.Group className="loanassets-group">
										<Input style={{ width: '70%' }} defaultValue="10" />
										<Button style={{ width: '30%' }} type="primary">%</Button>
									</Input.Group>
								</Col>
								<Col sm="3">
									<label className="lb-label">Discount %
										<Tooltip className="tooltip-icon" placement="top" title="text">
											<SvgIcon name="info" viewbox="0 0 22 22.001" />
										</Tooltip>
									</label>
									<Input.Group className="loanassets-group">
										<Input style={{ width: '70%' }} defaultValue="30" />
										<Button style={{ width: '30%' }} type="primary">%</Button>
									</Input.Group>
								</Col>
								<Col sm="6" className="text-right pt-4 mt-1">
									<Checkbox>Payable by Collateral</Checkbox>
								</Col>
							</Row>
						</>
					: 
						<>
							<Row>
								<Col className="mb-4">
									<label className="lb-label">Loan Period</label>
									<Row className="pr-4">
										<Col sm="4">
											<Input.Group className="loanassets-group">
												<Input style={{ width: '70%' }} placeholder="Years" />
												<Button style={{ width: '30%' }} type="primary">Y</Button>
											</Input.Group>
										</Col>
										<Col sm="4">
											<Input.Group className="loanassets-group">
												<Input style={{ width: '70%' }} placeholder="Months" />
												<Button style={{ width: '30%' }} type="primary">M</Button>
											</Input.Group>
										</Col>
										<Col sm="4">
											<Input.Group className="loanassets-group">
												<Input style={{ width: '70%' }} placeholder="Days" />
												<Button style={{ width: '30%' }} type="primary">D</Button>
											</Input.Group>
										</Col>
									</Row>
								</Col>
								<Col sm="3">
									<label className="lb-label">Interest Rate
										<Tooltip className="tooltip-icon" placement="top" title="text">
											<SvgIcon name="info" viewbox="0 0 22 22.001" />
										</Tooltip>
									</label>
									<Input.Group className="loanassets-group">
										<Input style={{ width: '70%' }} defaultValue="10" />
										<Button style={{ width: '30%' }} type="primary">%</Button>
									</Input.Group>
								</Col>
							</Row>
							<Row className="mb-4">
								<Col sm="4">
									<label className="lb-label">No. Of Installments
										<Tooltip className="tooltip-icon" placement="top" title="text">
											<SvgIcon name="info" viewbox="0 0 22 22.001" />
										</Tooltip>
									</label>
									<Input defaultValue="4" />
								</Col>
								<Col sm="4">
									<label className="lb-label">Default Scenario
										<Tooltip className="tooltip-icon" placement="top" title="text">
											<SvgIcon name="info" viewbox="0 0 22 22.001" />
										</Tooltip>
									</label>
									<Input defaultValue="2" />
								</Col>
								<Col sm="4">
									<label className="lb-label">Discount %
										<Tooltip className="tooltip-icon" placement="top" title="text">
											<SvgIcon name="info" viewbox="0 0 22 22.001" />
										</Tooltip>
									</label>
									<Input.Group className="loanassets-group">
										<Input style={{ width: '70%' }} defaultValue="33" />
										<Button style={{ width: '30%' }} type="primary">%</Button>
									</Input.Group>
								</Col>
							</Row>
							<Row>
								<Col sm="12">
									<label className="lb-label">No. Of Installments
										<Tooltip className="tooltip-icon" placement="top" title="text">
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
					}
				</div>	
				<div className="lendborrow-right">
					<Summary
						loanamount="4000"
						collateralamount="100"
						marketprice="1700"
						loantype="Single Repayment"
						ltv="10"
						collateralprice="400"
						liquidationthreshold="10"
						interestrate="10"
						loanterm="2 Years 5 Months 20 Days"
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

export default LendBorrowComponent;
