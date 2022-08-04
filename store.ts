import {combineReducers} from '@reduxjs/toolkit';
import {all, call} from '@redux-saga/core/effects';
import getIntroductionsSaga from './modules/introduction/introductionSaga';
import {introductionReducer} from './modules/introduction/introductionSlice';

const rootReducer = combineReducers({
  introductionReducer,
});

export function* rootSaga() {
  yield all([call(getIntroductionsSaga)]);
}

export type ReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
