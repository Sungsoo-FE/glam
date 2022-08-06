import {customActions} from './customSlice';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {getCustom as getData} from '../../../api/introductionApi';

function* getCustom() {
  try {
    const response: AxiosResponse = yield call(getData);
    yield put(customActions.getCustomSuccess(response.data));
  } catch (err) {
    yield put(customActions.getCustomError(err));
  }
}

function* watchGetCustom() {
  yield takeLatest(customActions.getCustom, getCustom);
}

export default function* getCustomSaga() {
  yield all([fork(watchGetCustom)]);
}
