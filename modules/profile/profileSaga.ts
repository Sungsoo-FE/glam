import {profileActions} from './profileSlice';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {getProfile as getData} from '../../api/profileApi';

function* getProfile() {
  try {
    const response: AxiosResponse = yield call(getData);
    yield put(profileActions.getProfileSuccess(response));
  } catch (err) {
    yield put(profileActions.getProfileError(err));
  }
}

function* watchGetProfile() {
  yield takeLatest(profileActions.getProfile, getProfile);
}

export default function* getProfileSaga() {
  yield all([fork(watchGetProfile)]);
}
