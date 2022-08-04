import {combineReducers} from '@reduxjs/toolkit';
import {all, call} from '@redux-saga/core/effects';
import getIntroductionsSaga from './modules/introduction/introductionSaga';
import getAdditionalSaga from './modules/introduction/additional/additionalSaga';
import getProfileSaga from './modules/profile/profileSaga';
import {introductionReducer} from './modules/introduction/introductionSlice';

const rootReducer = combineReducers({
  introductionReducer,
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
