import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";
import { getWindowUser } from "../utils/utils";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser: (state, action) => action.payload,
    },
});

export const { setUser } = userSlice.actions;

export const logIn = (user) => {
    return async (dispatch) => {
        try {
            const returnedUser = await loginService.login({
                username: user.username,
                password: user.password,
            });

            if (returnedUser) {
                window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(returnedUser));
                dispatch(setUser(returnedUser));
                dispatch(setNotification({ message: "Successfully logged in", success: true }));
            }
        } catch (exception) {
            dispatch(setNotification({ message: "Wrong credentials", success: false }));
        }
    };
};

export const getUser = () => {
    return (dispatch) => {
        dispatch(setUser(getWindowUser()));
    };
};

export default userSlice.reducer;
