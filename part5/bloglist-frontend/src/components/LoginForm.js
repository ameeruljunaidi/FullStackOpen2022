const LoginForm = ({ username, setUsername, password, setPassword, handleLogin, userLoggedIn }) => {
    if (userLoggedIn) return

    return (
        <>
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input type='text' value={username} name='Username' onChange={setUsername} />
                </div>
                <div>
                    password
                    <input type='text' value={password} name='Password' onChange={setPassword} />
                </div>
                <button type='submit'>login</button>
            </form>
        </>
    )
}

export default LoginForm
