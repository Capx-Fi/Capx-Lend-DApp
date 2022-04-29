import React from "react";
import { Tabs } from "antd";
import "./index.less";
import BorrowTab from "./BorrowTab";
import LendTab from "./LendTab";

import { fetchLoanDetails } from "../../utils/fetchLoanDetails";

import Web3 from "web3";
import { MASTER_ABI } from "../../contracts/Master";
import { ORACLE_ABI } from "../../contracts/Oracle";

const { TabPane } = Tabs;

const Dashboard = () => {
  const masterContract = new Web3.eth.Contract(
    MASTER_ABI,
    "0x793130DFbFDC30629015C0f07b41Dc97ec14d8B5"
  );

  const oracleContract = new Web3.eth.Contract(
    ORACLE_ABI,
    "0x49d396Eb1B3E2198C32D2FE2C7146FD64f8BcF27"
  );

  fetchLoanDetails(
    "https://api.thegraph.com/subgraphs/name/shreyas3336/capx-lend",
    masterContract,
    oracleContract
  ).then((loans) => {
    console.log(loans, "loans");
  });
  return (
    <Tabs className="capx-tabs" defaultActiveKey="1" type="card">
      <TabPane tab="Borrow" key="1">
        <BorrowTab />
      </TabPane>
      <TabPane tab="Lend" key="2">
        <LendTab />
      </TabPane>
    </Tabs>
  );
};

export default Dashboard;
