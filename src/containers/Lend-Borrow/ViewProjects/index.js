import React from "react";
import { Button, Tabs } from "antd";
import "./index.less";
import BorrowTabLB from "./BorrowTabLB";
import LendTabLB from "./LendTabLB";
import { useNavigate } from "react-router";

const { TabPane } = Tabs;

const ViewLendBorrow = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const operations = {
    right: pathname.includes("new") ? (
      <Button
        type="link"
        onClick={() => navigate("/lend-borrow")}
        className="best-offer-link"
      >
        Back to Lend Offers
      </Button>
    ) : (
      <Button
        onClick={() => navigate("/lend-borrow/newborrow")}
        className="action-outline-btn"
      >
        Create Loan Offer
      </Button>
    ),
  };
  return (
    <div>
      <Tabs
        className="capx-tabs"
        defaultActiveKey="1"
        type="card"
        tabBarExtraContent={operations}
        onChange={() => navigate("/lend-borrow")}
      >
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
