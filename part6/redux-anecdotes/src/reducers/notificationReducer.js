import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: '',
    id: null
}

const updateNotificationAction = (state, action) => {
    return {
        message: action.payload.message,
        id: action.payload.id
    }
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        updateNotification: updateNotificationAction,
    }
})

export const { updateNotification } = notificationSlice.actions

export const setNotification = (payload, time = 5000) => {
    return async dispatch => {
        if (payload.id !== null) clearTimeout(payload.id)

        const timeoutId = setTimeout(() => {
            dispatch(updateNotification({ message: '', id: null }))
        }, time)

        dispatch(updateNotification({ ...payload, id: timeoutId }))
    }
}

export default notificationSlice.reducer