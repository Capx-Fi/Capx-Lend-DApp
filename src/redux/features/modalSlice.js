import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalType: null,
  modalProps: {},
  modalTitle: "",
  modalSubtitle: "",
  modalIcon: "",
  closable: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      const modal = action.payload;

      state.modalType = modal.modalType;

      if (modal.modalProps) {
        state.modalProps = modal.modalProps;
      }

      if (modal.modalTitle) {
        state.modalTitle = modal.modalTitle;
      }

      if (modal.modalIcon) {
        state.modalIcon = modal.modalIcon;
      }

      if (modal.modalSubtitle) {
        state.modalSubtitle = modal.modalSubtitle;
      }

      if (modal.closable) {
        state.closable = modal.closable;
      }
    },
    hideModal: (state) => {
      state.modalType = null;
      state.modalProps = {};
      state.modalTitle = "";
      state.modalSubtitle = "";
      state.modalIcon = "";
      state.closable = "";
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
