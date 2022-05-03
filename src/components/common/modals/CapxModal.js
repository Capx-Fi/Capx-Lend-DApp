import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useDispatch } from "react-redux";
import { hideModal } from "../../../redux/features/modalSlice";

const CapxModal = (modal) => {
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        title={null}
        className="capx-modal"
        visible={true}
        onCancel={() => dispatch(hideModal())}
        closable={true}
        footer={null}
      >
        <p>{modal.modalProps.lottie}</p>
        <p>{modal.modalTitle}</p>
        <p>{modal.modalSubtitle}</p>
      </Modal>
    </>
  );
};

export default CapxModal;
