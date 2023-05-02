import { apiSlice } from "../api/apiSlice";

export const customRankingsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserCustomRankings: builder.query({
            query: (userId) => `/rankings/custom?user=${userId}`,
            keepUnusedDataFor: 5,
            providesTags: ['CustomRankings']
        }),
        createNewCustomRankings: builder.mutation({
            query: (customRanking) => ({
                url: '/rankings/custom',
                method: 'POST',
                body: customRanking
            }),
            invalidatesTags: ['CustomRankings']
        }),
        deleteCustomRanking: builder.mutation({
            query: ({ id }) => ({
                url: `/rankings/custom/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['CustomRankings']
        })
    })
})

export const {
    useGetUserCustomRankingsQuery,
    useCreateNewCustomRankingsMutation,
    useDeleteCustomRankingMutation
} = customRankingsApiSlice
