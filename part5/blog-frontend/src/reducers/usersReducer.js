import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        setUsers: (state, action) => action.payload,
    },
});

export const { setUsers } = usersSlice.actions;

export const getAllUsers = () => {
    return async (dispatch) => {
        const returnedUsers = await userService.getAllUsers();
        dispatch(setUsers(returnedUsers));
    };
};

export default usersSlice.reducer;
