import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    credentials: 'include', 
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const state = getState() as { auth?: { token?: string } };
      const token = state.auth?.token;
      if (token) {
          headers.set("Authorization", `Bearer ${token}`);
          headers.set('Content-Type', 'application/json');
      }
      return headers;
  },
  
  
  }),
  tagTypes: ['Logs','Projects','Reminders'],
  endpoints: () => ({}),
});
