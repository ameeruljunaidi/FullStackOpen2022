import blogService from "../services/blogs";
import userService from "../services/user";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteBlog, updateBlog } from "../reducers/blogReducer";
import { getWindowUser } from "../utils/utils";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [blogUsername, setBlogUsername] = useState(null);
    const activeUser = getWindowUser();
    const dispatch = useDispatch();

    const handleDeleteBlog = async (event, blog) => {
        event.preventDefault();

        if (!window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
            return;
        }

        dispatch(deleteBlog(blog.id));
        dispatch(setNotification({ message: "Deletion successful", success: true }));
    };

    const handleAddLikes = async (event, blog) => {
        event.preventDefault();

        dispatch(
            updateBlog({
                ...blog,
                likes: blog.likes + 1,
            })
        );
    };

    const handleToggleDetail = () => setShowDetail((prevState) => !prevState);

    const blogStyle = {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    useEffect(() => {
        (async () => {
            const userResponse = await userService.getUser(blog.user.id);
            setBlogUsername(userResponse.username);
        })();
    }, []);

    const basicView = () => (
        <div className="blog">
            <div className="inline">
                {blog.title} {blog.author}
                <button id="view-toggle-button" onClick={handleToggleDetail}>
                    view
                </button>
            </div>
            <br></br>
        </div>
    );

    const detailedView = () => (
        <div style={blogStyle} className="blog">
            <div className="inline">
                {blog.title}
                <button onClick={handleToggleDetail}>hide</button>
            </div>
            <div>{blog.url}</div>
            <div className="inline">
                {blog.likes} likes
                <button id="like-button" onClick={(event) => handleAddLikes(event, blog)}>
                    like
                </button>
            </div>
            <div>{blog.author}</div>
            <div>
                {activeUser && blogUsername === activeUser.username ? (
                    <button onClick={(event) => handleDeleteBlog(event, blog)}>delete blog</button>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );

    return showDetail ? detailedView() : basicView();
};

Blog.propTypes = {
    blog: PropTypes.shape(blogService.shape).isRequired,
    showNotification: PropTypes.func,
};

export default Blog;
