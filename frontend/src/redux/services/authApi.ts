import { baseApi } from './baseApi';
import { ISuccessResult, ILoginDeatils, IUser, IRegisterDeatils, IRefreshToken, IAccessToken } from '@models';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    refreshAccessToken: builder.mutation<ISuccessResult<{access: IAccessToken}>, IRefreshToken>({
      query: (refresh) => ({ 
        url: '/token/refresh',
        method: 'POST',
        data: {
          refresh: refresh,
        },
        queryKey: 'refreshToken',
      })
    }), 
    // TODO replace token with login that returns user details all in one api call
    token: builder.mutation<ISuccessResult<{access: IAccessToken, refresh: IRefreshToken}>, ILoginDeatils>({
      query: ({ email, password }) => ({
        url: '/token',
        method: 'POST',
        data: {
          email: email,
          password: password
        },
        queryKey: 'token',
      }),
    }),
    login: builder.mutation<ISuccessResult<{data: IUser, accessToken: IAccessToken, refreshToken: IRefreshToken}>, ILoginDeatils>({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        data: {
          email: email,
          password: password
        },
        queryKey: 'user',
      }),
    }),
    register: builder.mutation<ISuccessResult<IUser>, IRegisterDeatils>({
      query: ({ email, password }) => ({
        url: '/register',
        method: 'POST',
        data: {
          email: email,
          password: password
        },
        queryKey: 'register',
      }),
    }),
  }),
});

export const { 
  useRefreshAccessTokenMutation,
  useTokenMutation,
  useLoginMutation,
  useRegisterMutation,
} = authApi;