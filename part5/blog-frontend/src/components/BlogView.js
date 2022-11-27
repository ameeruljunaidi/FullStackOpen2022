import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogs } from "../reducers/blogReducer";
import { updateBlog } from "../reducers/blogReducer";

const BlogView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);

    const blogs = useSelector((state) => state.blogs);
    const id = useParams().id;
    const blog = blogs.find((blog) => blog.id === id);

    const handleAddLikes = async (event, blog) => {
        event.preventDefault();

        dispatch(
            updateBlog({
                ...blog,
                likes: blog.likes + 1,
            })
        );
    };

    if (!blog) return null;

    return (
        <div>
            <h2>{blog.title}</h2>
            <div>{blog.url}</div>
            <div className="inline">
                {blog.likes} likes
                <button id="like-button" onClick={(event) => handleAddLikes(event, blog)}>
                    like
                </button>
            </div>
            <div>added by {blog.user.name}</div>
            <button id="back-to-blogs" onClick={() => navigate("/")}>
                back
            </button>
        </div>
    );
};

export default BlogView;
