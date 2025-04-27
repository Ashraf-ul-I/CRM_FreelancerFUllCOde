import { apiSlice } from '../api/apiSlice';

export const logsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInteractionLogs: builder.query({
      query: (projectId: string) => ({
        url: `/interaction-logs/get-interactionLogs/${projectId}`,
        method: 'GET',
      }),
      providesTags: (result, error, projectId) => [{ type: 'Logs', id: projectId }],
      transformResponse: (response) => response.logs || [],
    }),

    createInteractionLog: builder.mutation({
      query: ({ date, projectId, interactionType, notes }) => ({
        url: `/interaction-logs/create-interaction/${projectId}`,
        method: 'POST',
        body: { date, interactionType, notes }, // <-- you missed sending body
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: 'Logs', id: projectId },
      ],
    }),
  }),
});

export const {
  useGetInteractionLogsQuery,
  useCreateInteractionLogMutation,
} = logsApi;
