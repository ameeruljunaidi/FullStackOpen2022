import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import "./index.css";
import NewBlogForm from "./components/NewBlogForm";
import Togglable from "./components/Togglable";

const App = () => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [successState, setSuccessState] = useState(false);

    useEffect(() => {
        (async () => {
            const blogs = await blogService.getAll();
            const sortedBLogs = blogs.sort((a, b) => b.likes - a.likes);
            setBlogs(sortedBLogs);
        })();
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
        }
    }, []);

    const showNotification = (message, success) => {
        setNotificationMessage(message);
        setSuccessState(success);

        setTimeout(() => {
            setNotificationMessage(null);
        }, 5000);
    };

    const handleLogOut = (event) => {
        event.preventDefault();

        setUser(null);
        window.localStorage.removeItem("loggedBlogAppUser");
        showNotification("User logged out", true);
    };

    const showLogin = () => (
        <>
            <div className="inline">
                {user.name} logged in
                <button onClick={handleLogOut}>log out</button>
            </div>
            <br />
            <br />
        </>
    );

    const blogFormRef = useRef();

    const handleAddLikes = async (event, blog) => {
        event.preventDefault();

        try {
            const newBlog = {
                ...blog,
                likes: blog.likes + 1,
                user: blog.user.id,
            };
            await blogService.update(blog.id, newBlog);
            const blogs = await blogService.getAll();
            const sortedBLogs = blogs.sort((a, b) => b.likes - a.likes);
            setBlogs(sortedBLogs);
        } catch (error) {
            showNotification("Liking failed", false);
        }
    };

    const handleNewBlog = async (
        event,
        blogFormRef,
        title,
        author,
        url,
        setTitle,
        setAuthor,
        setUrl
    ) => {
        event.preventDefault();

        try {
            const newBlogAdded = await blogService.create({
                title: title,
                author: author,
                url: url,
            });

            if (newBlogAdded) {
                setTitle("");
                setAuthor("");
                setUrl("");

                blogFormRef.current.toggleVisibility();

                const blogs = await blogService.getAll();
                setBlogs(blogs);

                showNotification(
                    `Successfully added ${title} by ${author}`,
                    true
                );
            }
        } catch (exception) {
            showNotification("Not authenticated", false);
        }
    };

    return (
        <div>
            <LoginForm
                userLoggedIn={user}
                setUser={setUser}
                showNotification={showNotification}
            />
            {blogs && user ? <h2>blogs</h2> : <div>log in to view blogs</div>}
            {user ? showLogin() : <></>}
            {user ? (
                <Togglable
                    buttonId="new-blog-button"
                    buttonLabel="new blog"
                    ref={blogFormRef}
                >
                    <NewBlogForm
                        blogFormRef={blogFormRef}
                        handleNewBlog={handleNewBlog}
                    />
                </Togglable>
            ) : (
                <></>
            )}
            {user ? (
                blogs.map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        setBlogs={setBlogs}
                        showNotification={showNotification}
                        user={user}
                        handleAddLikes={handleAddLikes}
                    />
                ))
            ) : (
                <></>
            )}
            <Notification
                message={notificationMessage}
                success={successState}
            />
        </div>
    );
};

export default App;
