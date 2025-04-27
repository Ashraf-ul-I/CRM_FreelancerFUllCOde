import { apiSlice } from "../api/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "/project/get-project",
      transformResponse: (response) => response.data || [],
      providesTags: ['Projects'], // Tag this query with 'Projects'
    }),
    addProject: builder.mutation({
      query: ({ title, budget, deadline, status, clientId }) => ({
        url: `/project/create-project/${clientId}`,
        method: "POST",
        body: { title, budget, deadline, status },
      }),
      invalidatesTags: ['Projects'], // Invalidate 'Projects' tag on add project
    }),
      updateProject: builder.mutation({
        query: ({ projectId, ...patch }) => ({
          url: `/project/update-project/${projectId}`,
          method: "PATCH",
          body: patch, // { title, budget, deadline, status, clientId }
        }),
        invalidatesTags: ['Projects'],
      }),
           
    deleteProject: builder.mutation({
      query: (projectId: string) => ({
        url: `/project/delete-project/${projectId}`,
        method: "DELETE",
      }),
      // Invalidate 'Projects' tag on delete
      invalidatesTags: ['Projects'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation  
} = projectApi;
