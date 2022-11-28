import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogs } from "../reducers/blogReducer";
import { updateBlog } from "../reducers/blogReducer";
import { useField } from "../hooks";
import { Button, InlineDiv, Input } from "./styles/GeneralStyles.styled";

const BlogView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const commentField = useField("text");

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

    const handleAddComment = async (event, blog) => {
        event.preventDefault();

        const newComment = { body: commentField.value };
        const updatedComments = !blog.comments ? [newComment] : blog.comments.concat(newComment);

        const updatedBlog = {
            ...blog,
            comments: updatedComments,
        };

        dispatch(updateBlog(updatedBlog));

        commentField.reset();
    };

    if (!blog) return null;

    return (
        <div>
            <h2>{blog.title}</h2>
            <div>{blog.url}</div>
            <InlineDiv>
                {blog.likes} likes
                <Button id="like-button" onClick={(event) => handleAddLikes(event, blog)}>
                    like
                </Button>
            </InlineDiv>
            <div>added by {blog.user.name}</div>

            <h2>comments</h2>
            <form onSubmit={(event) => handleAddComment(event, blog)}>
                <div>
                    <Input {...commentField.inputProp} name="Comment" id="comment-input" />
                    <Button id="add-comment-button" type="submit">
                        add comment
                    </Button>
                </div>
            </form>
            {blog.comments ? (
                blog.comments.map((comment) => {
                    return <li key={comment.id}>{comment.body}</li>;
                })
            ) : (
                <></>
            )}

            <Button id="back-to-blogs" onClick={() => navigate("/")}>
                back
            </Button>
        </div>
    );
};

export default BlogView;
