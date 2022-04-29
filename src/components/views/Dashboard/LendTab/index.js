import React from "react";
import { Button, Select, Tooltip, Radio } from "antd";
import { SvgIcon, Row, Col, CapxScrollbars } from "../../../common";
import "./index.less";

const { Option } = Select;

const LendTab = (collapsed) => {
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
                    <div className="capx-card-secondary dashboard-statics-card">
                        <ul>
                            <li>
                                <p>Lent Amount</p>
                                <h4>125567.11 </h4>
                            </li>
                            <li>
                                <p>Number of loans</p>
                                <h4>3</h4>
                            </li>
                            <li>
                                <p>Interest Accured</p>
                                <h4>$560.00</h4>
                            </li>
                            <li>
                                <p>Interest Pending</p>
                                <h4>$560.00</h4>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
            <Row className="heading-row">
                <Col className="left-col">
                    <Select dropdownClassName="capx-dropdown" suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />} placeholder="Loan Type" bordered={false}>
                        <Option value="1">Loan Type</Option>
                        <Option value="2">Loan Type</Option>
                    </Select>
                    <Select dropdownClassName="capx-dropdown" suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />} placeholder="Company Asset" bordered={false}>
                        <Option value="1">Company Asset</Option>
                        <Option value="2">Company Asset</Option>
                    </Select>
                    <Select dropdownClassName="capx-dropdown" suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />} placeholder="Lending Asset" bordered={false}>
                        <Option value="1">Lending Asset</Option>
                        <Option value="2">Lending Asset</Option>
                    </Select>
                    <Select dropdownClassName="capx-dropdown" suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />} placeholder="Loan Status" bordered={false}>
                        <Option value="1">Loan Status</Option>
                        <Option value="2">Loan Status</Option>
                    </Select>
                </Col>
                <Col className="right-col">
                    <Select dropdownClassName="capx-dropdown" suffixIcon={<SvgIcon name="arrow-down" viewbox="0 0 18 10.5" />} placeholder="Sort By" style={{ minWidth: 120 }}>
                        <Option value="sb1">Order Status</Option>
                        <Option value="sb2">Order Type</Option>
                        <Option value="sb3">Health Factor</Option>
                    </Select>
                </Col>
                <Col sm="12">
                    <h2>All Projects</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <CapxScrollbars style={{ height: "59vh" }}>
                        <div className="order-list">
                            <div className="orderlist-card">
                                <h4 className="card-title">Expired</h4>
                                <div className="capx-card">
                                    <div className="ordercard-upper">
                                        <div className="upper-left">
                                            <b>Order ID: 332415526</b>
                                            <span className="ml-4 helthfactor-title">Health Factor : <b>1.2</b>
                                                <Tooltip className="tooltip-icon" placement="top" title="test">
                                                    <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                </Tooltip>
                                            </span>
                                        </div>
                                        <div className="upper-right">
                                            <span className="badge badge-green">Single Payment</span>
                                            <span className="badge badge-expired">Expired</span>
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
                                                <div className="additionalinfo-right-inner">
                                                    <Row className="mb-2">
                                                        <Col sm="12"><b>Claim Assets</b></Col>
                                                    </Row>
                                                    <Row>
                                                        <Col sm="7">Amount to be paid :</Col>
                                                        <Col sm="5" className="text-right"><b>$1300</b></Col>
                                                    </Row>
                                                    <Row>
                                                        <Col sm="7">Penalty :
                                                            <Tooltip className="tooltip-icon" placement="top" title="test">
                                                                <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                            </Tooltip>
                                                        </Col>
                                                        <Col sm="5" className="text-right"><b>3%</b></Col>
                                                    </Row>
                                                    <Button className="action-btn mt-3" block>Claim Assets</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="orderlist-card">
                                <h4 className="card-title">Funded</h4>
                                <div className="capx-card">
                                    <div className="ordercard-upper">
                                        <div className="upper-left">
                                            <b>Order ID: 332415526</b>
                                            <span className="ml-4 helthfactor-title">Health Factor : <b>1.2</b>
                                                <Tooltip className="tooltip-icon" placement="top" title="test">
                                                    <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                </Tooltip>
                                            </span>
                                        </div>
                                        <div className="upper-right">
                                            <span className="badge badge-green">Single Payment</span>
                                            <span className="badge badge-funded">Funded</span>
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
                                                <div className="additionalinfo-right-inner">
                                                    <Row className="mb-2">
                                                        <Col sm="12"><b>Accept Loan Offer</b></Col>
                                                    </Row>
                                                    <Row>
                                                        <Col sm="7">Loan Amount : </Col>
                                                        <Col sm="5" className="text-right"><b>$3000.00</b></Col>
                                                    </Row>
                                                    <Button className="action-btn mt-3" block>Accept Loan</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="orderlist-card">
                                <h4 className="card-title">Upcoming Orders</h4>
                                <div className="capx-card">
                                    <div className="ordercard-upper">
                                        <div className="upper-left">
                                            <b>Order ID: 332415526</b>
                                            <span className="ml-4 helthfactor-title">Health Factor : <b>1.2</b>
                                                <Tooltip className="tooltip-icon" placement="top" title="test">
                                                    <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                </Tooltip>
                                            </span>
                                        </div>
                                        <div className="upper-right">
                                            <span className="badge badge-green">Single Payment</span>
                                            <span className="badge badge-active">Active</span>
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
                                                <div className="additionalinfo-right-inner">
                                                    <Row className="mb-2">
                                                        <Col sm="12"><b>Repay Loan</b></Col>
                                                    </Row>
                                                    <Row>
                                                        <Col sm="7">Amount to be paid :</Col>
                                                        <Col sm="5" className="text-right"><b>$3000</b></Col>
                                                    </Row>
                                                    <Button className="action-btn mt-3" block>Repay Loan</Button>
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
                                            <span className="ml-4 helthfactor-title">Health Factor : <b>1.2</b>
                                                <Tooltip className="tooltip-icon" placement="top" title="test">
                                                    <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                </Tooltip>
                                            </span>
                                        </div>
                                        <div className="upper-right">
                                            <span className="badge badge-green">Installment</span>
                                            <span className="badge badge-active">Active</span>
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
                                                <div className="additionalinfo-right-inner">
                                                    <Row className="mb-2">
                                                        <Col sm="12" className="mb-2">
                                                            <Radio.Group onChange={onChange} value={value}>
                                                                <Radio value={1}>Installment</Radio>
                                                                <Radio value={2}>Complete Payment</Radio>
                                                            </Radio.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col sm="7">Amount to be paid :</Col>
                                                        <Col sm="5" className="text-right"><b>$3000</b></Col>
                                                    </Row>
                                                    <Button className="action-btn mt-3" block>Repay Loan</Button>
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
                                            <span className="ml-4 helthfactor-title">Health Factor : <b>1.2</b>
                                                <Tooltip className="tooltip-icon" placement="top" title="test">
                                                    <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                </Tooltip>
                                            </span>
                                        </div>
                                        <div className="upper-right">
                                            <span className="badge badge-green">Installment</span>
                                            <span className="badge badge-active">Active</span>
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
                                                <div className="additionalinfo-right-inner">
                                                    <Row className="mb-2">
                                                        <Col sm="12" className="mb-2">
                                                            <Radio.Group onChange={onChange} value={value}>
                                                                <Radio value={1}>Installment</Radio>
                                                                <Radio value={2}>Complete Payment</Radio>
                                                            </Radio.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col sm="7">Amount to be paid :</Col>
                                                        <Col sm="5" className="text-right"><b>$3000</b></Col>
                                                    </Row>
                                                    <Row>
                                                        <Col sm="7">Penalty :
                                                            <Tooltip className="tooltip-icon" placement="top" title="test">
                                                                <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                            </Tooltip>
                                                        </Col>
                                                        <Col sm="5" className="text-right"><b>3%</b></Col>
                                                    </Row>
                                                    <Button className="action-btn mt-3" block>Repay Loan</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="orderlist-card">
                                <h4 className="card-title">Orders</h4>
                                <div className="capx-card">
                                    <div className="ordercard-upper">
                                        <div className="upper-left">
                                            <b>Order ID: 332415526</b>
                                            <span className="ml-4 helthfactor-title">Health Factor : <b>1.2</b>
                                                <Tooltip className="tooltip-icon" placement="top" title="test">
                                                    <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                </Tooltip>
                                            </span>
                                        </div>
                                        <div className="upper-right">
                                            <span className="badge badge-green">Single Repayment</span>
                                            <span className="badge badge-cancelled">Cancelled</span>
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
                                                <div className="additionalinfo-right-inner">
                                                    <div className="cancelled-loan">
                                                        <SvgIcon name="cancelled-loan" viewbox="0 0 125.132 113" />
                                                        <h2>Loan Cancelled</h2>
                                                    </div>
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
                                            <span className="ml-4 helthfactor-title">Health Factor : <b>1.2</b>
                                                <Tooltip className="tooltip-icon" placement="top" title="test">
                                                    <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                </Tooltip>
                                            </span>
                                        </div>
                                        <div className="upper-right">
                                            <span className="badge badge-green">Installment</span>
                                            <span className="badge badge-completed">Completed</span>
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
                                                <div className="additionalinfo-right-inner">
                                                    <div className="completed-loan">
                                                        <SvgIcon name="completed-loan" viewbox="0 0 115.002 115.002" />
                                                        <h2>Loan Completed</h2>
                                                    </div>
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
                                            <span className="ml-4 helthfactor-title">Health Factor : <b>1.2</b>
                                                <Tooltip className="tooltip-icon" placement="top" title="test">
                                                    <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                </Tooltip>
                                            </span>
                                        </div>
                                        <div className="upper-right">
                                            <span className="badge badge-green">Installment</span>
                                            <span className="badge badge-defaulted">Defaulted</span>
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
                                                <div className="additionalinfo-right-inner">
                                                    <div className="defaulted-loan">
                                                        <SvgIcon name="defaulted-loan" viewbox="0 0 113.944 115" />
                                                        <h2>Loan Defaulted</h2>
                                                    </div>
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
                                            <span className="ml-4 helthfactor-title">Health Factor : <b>1.2</b>
                                                <Tooltip className="tooltip-icon" placement="top" title="test">
                                                    <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                </Tooltip>
                                            </span>
                                        </div>
                                        <div className="upper-right">
                                            <span className="badge badge-green">Installment</span>
                                            <span className="badge badge-pending">Pending</span>
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
                                                <div className="additionalinfo-right-inner">
                                                    <Row className="mb-2">
                                                        <Col sm="12">
                                                            <b>Cancel Borrow Request
                                                                <Tooltip className="tooltip-icon" placement="top" title="test">
                                                                    <SvgIcon name="info" viewbox="0 0 22 22.001" />
                                                                </Tooltip>
                                                            </b>
                                                        </Col>
                                                    </Row>
                                                    <Button className="cancel-btn mt-3" block>Cancel</Button>
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

export default LendTab