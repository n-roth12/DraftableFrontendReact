import { apiSlice } from "../api/apiSlice";

export const accountApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            query: () => '/user',
            keepUnusedDataFor: 5,
            providesTags: ['User']
        }),
        updateUser: builder.mutation({
            query: (body) => ({
                url: '/user',
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: builder.mutation({
            query: (password) => ({
                url: '/user',
                method: 'DELETE',
                body: password
            }),
            invalidatesTags: ['User']
        })
    })
})

export const {
    useGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation
} = accountApiSlice
