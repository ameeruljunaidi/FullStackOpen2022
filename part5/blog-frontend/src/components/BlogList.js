import Blog from "./Blog";
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { getBlogs } from "../reducers/blogReducer";
import { getWindowUser } from "../utils/utils";

export function BlogList() {
    const userLoggedIn = getWindowUser();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);

    const blogs = useSelector((state) => state.blogs);
    const blogFormRef = useRef();

    return (
        <>
            {blogs && userLoggedIn ? <h2>blogs</h2> : <div>log in to view blogs</div>}
            {userLoggedIn ? (
                <>
                    <Togglable buttonId="new-blog-button" buttonLabel="new blog" ref={blogFormRef}>
                        <NewBlogForm blogFormRef={blogFormRef} />
                    </Togglable>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </>
            ) : (
                <></>
            )}
        </>
    );
}
