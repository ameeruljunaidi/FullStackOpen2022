const NewBlogForm = (
    {
        title,
        setTitle,
        author,
        setAuthor,
        url,
        setUrl,
        handleNewBlog,
        showBlogForm,
        updateShowBlogForm
    }) => {
    if (showBlogForm) {
        return (
            <>
                <h2>create new</h2>
                <form onSubmit={handleNewBlog}>
                    <div>
                        title:
                        <input type="text" value={title} name="Title" onChange={setTitle} />
                    </div>
                    <div>
                        author
                        <input type="text" value={author} name="Author" onChange={setAuthor} />
                    </div>
                    <div>
                        url
                        <input type="text" value={url} name="URL" onChange={setUrl} />
                    </div>
                    <button type="submit">create</button>
                    <br></br>
                    <button type="cancel" onClick={updateShowBlogForm}>cancel</button>
                </form>
                <br></br>
            </>
        )
    } else {
        return (<>
            <button onClick={updateShowBlogForm}>new blog</button>
            <br></br>
        </>)
    }
}

export default NewBlogForm
