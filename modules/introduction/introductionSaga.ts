import {introductionActions} from './introductionSlice';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {getIntroductions as getData} from '../../api/introductionApi';

function* getIntroductions() {
  try {
    const response: AxiosResponse = yield call(getData);
    yield put(introductionActions.getIntroductionsSuccess(response.data));
  } catch (err) {
    yield put(introductionActions.getIntroductionsError(err));
  }
}

function* watchGetIntroductions() {
  yield takeLatest(introductionActions.getIntroductions, getIntroductions);
}

export default function* getIntroductionsSaga() {
  yield all([fork(watchGetIntroductions)]);
}
