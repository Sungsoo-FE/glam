import {profileActions} from './profileSlice';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {getProfile as getData} from '../../api/profileApi';

function* getProfile() {
  try {
    const response: AxiosResponse = yield call(getData);
    yield put(profileActions.getProfileSuccess(response.data));
  } catch (err) {
    yield put(profileActions.getProfileError(err));
  }
}

function* watchGetIntroductions() {
  yield takeLatest(profileActions.getProfile, getProfile);
}

export default function* getIntroductionsSaga() {
  yield all([fork(watchGetIntroductions)]);
}
