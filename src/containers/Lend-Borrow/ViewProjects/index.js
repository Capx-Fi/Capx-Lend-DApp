import React from "react";
import { Button, Tabs } from "antd";
import "./index.less";
import BorrowTabLB from "./BorrowTabLB";
import LendTabLB from "./LendTabLB";

const { TabPane } = Tabs;

const ViewLendBorrow = () => {
  return (
    <div>
      <Tabs className="capx-tabs" defaultActiveKey="1" type="card">
        <TabPane tab="Borrow" key="1">
          <BorrowTabLB />
        </TabPane>
        <TabPane tab="Lend" key="2">
          <LendTabLB />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ViewLendBorrow;
