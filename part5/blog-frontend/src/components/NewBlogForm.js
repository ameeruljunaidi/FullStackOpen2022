import { useState } from "react";

const NewBlogForm = ({ blogFormRef, handleNewBlog }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    return (
        <>
            <h2>create new</h2>
            <form
                onSubmit={(event) =>
                    handleNewBlog(
                        event,
                        blogFormRef,
                        title,
                        author,
                        url,
                        setTitle,
                        setAuthor,
                        setUrl
                    )
                }
            >
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
