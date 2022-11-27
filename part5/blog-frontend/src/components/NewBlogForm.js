import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const NewBlogForm = ({ blogFormRef }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const dispatch = useDispatch();

    const addNewBlog = async (event) => {
        event.preventDefault();

        dispatch(
            addBlog({
                title: title,
                author: author,
                url: url,
            })
        );

        setTitle("");
        setAuthor("");
        setUrl("");

        blogFormRef.current.toggleVisibility();
        dispatch(setNotification({ message: `Successfully added ${title} by ${author}`, success: true }));
    };

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addNewBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                        id="title-input"
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                        id="author-input"
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="URL"
                        onChange={({ target }) => setUrl(target.value)}
                        id="url-input"
                    />
                </div>
                <button id="create-blog-button" type="submit">
                    create
                </button>
            </form>
        </>
    );
};

export default NewBlogForm;
