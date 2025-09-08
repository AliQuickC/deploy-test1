import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { actions as formDatatateActions } from './slice/appSlice';

const rootActions = {
  ...formDatatateActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
