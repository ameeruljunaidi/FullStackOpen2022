import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import './index.css'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [successState, setSuccessState] = useState(false)

    useEffect(() => {
        (async () => {
            const blogs = await blogService.getAll()
            const sortedBLogs = blogs.sort((a, b) => b.likes - a.likes)
            setBlogs(sortedBLogs)
        })()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])

    const showNotification = (message, success) => {
        setNotificationMessage(message)
        setSuccessState(success)

        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
    }

    const handleLogOut = event => {
        event.preventDefault()

        setUser(null)
        window.localStorage.removeItem('loggedBlogAppUser')
        showNotification('User logged out', true)
    }

    const showLogin = () => (
        <>
            <div className="inline">
                {user.name} logged in
                <button onClick={handleLogOut}>log out</button>
            </div>
            <br /><br />
        </>
    )

    const blogFormRef = useRef()

    return (
        <div>
            <LoginForm
                userLoggedIn={user}
                setUser={setUser}
                showNotification={showNotification}
            />
            {(blogs && user) ? <h2>blogs</h2> : <div>log in to view blogs</div>}
            {user ? showLogin() : <></>}
            {user
                ? <Togglable buttonLabel="new blog" ref={blogFormRef}>
                    <NewBlogForm
                        setBlogs={setBlogs}
                        showNotification={showNotification}
                        blogFormRef={blogFormRef}
                    />
                </Togglable>
                : <></>}
            {user
                ? blogs.map(blog => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        setBlogs={setBlogs}
                        showNotification={showNotification}
                        user={user}
                    />
                ))
                : <></>}
            <Notification message={notificationMessage} success={successState} />
        </div>
    )
}

export default App
