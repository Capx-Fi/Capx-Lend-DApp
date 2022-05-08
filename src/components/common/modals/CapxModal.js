import React, { useState } from "react";
import { Modal, Button, Divider } from "antd";
import { useDispatch } from "react-redux";
import { hideModal } from "../../../redux/features/modalSlice";
import Lottie from "lottie-react";

//create loan

import CreateLoanSuccess from "../../../assets/lottie/CreateLoan/CreateLoanSuccess.json";
import CreateLoanInProgress from "../../../assets/lottie/CreateLoan/CreateLoanInProgress.json";

//approve loan

import ApproveLoanSuccess from "../../../assets/lottie/CreateLoan/CreateLoanSuccess.json";
import ApproveLoanInProgress from "../../../assets/lottie/CreateLoan/CreateLoanInProgress.json";

//cancel loan

import CancelLoanSuccess from "../../../assets/lottie/Cancel/CancelLoanSuccess.json";
import CancelLoanInProgress from "../../../assets/lottie/Cancel/CancelLoanInProgress.json";

// Liquidation Loan
import LiquidationInBetween from  "../../../assets/lottie/Liquidation/LiquidationInBetween.json";

// Repay Loan
import RepayInProgress from "../../../assets/lottie/Repay/RepayInProgress.json";
import RepaySuccess from "../../../assets/lottie/Repay/RepaySuccess.json";

// Error
import ErrorState from "../../../assets/lottie/Error/ErrorState.json";

const CapxModal = (modal) => {
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        title={null}
        className="capx-modal capx-modal-loading"
        visible={true}
        onCancel={() => dispatch(hideModal())}
        closable={modal.closable}
        footer={" "}
        maskClosable={false}
        maskStyle={{
          height: "calc(100vh - 90px)",
          top: 61,
          background: "#151517",
        }}
        centered
      >
        {/* <div className="modal-icon">{modal.modalIcon}</div> */}
        <Lottie
          style={{
            width: "70%",
            margin: "0 auto",
          }}
          loop={true}
          animationData={
            modal.modalType === "Error"
              ? ErrorState
              : modal.modalType === "CreateLoan"
              ? CreateLoanInProgress
              : modal.modalType === "CreateLoanSuccess"
              ? CreateLoanSuccess
              : modal.modalType === "ApproveLoan"
              ? ApproveLoanInProgress
              : modal.modalType === "ApproveLoanSuccess"
              ? ApproveLoanSuccess
              : modal.modalType === "CancelLoan"
              ? CancelLoanInProgress
              : modal.modalType === "CancelLoanSuccess"
              ? CancelLoanSuccess
              : modal.modalType === "LiquidateLoan"
              ? LiquidationInBetween
              : modal.modalType === "LiquidateLoanSuccess"
              ? CreateLoanSuccess
              : modal.modalType === "RepayLoan"
              ? RepayInProgress
              : modal.modalType === "RepayLoanSuccess"
              ? RepaySuccess
              : CreateLoanInProgress
          }
        />
        <p>{modal.modalProps.lottie}</p>
        <h4>{modal.modalTitle}</h4>
        <p>{modal.modalSubtitle}</p>
      </Modal>
    </>
  );
};

export default CapxModal;
