import React from "react";
import { Button, Select, Tooltip, Radio } from "antd";
import { SvgIcon, Row, Col, CapxScrollbars } from "../../../components/common";
import "./index.less";

const { Option } = Select;

const BorrowTab = (collapsed) => {
    const [isCollapsed, setIsCollapsed] = React.useState(collapsed);
    const [value, setValue] = React.useState(1);
    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
      };
    return (
        <>
            <Row>
                <Col>
                    <div className="capx-card dashboard-statics-card">
                        <ul>
                            <li>
                                <p>Borrowed Amount</p>
                                <h4>125567.11 </h4>
                            </li>
                            <li>
                                <p>Active loans</p>
                                <h4>3</h4>
                            </li>
                            <li>
                                <p>Interest Paid</p>
                                <h4>$560.00</h4>
                            </li>
                            <li>
                                <p>Loan Amount Repayed</p>
                                <h4>$560.00</h4>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
            <Row className="heading-row">
                <Col>
                    <h2>Orders</h2>
                </Col>
                <Col>
                    <Select suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />} placeholder="Sort By" style={{ width: 120 }}>
                        <Option value="sb1">Date</Option>
                        <Option value="sb2">Name</Option>
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <CapxScrollbars style={{ height: "59vh" }}>
                        <div className="order-list">
                            <div className="orderlist-card">
                                <div className="capx-card">
                                    <div className="ordercard-upper">
                                        <div className="upper-left">
                                            <b>Order ID: 332415526</b>
                                            <span className="ml-4">Health Factor : <b>1.2</b> 
                                                <Tooltip className="tooltip-icon" placement="top" title="test">
                                                    <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                </Tooltip>
                                            </span>
                                        </div>
                                        <div className="upper-right">
                                            <span className="badge">Pending</span>
                                            <span className="badge">Single Payment</span>
                                        </div>
                                    </div>
                                    <div className="ordercard-bottom">
                                        <ul>
                                            <li>
                                                <p>Loan Amount</p>
                                                <h4>$1000</h4>
                                            </li>
                                            <li>
                                                <p>Loan Period</p>
                                                <h4>3 months</h4>
                                            </li>
                                            <li>
                                                <p>3 months</p>
                                                <h4>22/09/2022</h4>
                                            </li>
                                            <li>
                                                <p>Interet Rate</p>
                                                <h4>23.00%</h4>
                                            </li>
                                            <li>
                                                <p>Collateral Asset</p>
                                                <h4>$1233.00</h4>
                                            </li>
                                        </ul>
                                        <Button onClick={() => setIsCollapsed(!isCollapsed)} className={`arrow-collapse ${isCollapsed ? 'down' : 'up'}`} type="link"><SvgIcon name="arrow-down" viewbox="0 0 18 10.5" /></Button>
                                    </div>
                                </div>
                                <div className={`additional-info collapse-content ${isCollapsed ? 'collapsed' : 'expanded'}`}>
                                    <div className="additional-info-inner">
                                        <h3>Additional Info</h3>
                                        <div className="additional-info-dtl">
                                            <div className="additionalinfo-left">
                                                <ul>
                                                    <li>
                                                        <p>Market Price 
                                                            <Tooltip className="tooltip-icon" placement="top" title="test">
                                                                <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                            </Tooltip>
                                                        </p>
                                                        <h4>xxx %</h4>
                                                    </li>
                                                    <li>
                                                        <p>Discount
                                                            <Tooltip className="tooltip-icon" placement="top" title="test">
                                                                <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                            </Tooltip>
                                                        </p>
                                                        <h4>xxx %</h4>
                                                    </li>
                                                    <li>
                                                        <p>Collateral Amount</p>
                                                        <h4>1111 XYZ</h4>
                                                    </li>
                                                    <li>
                                                        <p>Total Interest</p>
                                                        <h4>$500.00</h4>
                                                    </li>
                                                    <li>
                                                        <p>Interest Accured</p>
                                                        <h4>$300.00</h4>
                                                    </li>
                                                    <li>
                                                        <p>Pay-off Amount</p>
                                                        <h4>$3000.00</h4>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="additionalinfo-right">
                                                <div className="replay-loan">
                                                    <Row className="mb-3">
                                                        <Col><b>Repay Loan</b></Col>
                                                        <Col className="text-right"><b>$1300</b></Col>
                                                        <Col sm="12">Amount to be paid :</Col>
                                                    </Row>
                                                    <Button type="primary" block>Repay Loan</Button>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="orderlist-card">
                                <div className="capx-card">
                                    <div className="ordercard-upper">
                                        <div className="upper-left">
                                            <b>Order ID: 332415526</b>
                                            <span className="ml-4">Health Factor : <b>1.2</b> 
                                                <Tooltip className="tooltip-icon" placement="top" title="test">
                                                    <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                </Tooltip>
                                            </span>
                                        </div>
                                        <div className="upper-right">
                                            <span className="badge">Active</span>
                                            <span className="badge">Installment</span>
                                        </div>
                                    </div>
                                    <div className="ordercard-bottom">
                                        <ul>
                                            <li>
                                                <p>Loan Amount</p>
                                                <h4>$1000</h4>
                                            </li>
                                            <li>
                                                <p>Loan Period</p>
                                                <h4>3 months</h4>
                                            </li>
                                            <li>
                                                <p>3 months</p>
                                                <h4>22/09/2022</h4>
                                            </li>
                                            <li>
                                                <p>Interet Rate</p>
                                                <h4>23.00%</h4>
                                            </li>
                                            <li>
                                                <p>Collateral Asset</p>
                                                <h4>$1233.00</h4>
                                            </li>
                                        </ul>
                                        <Button onClick={() => setIsCollapsed(!isCollapsed)} className={`arrow-collapse ${isCollapsed ? 'down' : 'up'}`} type="link"><SvgIcon name="arrow-down" viewbox="0 0 18 10.5" /></Button>
                                    </div>
                                </div>
                                <div className={`additional-info collapse-content ${isCollapsed ? 'collapsed' : 'expanded'}`}>
                                    <div className="additional-info-inner">
                                        <h3>Additional Info</h3>
                                        <div className="additional-info-dtl">
                                            <div className="additionalinfo-left">
                                                <ul className="four-col">
                                                    <li>
                                                        <p>Market Price 
                                                            <Tooltip className="tooltip-icon" placement="top" title="test">
                                                                <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                            </Tooltip>
                                                        </p>
                                                        <h4>xxx %</h4>
                                                    </li>
                                                    <li>
                                                        <p>Discount
                                                            <Tooltip className="tooltip-icon" placement="top" title="test">
                                                                <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                            </Tooltip>
                                                        </p>
                                                        <h4>xxx %</h4>
                                                    </li>
                                                    <li>
                                                        <p>Collateral Amount</p>
                                                        <h4>1111 XYZ</h4>
                                                    </li>
                                                    <li>
                                                        <p>Installment</p>
                                                        <h4>7</h4>
                                                    </li>
                                                    <li>
                                                        <p>Total Interest</p>
                                                        <h4>$500.00</h4>
                                                    </li>
                                                    <li>
                                                        <p>Interest Accured</p>
                                                        <h4>$300.00</h4>
                                                    </li>
                                                    <li>
                                                        <p>Default Scenario</p>
                                                        <h4>2</h4>
                                                    </li>
                                                    <li>
                                                        <p>Pay-off Amount</p>
                                                        <h4>$3000.00</h4>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="additionalinfo-right">
                                                <div className="installment-completed">
                                                    <Row className="mb-3">
                                                        <Col sm="12" className="mb-2">
                                                            <Radio.Group onChange={onChange} value={value}>
                                                                <Radio value={1}>Installment</Radio>
                                                                <Radio value={2}>Complete Payment</Radio>
                                                            </Radio.Group>
                                                        </Col>
                                                        <Col sm="8">Amount to be paid :</Col>
                                                        <Col sm="4" className="text-right"><b>$100</b></Col>
                                                    </Row>
                                                    <Button type="primary" block>Approve Repayment</Button>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="orderlist-card">
                                <div className="capx-card">
                                    <div className="ordercard-upper">
                                        <div className="upper-left">
                                            <b>Order ID: 332415526</b>
                                            <span className="ml-4">Health Factor : <b>1.2</b> 
                                                <Tooltip className="tooltip-icon" placement="top" title="test">
                                                    <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                </Tooltip>
                                            </span>
                                        </div>
                                        <div className="upper-right">
                                            <span className="badge">Completed</span>
                                            <span className="badge">One Time</span>
                                        </div>
                                    </div>
                                    <div className="ordercard-bottom">
                                        <ul>
                                            <li>
                                                <p>Loan Amount</p>
                                                <h4>$1000</h4>
                                            </li>
                                            <li>
                                                <p>Loan Period</p>
                                                <h4>3 months</h4>
                                            </li>
                                            <li>
                                                <p>3 months</p>
                                                <h4>22/09/2022</h4>
                                            </li>
                                            <li>
                                                <p>Interet Rate</p>
                                                <h4>23.00%</h4>
                                            </li>
                                            <li>
                                                <p>Collateral Asset</p>
                                                <h4>$1233.00</h4>
                                            </li>
                                        </ul>
                                        <Button onClick={() => setIsCollapsed(!isCollapsed)} className={`arrow-collapse ${isCollapsed ? 'down' : 'up'}`} type="link"><SvgIcon name="arrow-down" viewbox="0 0 18 10.5" /></Button>
                                    </div>
                                </div>
                                <div className={`additional-info collapse-content ${isCollapsed ? 'collapsed' : 'expanded'}`}>
                                    <div className="additional-info-inner">
                                        <h3>Additional Info</h3>
                                        <div className="additional-info-dtl">
                                            <div className="additionalinfo-left">
                                                <ul>
                                                    <li>
                                                        <p>Market Price 
                                                            <Tooltip className="tooltip-icon" placement="top" title="test">
                                                                <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                            </Tooltip>
                                                        </p>
                                                        <h4>xxx %</h4>
                                                    </li>
                                                    <li>
                                                        <p>Discount
                                                            <Tooltip className="tooltip-icon" placement="top" title="test">
                                                                <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                            </Tooltip>
                                                        </p>
                                                        <h4>xxx %</h4>
                                                    </li>
                                                    <li>
                                                        <p>Collateral Amount</p>
                                                        <h4>1111 XYZ</h4>
                                                    </li>
                                                    <li>
                                                        <p>Total Interest</p>
                                                        <h4>$500.00</h4>
                                                    </li>
                                                    <li>
                                                        <p>Interest Accured</p>
                                                        <h4>$300.00</h4>
                                                    </li>
                                                    <li>
                                                        <p>Pay-off Amount</p>
                                                        <h4>$3000.00</h4>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="additionalinfo-right">
                                            <div className="installment-completed">
                                                    <Row className="mb-3">
                                                        <Col sm="12" className="mb-2">
                                                            <Radio.Group onChange={onChange} value={value}>
                                                                <Radio value={1}>Installment</Radio>
                                                                <Radio value={2}>Complete Payment</Radio>
                                                            </Radio.Group>
                                                        </Col>
                                                        <Col sm="8">Amount to be paid :</Col>
                                                        <Col sm="4" className="text-right"><b>$100</b></Col>
                                                        <Col sm="8">Penalty :</Col>
                                                        <Col sm="4" className="text-right"><b>3%</b></Col>
                                                    </Row>
                                                    <Button type="primary" block>Approve Repayment</Button>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CapxScrollbars>
                </Col>
            </Row>
        </>
    )
}

export default BorrowTab