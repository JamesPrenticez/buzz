import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { IUser, IUserTasks } from '@models';
import { userApi } from '@redux/services';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@constant';
import { authApi } from '@redux/services/authApi';

export interface UserState {
  data: IUser;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  data: {
    id: "",
    email: "",
    date_created: "",
    last_modified: "",
  },
  isAuthenticated: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<IUser> | null>) => {
      if(state.data){
        state.data = { ...state.data, ...action.payload };
      }
    },
    updateUserField: (state, action: PayloadAction<{ key: keyof IUser, value: any }>) => {
      if(state.data){
        const { key, value } = action.payload;
        if (key in state.data) {
          state.data[key] = value;
        }
      }
    },
    updateUserTasks: (state, action: PayloadAction<IUserTasks[]>) => {
      state.data.tasks = [...(state.data.tasks || []), ...action.payload];
    },
    loginUser(state) {
      // TODO intergrate with getUserDetails
      state.isAuthenticated = true;
    },
    logoutUser(state) {
      state.data = {
        id: "",
        email: "",
        date_created: "",
        last_modified: "",
      } as IUser;
      state.isAuthenticated = false;
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      // localStorage.clear(); - we dont want to delete everything
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => {
        return (
          authApi.endpoints.login.matchFulfilled(action) ||
          userApi.endpoints.getUserDetails.matchFulfilled(action)
        );
      },
      (state, action) => {
        state.data = action.payload.data.data;
      }
    );
  },
});

export const { 
  loginUser,
  logoutUser,
  updateUser,
  updateUserField,
  updateUserTasks
} = userSlice.actions;

export default userSlice;