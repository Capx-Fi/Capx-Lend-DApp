import { Button, Col, Radio, Row } from "antd";
import React from "react";
import { repaymentLoan, approveRepaymentLoan } from "../../../../utils/repaymentLoan";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { ERC20_ABI } from "../../../../contracts/ERC20";


function LiquidateLoan({ lendContract, loan , masterContract}) {
  const [value, setValue] = React.useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const web3 = new Web3(Web3.givenProvider);
  const { active, account, chainId } = useWeb3React();
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
          <b>Liquidate Loan</b>
        </Col>
      </Row>
      <Row>
        <Col sm="7">Amount to be paid : &nbsp;</Col>
        <Col sm="5" className="text-right">
          <b>{loan?.liquidationAmt.toString()}</b>
        </Col>
      </Row>
      <Button className="action-btn mt-3" block
        onClick={() => approveLiquidation(
          masterContract,
          account,
          loan?.loanID,
          ERC20_ABI, 
          lendContract._address,
          loan?.stableCoinAddress
        )}
      >
        Approve Loan Liquidation
      </Button>
      <Button className="action-btn mt-3" block
        onClick={() => liquidation(lendContract, account, loan?.loanID)}
      >
        Liquidate Loan
      </Button>
    </div>
  );
}

export default LiquidateLoan;
