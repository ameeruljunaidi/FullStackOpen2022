import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { sortBlogsByLikes } from "../utils/utils";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs: (state, action) => action.payload,
        createBlog: (state, action) => {
            const blog = action.payload;
            state.push(blog);
        },
        removeBlog: (state, action) => {
            return state.filter((blog) => blog.id !== action.payload);
        },
        patchBlog: (state, action) => {
            return sortBlogsByLikes(state.map((blog) => (blog.id !== action.payload.id ? blog : action.payload)));
        },
    },
});

export const { setBlogs, createBlog, removeBlog, patchBlog } = blogSlice.actions;

export const getBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(sortBlogsByLikes(blogs)));
    };
};

export const addBlog = (blog) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.create(blog);
            dispatch(createBlog(newBlog));
        } catch (e) {
            dispatch(setNotification({ message: `Not authenticated: ${e}`, success: false }));
        }
    };
};

export const deleteBlog = (id) => {
    return async (dispatch) => {
        try {
            await blogService.remove(id);
            dispatch(removeBlog(id));
        } catch (error) {
            switch (error.response.status) {
                case 404:
                    dispatch(setNotification({ message: "Can't find blog", success: false }));
                    break;
                case 400:
                    dispatch(setNotification({ message: "Unauthorized user", success: false }));
                    break;
            }
        }
    };
};

export const updateBlog = (blog) => {
    return async (dispatch) => {
        try {
            const returnedBlog = await blogService.update(blog.id, blog);
            dispatch(patchBlog(returnedBlog));
        } catch (e) {
            dispatch(setNotification({ message: "Liking failed", success: false }));
        }
    };
};

export default blogSlice.reducer;
