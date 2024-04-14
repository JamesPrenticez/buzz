import { baseApi } from './baseApi';
import { ISuccessResult, ILoginDeatils, IUser, IRegisterDeatils, IRefreshToken, IAccessToken } from '@models';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    refreshAccessToken: builder.mutation<ISuccessResult<IAccessToken>, IRefreshToken>({
      query: () => ({ 
        url: 'token/refresh',
        method: 'GET',
        queryKey: 'refreshToken',
      })
    }), 
    login: builder.mutation<ISuccessResult<IUser>, ILoginDeatils>({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        data: {
          email: email,
          password: password
        },
        queryKey: 'login',
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
  useLoginMutation,
  useRegisterMutation,
} = authApi;