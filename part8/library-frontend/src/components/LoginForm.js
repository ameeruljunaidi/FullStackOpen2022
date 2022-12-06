import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../mutations";

const LoginForm = ({ show, setError, setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [login, result] = useMutation(LOGIN, {
        onError: error => {
            setError(error.graphQLErrors[0].message);
        },
        onCompleted: data => {
            const token = data.login.value;
            setToken(token);
            localStorage.setItem("booksapp-user-token", token);
        },
    });

    const submit = async event => {
        event.preventDefault();

        login({ variables: { username, password } });

        setUsername("");
        setPassword("");
    };

    if (!show) return null;

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username <input value={username} onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    password{" "}
                    <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

export default LoginForm;
