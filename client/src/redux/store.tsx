import { configureStore } from '@reduxjs/toolkit';
import { AuthSlice } from './authSlice';
import { NewSlice } from './reduxUtils';

export const reduxStore = configureStore({
  reducer: {
    AuthSlice: AuthSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})


export const { actions: AuthSliceAction, state: AuthSliceState } = NewSlice(AuthSlice);

