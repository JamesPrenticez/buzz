import type { ISuccessResult, IUser, IUserTasks } from '@models';
import { updateUserField, updateUserTasks, userSlice } from '@redux/slices';
import { RootState } from '@redux/store';
import { getUserId } from './getUserId';
import { baseApi } from '@redux/services/baseApi';
import { Dispatch } from '@reduxjs/toolkit';

// TODO typesafe url params with an interface
const user_id = getUserId();

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query<ISuccessResult<{ data: IUser }>, void>({
      query: () => ({ 
        url: 'user/details',
        method: 'GET',
        queryKey: 'user',
        providesTags: ['user']
      })
    }),
    getUserTasks: builder.query<ISuccessResult<{ data: IUserTasks[] }>, {start_date: string, end_date: string}>({
      query: ({start_date, end_date}) => ({ 
        url: `user/tasks?start_date=${start_date}&end_date=${end_date}`, 
        method: 'GET',
        body: {
          start_date,
          end_date
        },
        queryKey: 'userTasks',
        providesTags: ['userTasks'],
        // onSuccess: (data: IUserTasks[], { dispatch }: { dispatch: Dispatch }) => {
        //   console.log(data)
        //   console.log("here")
        //   dispatch(updateUserTasks(data));
        // },
        // Pagination - https://redux-toolkit.js.org/rtk-query/usage/pagination
      }),
    }),  
    updateUserDetails: builder.mutation<IUser, Partial<IUser> | { key: keyof IUser, value: any }>({
      query: (update) => ({
        url: 'user',
        method: 'PUT',
        data: ('key' in update) && {
          [update.key]: update.value,
        }
      }),
      async onQueryStarted(update, { dispatch, queryFulfilled, getState }) {
        // Optimistic Updating
        // Save the current user state before the update
        const previousUser = (getState() as RootState).user.data;

        // Check if the update contains a single field or multiple fields
        if ('key' in update) {
          // Single Field at a time
          dispatch(updateUserField(update));
        } else {
          // All fields at once
          dispatch(userSlice.actions.updateUser(update));
        }
        
        try {
          // Wait for the query to be fulfilled
          await queryFulfilled;
        } catch {
          // If the query fails, roll back to the previous state
          dispatch(userSlice.actions.updateUser(previousUser));
        }
      },
    }),

  }),
});

export const { 
  useGetUserDetailsQuery,
  useGetUserTasksQuery,
  useUpdateUserDetailsMutation
} = userApi;
