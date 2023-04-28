import { apiSlice } from "../api/apiSlice";

export const rankingsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRankings: builder.query({
            query: () => '/rankings/nfl',
            keepUnusedDataFor: 5
        }),
        getCurrentRanking: builder.query({
            query: (format) => `/rankings/nfl/${format}`
        })
    })
})

export const {
    useGetRankingsQuery,
    useGetCurrentRankingQuery
} = rankingsApiSlice
