import { apiSlice } from "../api/apiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => "/dashboard/overview",
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;