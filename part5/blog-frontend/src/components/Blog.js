import blogService from '../services/blogs'
import userService from '../services/user'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, setBlogs, showNotification, user, handleAddLikes }) => {
    const [showDetail, setShowDetail] = useState(false)
    const [username, setUsername] = useState(null)

    const handleDeleteBlog = async (event, blog) => {
        event.preventDefault()

        try {
            if (!window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
                return
            }
            await blogService.remove(blog.id)
            const blogs = await blogService.getAll()

            setBlogs(blogs)
            showNotification('Deletion successful', true)
        } catch (error) {
            switch (error.response.status) {
            case 404:
                showNotification('Can\'t find blog', false)
                break
            case 400:
                showNotification('Unathorized user', false)
            }
        }
    }

    const handleToggleDetail = () => setShowDetail(prevState => !prevState)

    const blogStyle = {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    useEffect(() => {
    // I know this is a very bad way to use useEffect, but we will live with it for now

        (async () => {
            const userResponse = await userService.getUser(blog.user.id)
            setUsername(userResponse.username)
        })()
    }, [])

    const basicView = () => (
        <div className='blog'>
            <div className="inline">
                {blog.title} {blog.author}
                <button onClick={handleToggleDetail}>view</button>
            </div>
            <br></br>
        </div>
    )

    const detailedView = () => (
        <div style={blogStyle} className='blog'>
            <div className="inline">
                {blog.title}
                <button onClick={handleToggleDetail}>hide</button>
            </div>
            <div>
                {blog.url}
            </div>
            <div className="inline">
                {blog.likes} likes
                <button onClick={event => handleAddLikes(event, blog)}>like</button>
            </div>
            <div>
                {blog.author}
            </div>
            <div>
                {(user && (username === user.username))
                    ? <button onClick={event => handleDeleteBlog(event, blog)}>delete blog</button>
                    : <></>}
            </div>
        </div>
    )

    return showDetail ? detailedView() : basicView()
}

Blog.propTypes = {
    blog: PropTypes.shape(blogService.shape).isRequired,
    setBlogs: PropTypes.func,
    showNotification: PropTypes.func,
    user: PropTypes.shape({
        token: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired
}

export default Blog
