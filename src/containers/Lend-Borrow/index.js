import React, { useState } from "react";
import { Tabs, Button } from "antd";
import { Row, Col } from "../../components/common";
import LendBorrowComponent from "./LendBorrowComponent";
import "./index.less";
import Summary from "./Summary";

const { TabPane } = Tabs;

const operations = {
	right: <Button type="link" className="best-offer-link">Back to Lend Offers</Button>,
};

const LendBorrow = () => {
	const [tab, setTab] = useState("1");
	return (
		<Row>
			<Col sm="12">
				<div className="lendborrow-wrapper">
					<div className="lendborrow-left">
						<Tabs className='capx-tabs' defaultActiveKey='1' type='card' tabBarExtraContent={operations} 
							activeKey={tab}
							onChange={key => {
							  setTab(key);
							}}
						>
							<TabPane tab='Borrow' key='1'>
								<LendBorrowComponent
									borrow_loan_assets
								/>
							</TabPane>
							<TabPane tab='Lend' key='2'>
								<LendBorrowComponent
									lend_loan_assets
								/>
							</TabPane>
						</Tabs>
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
			</Col>
		</Row>
	);
};

export default LendBorrow;