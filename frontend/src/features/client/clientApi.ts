import { apiSlice } from "../api/apiSlice";

export const clientApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getClients: builder.query({
        query: () => "/client/get-client",
        transformResponse: (response) => response.client || [],
        }),
        addClient: builder.mutation({
        query: (data) => ({
            url: "/client/register-client",
            method: "POST",
            body: data,
        }),
        }),
        updateClient: builder.mutation({
        query: ({ id, ...data }) => ({
            url: `/client/update-client/${id}`,
            method: "PATCH",
            body: data,
        }),
        }),
        deleteClient: builder.mutation({
        query: (id) => ({
            url: `/client/delete-client/${id}`,
            method: "DELETE",
        }),
        }),
        getCLientById: builder.query({
        query: (id) => `/client/get-client/${id}`,
        }),
    }),
    });
     
export const {
        useGetClientsQuery,
        useAddClientMutation,
        useUpdateClientMutation,
        useDeleteClientMutation,
        useGetCLientByIdQuery,
    } = clientApi;
;