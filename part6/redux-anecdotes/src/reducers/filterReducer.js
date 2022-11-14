import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const updateFilterAction = (_, action) => action.payload

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        updateFilter: updateFilterAction
    }
})

export const { updateFilter } = filterSlice.actions
export default filterSlice.reducer