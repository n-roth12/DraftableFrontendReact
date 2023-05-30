import { createSlice } from "@reduxjs/toolkit"

const alertsSlice = createSlice({
    name: 'alerts',
    initialState: { info: [] },
    reducers: {
        addInfo: (state, action) => {
            const { info } = action.payload
            state.info.push(info)
        },
        closeInfo: (state, action) => {
            const { value } = action.value
            state.info = state.info.filter(x => x.value !== value)
        }
    }
})

export const { addInfo, closeInfo } = alertsSlice.actions

export default alertsSlice.reducer

export const selectCurrentInfo = (state) => state.info