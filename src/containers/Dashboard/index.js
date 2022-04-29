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

const { TabPane } = Tabs;

const Dashboard = () => {
  const [loans, setLoans] = useState(null);
  const web3 = new Web3(Web3.givenProvider);

  const masterContract = new web3.eth.Contract(
    MASTER_ABI,
    "0x793130DFbFDC30629015C0f07b41Dc97ec14d8B5"
  );

  const oracleContract = new web3.eth.Contract(
    ORACLE_ABI,
    "0x49d396Eb1B3E2198C32D2FE2C7146FD64f8BcF27"
  );

  useEffect(() => {
    fetchLoanDetails(
      "https://api.thegraph.com/subgraphs/name/shreyas3336/capx-lend",
      masterContract,
      oracleContract
    ).then((loans) => {
      setLoans(loans);
    });
  }, []);

  return loans ? (
    <>
      <Tabs className="capx-tabs" defaultActiveKey="1" type="card">
        <TabPane tab="Borrow" key="1">
          <BorrowTab loans={loans} />
        </TabPane>
        <TabPane tab="Lend" key="2">
          <LendTab loans={loans} />
        </TabPane>
      </Tabs>
    </>
  ) : (
    <LoadingScreen />
  );
};

export default Dashboard;
