import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [blogs, setBlogs] = useState([])
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [successState, setSuccessState] = useState(false)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs))
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

    const handleLogin = async event => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })

            blogService.setToken(user.token)
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

            if (user) {
                showNotification('Successfully logged in', true)
            }

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            showNotification('Wrong credentials', false)
        }
    }

    const handleNewBlog = async event => {
        event.preventDefault()

        try {
            const newBlogAdded = await blogService.create({
                title: title,
                author: author,
                url: url,
            })

            if (newBlogAdded) {
                showNotification(`Successfully added ${title} by ${author}`, true)
            }
        } catch (exception) {
            showNotification('Not authenticated', false)
        }
    }

    const handleLogOut = event => {
        event.preventDefault()

        setUser(null)
        window.localStorage.removeItem('loggedBlogAppUser')
        showNotification('User logged out', true)
    }

    const userStatus = () => (
        <div className='inline'>
            {user.name} logged in
            <button onClick={handleLogOut}>log out</button>
        </div>
    )

    return (
        <div>
            <Notification message={notificationMessage} success={successState} />
            <LoginForm
                handleLogin={handleLogin}
                username={username}
                setUsername={({ target }) => setUsername(target.value)}
                password={password}
                setPassword={({ target }) => setPassword(target.value)}
                userLoggedIn={user}
            />
            <NewBlogForm
                title={title}
                setTitle={({ target }) => setTitle(target.value)}
                author={author}
                setAuthor={({ target }) => setAuthor(target.value)}
                url={url}
                setUrl={({ target }) => setUrl(target.value)}
                handleNewBlog={handleNewBlog}
            />
            <h2>blogs</h2>
            {user !== null ? userStatus() : <></>}
            {blogs.map(blog => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default App
