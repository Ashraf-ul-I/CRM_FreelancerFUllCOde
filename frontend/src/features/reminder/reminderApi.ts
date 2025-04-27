import { apiSlice } from "../api/apiSlice";

export const reminderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRemindersThisWeek: builder.query({
      query: () => ({
        url: "/reminder/get-reminder",
        method: "GET",
      }),
      transformResponse: (response) => response.reminders || [],
      providesTags: ['Reminders'], 
    }),
    getRemindersForProject: builder.query({
        query: (projectId: string) => ({
          url: `/reminder/project/${projectId}`,
          method: "GET",
        }),
        transformResponse: (response) => response.reminders || [],
        providesTags: ['Reminders'],
      }),
    createReminder: builder.mutation({
      query: ({ projectId, dueDate, message }) => ({
        url: `/reminder/add/${projectId}`,
        method: "POST",
        body: { dueDate, message },
      }),
      invalidatesTags: ['Reminders'], 
    }),
  }),
});

export const {
  useGetRemindersThisWeekQuery,
  useCreateReminderMutation,
  useGetRemindersForProjectQuery
} = reminderApi;