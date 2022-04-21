import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState: {
    isLogined: false,
  },
  reducers: {
    setIsLogined: (state, action) => {
      state.isLogined = action.payload
    }
  }
})

