import { createSlice } from '@reduxjs/toolkit'

const initialState = 'welcome to the anecdotes'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {}
})

export default notificationSlice.reducer