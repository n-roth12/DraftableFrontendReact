import { apiSlice } from "../api/apiSlice";

export const customRankingsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserCustomRankings: builder.query({
            query: (userId) => `/rankings/custom?user=${userId}`,
            keepUnusedDataFor: 5
        }),
    })
})

export const {
    useGetUserCustomRankingsQuery
} = customRankingsApiSlice
