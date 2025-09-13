import { configureStore } from '@reduxjs/toolkit';
import appState from './slice/appSlice';
import responseState from './slice/responseSlice';

const store = configureStore({
  reducer: {
    appState,
    responseState,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
