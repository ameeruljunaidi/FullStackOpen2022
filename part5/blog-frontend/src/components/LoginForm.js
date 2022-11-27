import { useState } from "react";
import { getWindowUser } from "../utils/utils";
import { useDispatch } from "react-redux";
import { logIn } from "../reducers/userReducer";

const LoginForm = () => {
    const userLoggedIn = getWindowUser();

    if (userLoggedIn) return;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleLogin = async (event) => {
        event.preventDefault();

        dispatch(
            logIn({
                username: username,
                password: password,
            })
        );
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
