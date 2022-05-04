import React, { useState } from "react";
import { Modal, Button, Divider } from "antd";
import { useDispatch } from "react-redux";
import { hideModal } from "../../../redux/features/modalSlice";

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
        maskStyle={{ height: 'calc(100vh - 97px)', top: 61, background: '#151517' }}
        centered
      >
        <div className="modal-icon">{modal.modalIcon}</div>
        <p>{modal.modalProps.lottie}</p>
        <h4>{modal.modalTitle}</h4>
        <p>{modal.modalSubtitle}</p>
      </Modal>
    </>
  );
};

export default CapxModal;
