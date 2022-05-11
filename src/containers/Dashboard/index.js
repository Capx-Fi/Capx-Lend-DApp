import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import "./index.less";
import BorrowTab from "./BorrowTab";
import LendTab from "./LendTab";

import { fetchLoanDetails } from "../../utils/fetchLoanDetails";

import Web3 from "web3";
import { MASTER_ABI } from "../../contracts/Master";
import { ORACLE_ABI } from "../../contracts/Oracle";
import { LoadingScreen } from "../../components/common";
import { useQueryClient } from "react-query";

const { TabPane } = Tabs;

const Dashboard = () => {
  const queryClient = useQueryClient();
  return (
    <>
      <Tabs
        className="capx-tabs"
        defaultActiveKey="1"
        type="card"
        onChange={() => {
          queryClient.invalidateQueries("lendDashboard");
          queryClient.invalidateQueries("borrowDashboard");
        }}
      >
        <TabPane tab="Borrow" key="1">
          <BorrowTab />
        </TabPane>
        <TabPane tab="Lend" key="2">
          <LendTab />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Dashboard;
