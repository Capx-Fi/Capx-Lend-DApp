import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalType: null,
  modalProps: {},
  modalTitle: "",
  modalSubtitle: "",
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

      if (modal.modalSubtitle) {
        state.modalSubtitle = modal.modalSubtitle;
      }
    },
    hideModal: (state) => {
      state.modalType = null;
      state.modalProps = {};
      state.modalTitle = "";
      state.modalSubtitle = "";
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
