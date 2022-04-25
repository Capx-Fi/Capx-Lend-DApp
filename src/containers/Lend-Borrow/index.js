import React from "react";
import { Tabs, Button, Radio, Input, Select, Slider } from "antd";
import { Row, Col, SvgIcon } from "../../components/common";
import "./index.less";

const { TabPane } = Tabs;
const { Option } = Select;

const operations = {
	right: <Button type="link">Back to Lend Offers</Button>,
};

const marks = {
	0: '0',
	5: '5%',
	10: '10%',
	15: '15%',
	20: '20%',
	25: '25%',
	30: '30%',
	35: '35%',
	40: '40%',
	45: '45%',
	50: '50%',
	55: '55%',
	60: '60%',
	65: '65%',
	70: '70%',
	75: '75%',
	80: '80%',
	85: '85%',
	90: '90%',
	95: '95%',
	100: {
		label: "100%",
	}
  };

const LendBorrow = () => {
	const [value, setValue] = React.useState(1);
	const onChange = (e) => {
		setValue(e.target.value);
	};
	return (
		<Row>
			<Col sm="12">
				<div className="lendborrow-wrapper">
					<div className="lendborrow-left">
						<Tabs className='capx-tabs' defaultActiveKey='1' type='card' tabBarExtraContent={operations}>
							<TabPane tab='Borrow' key='1'>
								<Row>
									<Col sm="12">
										<label>Loan type</label>
										<Radio.Group onChange={onChange} value={value}>
											<Radio value={1}>Single Repayment</Radio>
											<Radio value={2}>Installment-Based Repayment</Radio>
										</Radio.Group>
									</Col>
								</Row>
								<Row>
									<Col>
										<label>Collateral Amount <small>Bal: 200</small></label>
										<Input.Group className="groupwith-select">
											<Input style={{ width: '70%' }} defaultValue="100" />
											<Select style={{ width: '30%' }} defaultValue="wvt" suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />}>
												<Option value="wvt">WVT</Option>
												<Option value="wvt2">wvt2</Option>
											</Select>
										</Input.Group>
									</Col>
									<Col>
										<label>Loan Asset</label>
										<Input.Group className="loanassets-select">
											<Input style={{ width: '70%' }} defaultValue="100" />
											<Button icon={<SvgIcon name="tether-icon" viewbox="0 0 24 24" />} style={{ width: '30%' }} type="primary">USDT</Button>
										</Input.Group>
									</Col>
								</Row>
								<Row>
									<Col>
										<label>Loan-To-Value </label>
										<Slider label={null} step={null} marks={marks} defaultValue={10} />
									</Col>
								</Row>
							</TabPane>
							<TabPane tab='Lend' key='2'>
								
							</TabPane>
						</Tabs>
					</div>
					<div className="lendborrow-right">
						<div className="summary-head">
							<h3>Summary</h3>
							<p>Authorise your loan before initiating the loan request</p>
						</div>
						<div className="summary-content">
							<ul>
								<li>
									<label>Loan Amount</label>
									<span>$4000</span>
								</li>
								<li>
									<label>Collateral Amount</label>
									<span>100 WVT</span>
								</li>
								<li>
									<label>Market Price</label>
									<span>$1700</span>
								</li>
								<li>
									<label>Loan Type</label>
									<span>Single Repayment</span>
								</li>
								<li>
									<label>LTV</label>
									<span>10%</span>
								</li>
								<li>
									<label>Collateral Price</label>
									<span>$400</span>
								</li>
								<li>
									<label>Liquidation Threshold</label>
									<span>10%</span>
								</li>
								<li>
									<label>Interest Rate</label>
									<span>10%</span>
								</li>
								<li>
									<label>Loan Term</label>
									<span>2 Years 5 Months 20 Days</span>
								</li>
								<li>
									<label>Interest Accured</label>
									<span>$250</span>
								</li>
								<li>
									<label>Service Fee</label>
									<span>0.25%</span>
								</li>
							</ul>
						</div>
						<div className="summary-footer">
							<div className="left">
								<small>Pay-Off Amount</small>
								<h2>$4250</h2>
							</div>
							<div className="right">
								<Button type="secondary" size="large">Approve Parameters</Button>
							</div>
						</div>
					</div>
				</div>
			</Col>
		</Row>
	);
};

export default LendBorrow;
