import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            'auth',
            JSON.stringify({
              token: result.data.token,
              user: result.data.user,
            }),
          );
          dispatch(
            userLoggedIn({
              token: result.data.token,
              user: result.data.user,
            }),
          );
        } catch {
          // Handle error if needed
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        console.log('onQueryStarted triggered');
        try {
          const result = await queryFulfilled;
          console.log('Login success result:', result);

          localStorage.setItem(
            'auth',
            JSON.stringify({
              token: result.data.data.token,
              user: result.data.data.user,
            }),
          );

          dispatch(
            userLoggedIn({
              token: result.data.data.token,
              user: result.data.data.user,
            }),
          );
        } catch (error) {
          console.log('Login error:', error);
        }
      },
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: '/auth/logout',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation,useLogoutMutation } = authApi;
