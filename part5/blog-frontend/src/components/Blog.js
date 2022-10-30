import blogService from '../services/blogs'
import { useState } from 'react'

const Blog = ({ blog, setBlogs, showNotification }) => {
    const [showDetail, setShowDetail] = useState(false)

    const handleDeleteBlog = async (event, id) => {
        event.preventDefault()

        try {
            await blogService.remove(id)
            const blogs = await blogService.getAll()
            setBlogs(blogs)
            showNotification('Deletion successful', true)
        } catch (error) {
            showNotification('Deletion failed', false)
        }
    }

    const handleToggleDetail = () => setShowDetail(prevState => !prevState)

    const handleAddLikes = async (event, id) => {
        event.preventDefault()

        try {
            const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
            await blogService.update(id, newBlog)
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        } catch (error) {
            showNotification('Liking failed', false)
        }
    }

    const blogStyle = {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const basicView = () => (
        <div>
            <div className="inline">
                {blog.title} {blog.author}
                <button onClick={handleToggleDetail}>view</button>
            </div>
            <br></br>
        </div>
    )

    const detailedView = () => (
        <div style={blogStyle}>
            <div className="inline">
                {blog.title}
                <button onClick={handleToggleDetail}>hide</button>
            </div>
            <div>
                {blog.url}
            </div>
            <div className="inline">
                {blog.likes} likes
                <button onClick={event => handleAddLikes(event, blog.id)}>like</button>
            </div>
            <div>
                {blog.author}
            </div>
            <div>
                <button onClick={event => handleDeleteBlog(event, blog.id)}>delete blog</button>
            </div>
        </div>
    )

    return showDetail ? detailedView() : basicView()
}

export default Blog
