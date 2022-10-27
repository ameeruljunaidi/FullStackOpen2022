import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

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

    const handleLogin = async event => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })

            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

            if (user) {
                setNotificationMessage('Successfully logged in')
                setSuccessState(true)

                setTimeout(() => {
                    setNotificationMessage(null)
                }, 5000)
            }

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setNotificationMessage('Wrong credentials')
            setSuccessState(false)

            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000)
        }
    }

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
            {user !== null ? <div>{user.name} logged in</div> : <></>}
            {blogs.map(blog => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default App
