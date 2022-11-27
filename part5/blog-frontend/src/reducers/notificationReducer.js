import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        message: "",
        success: true,
        id: null,
    },
    reducers: {
        updateNotification: (_, action) => action.payload,
    },
});

export const { updateNotification } = notificationSlice.actions;

export const setNotification = (notification, time = 5000) => {
    return async (dispatch) => {
        if (notification.id) clearTimeout(notification.id);

        const timeoutId = setTimeout(() => {
            dispatch(updateNotification({ message: "", success: true, id: null }));
        }, time);

        dispatch(updateNotification({ ...notification, id: timeoutId }));
    };
};

export default notificationSlice.reducer;
