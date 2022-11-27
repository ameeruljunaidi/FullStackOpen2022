import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logIn } from "../reducers/userReducer";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const userLoggedIn = useSelector((state) => state.user);

    if (userLoggedIn) return;

    const handleLogin = async (event) => {
        event.preventDefault();

        dispatch(
            logIn({
                username: username,
                password: password,
            })
        );
    };

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
};

export default LoginForm;
