import { bindActionCreators, configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { AuthSlice } from './authSlice';

export const reduxStore = configureStore({
  reducer: {
    AuthSlice: AuthSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})

const NewSlice = (Slice) => {
  type StateType = typeof Slice.getInitialState;
  const state = (): StateType => useSelector((state: any) => state[AuthSlice.name]);
  const actions = bindActionCreators(Slice.actions, reduxStore.dispatch)
  return { actions, state };
}

export const { actions: authSliceAction, state: authSliceState } = NewSlice(AuthSlice);

