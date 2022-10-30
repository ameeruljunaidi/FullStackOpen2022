import { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ setBlogs, showNotification, blogFormRef }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleNewBlog = async event => {
        event.preventDefault()

        try {
            const newBlogAdded = await blogService.create({
                title: title, author: author, url: url,
            })

            if (newBlogAdded) {
                setTitle('')
                setAuthor('')
                setUrl('')

                blogFormRef.current.toggleVisibility()

                const blogs = await blogService.getAll()
                setBlogs(blogs)

                showNotification(`Successfully added ${title} by ${author}`, true)
            }
        } catch (exception) {
            showNotification('Not authenticated', false)
        }
    }

    return (<>
        <h2>create new</h2>
        <form onSubmit={handleNewBlog}>
            <div>
                title:
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author:
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url:
                <input
                    type="text"
                    value={url}
                    name="URL"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
    </>)
}

export default NewBlogForm
