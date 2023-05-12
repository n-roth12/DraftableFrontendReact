import { apiSlice } from "../api/apiSlice";

export const customRankingsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserCustomRankings: builder.query({
            query: (userId) => `/rankings/custom?user=${userId}`,
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) => [
                'CustomRanking',
                ...result.map(({ id }) => ({ type: 'CustomRanking', id }))
            ]
        }),
        getCustomRankingById: builder.query({
            query: (rankingId) => `rankings/custom/${rankingId}`,
            providesTags: ['CustomRanking']
        }),
        createNewCustomRankings: builder.mutation({
            query: (customRanking) => ({
                url: '/rankings/custom',
                method: 'POST',
                body: customRanking
            }),
            invalidatesTags: ['CustomRanking']
        }),
        deleteCustomRanking: builder.mutation({
            query: ({ id }) => ({
                url: `/rankings/custom/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['CustomRanking']
        }),
        updateCustomRanking: builder.mutation({
            query: (body) => ({
                url: '/rankings/custom',
                method: 'PUT',
                body
            }),
            invalidatesTags: ['CustomRanking']
            // optimistic update
            // async onQueryStarted(body, { dispatch, queryFulfilled }) {
            //     // `updateQueryData` requires the endpoint name and cache key arguments,
            //     // so it knows which piece of cache state to update
            //     const patchResult = dispatch(
            //         customRankingsApiSlice.util.updateQueryData('getCustomRankingById', undefined, draft => {
            //             // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
            //             const ranking = draft.entities[body._id]
            //             if (ranking) ranking.title = body.title
            //         })
            //     )
            //     try {
            //         await queryFulfilled
            //     } catch {
            //         patchResult.undo()
            //     }
            // }
            // async onQueryStarted({ body }, { dispatch, queryFulfilled }) {
            //     const patchResult = dispatch(
            //       apiSlice.util.updateQueryData('getCustomRankingById', body._id, (draft) => {
            //         Object.assign(draft, body)
            //       })
            //     )
            //     try {
            //       await queryFulfilled
            //     } catch {
            //       patchResult.undo()
        
            //       /**
            //        * Alternatively, on failure you can invalidate the corresponding cache tags
            //        * to trigger a re-fetch:
            //        * dispatch(api.util.invalidateTags(['Post']))
            //        */
            //     }
            //   },
            // pessimistic update
            // async onQueryStarted({ body }, { dispatch, queryFulfilled }) {
            //     try {
            //       const { data: updatedRanking } = await queryFulfilled
            //       const patchResult = dispatch(
            //         apiSlice.util.updateQueryData('getCustomRankingById', body._id, (draft) => {
            //           Object.assign(draft, updatedRanking)
            //         })
            //       )
            //     } catch {}
            //   },
        })
    })
})

export const {
    useGetUserCustomRankingsQuery,
    useCreateNewCustomRankingsMutation,
    useDeleteCustomRankingMutation,
    useGetCustomRankingByIdQuery,
    useUpdateCustomRankingMutation
} = customRankingsApiSlice
