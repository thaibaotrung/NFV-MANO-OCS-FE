import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { RootState } from '../../redux/store';
import { getPersistConfig } from '../../redux/storage';

export type LoadingSlice = {
  isLoading: boolean;
};

const initialState: LoadingSlice = {
  isLoading: false
};

const sliceName = 'loadingSlice';

export const loadingSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    showLoading: (state: LoadingSlice) => {
      state.isLoading = true;
    },
    hideLoading: (state: LoadingSlice) => {
      state.isLoading = false;
    }
  }
});

export const getLoadingSlice = (state: RootState): LoadingSlice => state[sliceName];

export const { showLoading, hideLoading } = loadingSlice.actions;

export default persistReducer(getPersistConfig(sliceName, { whitelist: [''] }), loadingSlice.reducer);
