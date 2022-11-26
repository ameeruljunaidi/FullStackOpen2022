import { useState } from "react";
import loginService from "../services/login";

const LoginForm = ({ userLoggedIn, showNotification, setUser }) => {
    if (userLoggedIn) return;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username,
                password,
            });

            setUsername("");
            setPassword("");

            window.localStorage.setItem(
                "loggedBlogAppUser",
                JSON.stringify(user)
            );

            setUser(user);

            if (user) {
                showNotification("Successfully logged in", true);
            }
        } catch (exception) {
            showNotification("Wrong credentials", false);
        }
    };

    if (userLoggedIn === null) {
        return (
            <>
                <h2>log in to application</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                            id="username-input"
                        />
                    </div>
                    <div>
                        password
                        <input
                            type="text"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                            id="password-input"
                        />
                    </div>
                    <button id="login-button" type="submit">
                        login
                    </button>
                </form>
            </>
        );
    }
};

export default LoginForm;
