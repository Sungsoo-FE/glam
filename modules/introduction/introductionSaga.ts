import {introductionActions} from './introductionSlice';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {getIntroductions} from '../../api/introductionApi';

function* getIntroduction() {
  try {
    const response: AxiosResponse = yield call(getIntroductions);
    yield put(introductionActions.getIntroductionsSuccess(response.data));
  } catch (err) {
    yield put(introductionActions.getIntroductionsError(err));
  }
}

function* watchGetIntroductions() {
  yield takeLatest(introductionActions.getIntroductions, getIntroduction);
}

export default function* getIntroductionsSaga() {
  yield all([fork(watchGetIntroductions)]);
}
