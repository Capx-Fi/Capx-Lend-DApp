import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modalSlice";

const combinedReducer = combineReducers({
  modal: modalReducer,
});

const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});
