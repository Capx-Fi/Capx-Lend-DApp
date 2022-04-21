import React from "react";
import { Tabs } from "antd";
import "./index.less";
import BorrowTab from "./BorrowTab";
import UpcomingPaymentTab from "./UpcomingPaymentTab";
import LendTab from "./LendTab";

const { TabPane } = Tabs;

const Dashboard = () => {
    return (
        <Tabs className="capx-tabs" defaultActiveKey="1" type="card">
            <TabPane tab="Borrow" key="1">
                <BorrowTab />
                {/* <UpcomingPaymentTab /> */}
            </TabPane>
            <TabPane tab="Lend" key="2">
                <LendTab />
            </TabPane>
        </Tabs>
    )
}

export default Dashboard