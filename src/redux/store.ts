import { configureStore } from '@reduxjs/toolkit';
import appState from './slice/appSlice';

const store = configureStore({
  reducer: {
    appState: appState,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
