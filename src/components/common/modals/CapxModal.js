import React, { useState } from "react";
import { Modal, Button, Divider } from "antd";
import { useDispatch } from "react-redux";
import { hideModal } from "../../../redux/features/modalSlice";
import Lottie from "lottie-react";

import CreateLoanSuccess from "../../../assets/lottie/CreateLoan/CreateLoanSuccess.json";
import CreateLoanInProgress from "../../../assets/lottie/CreateLoan/CreateLoanInProgress.json";
import CreateLoanInitial from "../../../assets/lottie/CreateLoan/CreateLoanInitial.json";

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
            modal.modalType === "Error" ? ErrorState : CreateLoanInProgress
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
