import { bindActionCreators } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { AuthSlice } from "./authSlice";
import { reduxStore } from "./store";

export const NewSlice = (Slice) => {
  type StateType = typeof Slice.getInitialState;
  const state = (): StateType => useSelector((state: any) => state[AuthSlice.name]);
  const actions = bindActionCreators(Slice.actions, reduxStore.dispatch)
  return { actions, state };
}
