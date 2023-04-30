import { apiSlice } from "../api/apiSlice";

export const rankingsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRankings: builder.query({
            query: () => '/rankings/nfl',
            keepUnusedDataFor: 5
        }),
        getCurrentRanking: builder.query({
            query: (format) => `/rankings/nfl/${format}`
        }),
        getCurrentRankingTemplates: builder.query({
            query: () => '/rankings/templates'
        })
    })
})

export const {
    useGetRankingsQuery,
    useGetCurrentRankingQuery,
    useGetCurrentRankingTemplatesQuery
} = rankingsApiSlice
