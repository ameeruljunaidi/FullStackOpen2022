import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const setNotificationAction = (_, action) => action.payload

const removeNotificationAction = () => ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: setNotificationAction,
        removeNotification: removeNotificationAction
    }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer