import { createSlice } from '@reduxjs/toolkit';

export type AppState = {
  isLogin: boolean;
};

export const initialState: AppState = {
  isLogin: false,
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    login: (state: AppState) => {
      state.isLogin = true;
    },
    logout: (state: AppState) => {
      state.isLogin = false;
    },
  },
});

export const actions = appSlice.actions;

export default appSlice.reducer;
