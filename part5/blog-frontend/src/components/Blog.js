import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, showNotification }) => {
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

    return (
        <>
            <div className="inline">
                {blog.title} {blog.author}
                <button onClick={event => handleDeleteBlog(event, blog.id)}>delete</button>
            </div>
            <br></br>
        </>
    )
}

export default Blog
