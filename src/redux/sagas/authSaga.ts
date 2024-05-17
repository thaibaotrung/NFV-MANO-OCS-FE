import { takeLatest } from 'redux-saga/effects';
import { loginStart, logoutStart } from '../../redux/slices/auth-slice';
import { LoginStart, LogoutStart } from '../actions/authAction';

function* watchLogin({ payload }: LoginStart) {
  // try {
  //   const response = yield authAdminAPI.login(payload);
  //   yield delay(500);
  //   yield put(loginSuccess(response));
  // } catch (error: any) {
  //   yield put(loginError(error));
  // }
}

function* watchLogout({ payload }: LogoutStart) {}

export default function* authSaga() {
  yield takeLatest(loginStart, watchLogin);
  yield takeLatest(logoutStart, watchLogout);
}
