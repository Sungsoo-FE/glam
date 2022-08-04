import {additionalActions} from './additionalSlice';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {getAdditional as getData} from '../../../api/introductionApi';

function* getAdditional() {
  try {
    const response: AxiosResponse = yield call(getData);
    yield put(additionalActions.getAdditionalSuccess(response.data));
  } catch (err) {
    yield put(additionalActions.getAdditionalError(err));
  }
}

function* watchGetAdditional() {
  yield takeLatest(additionalActions.getAdditional, getAdditional);
}

export default function* getIntroductionsSaga() {
  yield all([fork(watchGetAdditional)]);
}
