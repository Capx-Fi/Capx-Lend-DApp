import React from "react";
import { Button, Tabs } from "antd";
import "./index.less";
import BorrowTabLB from "./BorrowTabLB";
import LendTabLB from "./LendTabLB";
import { useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";

const { TabPane } = Tabs;

const ViewLendBorrow = () => {
  const navigate = useHistory();
  const pathname = window.location.pathname;
  const operations = {
    right: pathname.includes("new") ? (
      <Button
        type="link"
        onClick={() => navigate.push("/market")}
        className="best-offer-link"
      >
        Back to Lend Offers
      </Button>
    ) : (
      <Button
        onClick={() => navigate.push("/market/newLoan")}
        className="action-outline-btn"
      >
        Create Loan Offer
      </Button>
    ),
  };

  const queryClient = useQueryClient();
  return (
    <div>
      <Tabs
        className="capx-tabs"
        defaultActiveKey="1"
        type="card"
        tabBarExtraContent={operations}
        onChange={() => {
          navigate.push("/market");
          queryClient.invalidateQueries("lendLB");
          queryClient.invalidateQueries("borrowLB");
        }}
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
