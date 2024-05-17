import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../redux/store';

export const AppLoading = () => {
  const { isLoading } = useAppSelector((state: any) => state.loadingSlice);
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
};
