import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/auth-slice';
import userSlice from './slices/user-slice';
import loadingSlice from './slices/loading-slice';

export const whitelist = [];

export const rootReducer = combineReducers({
  authSlice,
  userSlice,
  loadingSlice
});
