import {createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {Profile} from './profile';

interface ProfileState {
  loading: boolean;
  data: Profile | null;
  error: AxiosError | null;
}

const initialState: ProfileState = {
  loading: false,
  data: null,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfile: state => {
      state.loading = true;
    },
    getProfileSuccess: (state, {payload}) => {
      state.data = payload;
      state.loading = false;
    },
    getProfileError: (state, {payload}) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const profileReducer = profileSlice.reducer;
export const profileActions = profileSlice.actions;
