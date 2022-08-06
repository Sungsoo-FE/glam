import {createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {Introduction} from '../introduction';

interface CustomState {
  loading: boolean;
  data: Introduction[] | null;
  error: AxiosError | null;
}

const initialState: CustomState = {
  loading: false,
  data: null,
  error: null,
};

const customSlice = createSlice({
  name: 'custom',
  initialState,
  reducers: {
    getCustom: state => {
      state.loading = true;
    },
    getCustomSuccess: (state, {payload}) => {
      state.data = payload;
      state.loading = false;
    },
    getCustomError: (state, {payload}) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const customReducer = customSlice.reducer;
export const customActions = customSlice.actions;
