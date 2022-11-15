import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const updateNotificationAction = (_, action) => action.payload

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        updateNotification: updateNotificationAction,
    }
})

export const { updateNotification } = notificationSlice.actions

export const setNotification = (message, time = 5000) => {
    return async dispatch => {
        dispatch(updateNotification(message))
        setTimeout(() => {
            dispatch(updateNotification(''))
        }, time)
    }
}

export default notificationSlice.reducer