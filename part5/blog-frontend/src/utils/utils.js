export const sortBlogsByLikes = (state) => state.sort((a, b) => b.likes - a.likes);

export const getWindowUser = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    return loggedUserJSON ? JSON.parse(loggedUserJSON) : null;
};
