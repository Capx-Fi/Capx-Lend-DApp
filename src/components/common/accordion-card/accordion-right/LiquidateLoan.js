import { Button, Col, Radio, Row } from "antd";
import React, { useEffect, useState } from "react";
import {
  liquidation,
  approveLiquidation,
  checkApproveLiquidation,
} from "../../../../utils/liquidation";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { ERC20_ABI } from "../../../../contracts/ERC20";
import { useDispatch } from "react-redux";
import { convertToInternationalCurrencySystem } from "../../../../utils/convertToInternationalCurrencySystem";
import BigNumber from "bignumber.js";
import { useQueryClient } from "react-query";

function LiquidateLoan({ lendContract, loan, masterContract, from }) {
  const [value, setValue] = React.useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const [approved, setApproved] = useState(false);
  const dispatch = useDispatch();
  const web3 = new Web3(Web3.givenProvider);
  const queryClient = useQueryClient();
  const { active, account, chainId } = useWeb3React();

  useEffect(() => {
    console.log("LiquidateLoan useEffect");
    checkApproveLiquidation(
      masterContract,
      account,
      loan?.loanID,
      ERC20_ABI,
      lendContract._address,
      loan?.stableCoinAddress,
      setApproved,
      dispatch,
      queryClient,
      from
    );
  }, [account, chainId, loan, masterContract, queryClient, from]);
  return (
    <div>
      {/* {isInstallment && (
        <Row className="mb-2">
          <Col sm="12" className="mb-2">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Installment</Radio>
              <Radio value={2}>Complete Payment</Radio>
            </Radio.Group>
          </Col>
        </Row>
      )} */}
      <Row className="mb-2">
        <Col sm="12">
          <b className="titles-right">Liquidate Loan</b>
        </Col>
      </Row>
      <Row>
        <Col sm="7">Amount to be paid : &nbsp;</Col>
        <Col sm="5" className="text-right">
          <b>
            {convertToInternationalCurrencySystem(
              new BigNumber(loan?.liquidationAmt)
                .dividedBy(Math.pow(10, loan?.stableCoinDecimal))
                .toString(10)
            )}{" "}
            {loan?.stableCoinTicker}
          </b>
        </Col>
      </Row>
      {!approved ? (
        <Button
          className="action-btn mt-3"
          block
          onClick={() =>
            approveLiquidation(
              masterContract,
              account,
              loan?.loanID,
              ERC20_ABI,
              lendContract._address,
              loan?.stableCoinAddress,
              setApproved,
              dispatch,
              queryClient,
              from
            )
          }
        >
          Approve Loan Liquidation
        </Button>
      ) : (
        <Button
          className="action-btn mt-3"
          block
          onClick={() =>
            liquidation(
              lendContract,
              account,
              loan?.loanID,
              setApproved,
              dispatch,
              queryClient,
              from
            )
          }
        >
          Liquidate Loan
        </Button>
      )}
    </div>
  );
}

export default LiquidateLoan;
