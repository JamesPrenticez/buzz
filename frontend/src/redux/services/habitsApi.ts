import { baseApi } from '@redux/services/baseApi'
import { ISuccessResult, IHabit } from '@models'

export const habitsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHabits: builder.query<ISuccessResult<IHabit[]>, void>({
      query: () => ({
        url: `habits`,
        method: 'GET',
        queryKey: 'getHabits',
      }),
    }),
  }),
});

export const { 
  useGetHabitsQuery
} = habitsApi;
