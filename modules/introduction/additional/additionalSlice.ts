import {createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {Introduction} from '../introduction';

interface AdditionalState {
  loading: boolean;
  data: Introduction[] | null;
  error: AxiosError | null;
}

const initialState: AdditionalState = {
  loading: false,
  data: null,
  error: null,
};

const additionalSlice = createSlice({
  name: 'additional',
  initialState,
  reducers: {
    getAdditional: state => {
      state.loading = true;
    },
    getAdditionalSuccess: (state, {payload}) => {
      state.data = payload;
      state.loading = false;
    },
    getAdditionalError: (state, {payload}) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const additionalReducer = additionalSlice.reducer;
export const additionalActions = additionalSlice.actions;
