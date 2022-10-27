import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [blogs, setBlogs] = useState([])
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [successState, setSuccessState] = useState(false)

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

    const showNotification = message => {
        setNotificationMessage(message)
        setSuccessState(true)

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

            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

            if (user) {
                showNotification('Successfully logged in')
            }

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            showNotification('Wrong credentials')
        }
    }

    const handleLogOut = event => {
        event.preventDefault()

        setUser(null)
        window.localStorage.removeItem('loggedBlogAppUser')
        showNotification('User logged out')
    }

    const userStatus = () => (
        <div class='inline'>
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
            <h2>blogs</h2>
            {user !== null ? userStatus() : <></>}
            {blogs.map(blog => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default App
