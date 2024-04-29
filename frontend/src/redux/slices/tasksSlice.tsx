import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from '@models';
import { userApi } from '@redux/services';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@constant';
import { authApi } from '@redux/services/authApi';

export interface UserState {
  data: [];
  isAuthenticated: boolean;
}

const initialState: UserState = {
  data: [],
  isAuthenticated: false
};

export const userSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     (action) => {
  //       return (
  //         authApi.endpoints.login.matchFulfilled(action) 
  //       );
  //     },
  //     (state, action) => {
  //       state.data = action.payload.data.data;
  //     }
  //   );
  // },
});

export const { 
} = userSlice.actions;

export default userSlice;