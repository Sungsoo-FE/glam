import {createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {Introduction} from './introduction';

interface IntroductionState {
  loading: boolean;
  data: Introduction[] | null;
  error: AxiosError | null;
}

const initialState: IntroductionState = {
  loading: false,
  data: null,
  error: null,
};

const introductionSlice = createSlice({
  name: 'introduction',
  initialState,
  reducers: {
    getIntroductions: state => {
      state.loading = true;
    },
    getIntroductionsSuccess: (state, {payload}) => {
      state.data = payload;
      state.loading = false;
    },
    getIntroductionsError: (state, {payload}) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const introductionReducer = introductionSlice.reducer;
export const introductionActions = introductionSlice.actions;
