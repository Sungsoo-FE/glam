import {combineReducers} from '@reduxjs/toolkit';
import {all, call} from '@redux-saga/core/effects';
import getIntroductionsSaga from './modules/introduction/introductionSaga';
import getAdditionalSaga from './modules/introduction/additional/additionalSaga';
import getProfileSaga from './modules/profile/profileSaga';
import {introductionReducer} from './modules/introduction/introductionSlice';
import {additionalReducer} from './modules/introduction/additional/additionalSlice';
import {profileReducer} from './modules/profile/profileSlice';

const rootReducer = combineReducers({
  introductionReducer,
  additionalReducer,
  profileReducer,
});

export function* rootSaga() {
  yield all([
    call(getIntroductionsSaga),
    call(getAdditionalSaga),
    call(getProfileSaga),
  ]);
}

export type ReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
