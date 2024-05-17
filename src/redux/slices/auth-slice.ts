import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { RootState } from 'redux/store';
import { getPersistConfig } from '../../redux/storage';
import { LoginStart, LoginSuccess, LogoutStart } from 'redux/actions/authAction';
import { ErrorAction, ErrorResponse } from 'types/common.dto';

export type IAuthSlice = {
  auth?: any;
  errorLogin?: ErrorResponse;
  loadingLogin?: boolean;
};

const initialState: IAuthSlice = {};

const sliceName = 'authSlice';

const authSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    loginStart: (state: IAuthSlice, payload: LoginStart) => {
      state.loadingLogin = true;
    },
    loginSuccess: (state: IAuthSlice, { payload }: LoginSuccess) => {
      state.loadingLogin = false;
      state.auth = payload;
    },
    loginError: (state: IAuthSlice, { payload }: ErrorAction) => {
      state.loadingLogin = false;
      state.errorLogin = payload;
    },
    logoutStart: (state: IAuthSlice, payload: LogoutStart) => {},
    logoutSuccess: (state: IAuthSlice) => {
      state.auth = undefined;
    }
  }
});

export const getAuthSlice = (state: RootState): IAuthSlice => state[sliceName];

export const { loginStart, loginSuccess, loginError, logoutStart } = authSlice.actions;

export default persistReducer(getPersistConfig(sliceName, { whitelist: ['auth'] }), authSlice.reducer);
