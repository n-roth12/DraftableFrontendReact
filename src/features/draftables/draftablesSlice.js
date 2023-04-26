import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const draftablesAdapter = createEntityAdapter()

const initialState = draftablesAdapter.getInitialState()

export const draftablesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDraftables: builder.query({
            transformResponse: responseData => {
                return draftablesAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => [
                { type: 'Draftable', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Drafatble', id }))
            ]
        })
    })
})

export const {
    useGetDraftablesQuery
} = draftablesApiSlice

export const selectDraftablesResult = draftablesApiSlice.endpoints.getDraftables.select()

const selectDraftablesData = createSelector(
    selectDraftablesResult,
    draftablesResult => draftablesResult.data
)

export const {
    selectAll: selectAllDraftables,
    selectById: selectDraftableById,
    selectIds: selectDraftableIds
} = draftablesAdapter.getSelectors(state => selectDraftablesData(state) ?? initialState)
