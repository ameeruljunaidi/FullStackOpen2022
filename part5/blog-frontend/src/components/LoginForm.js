import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logIn } from "../reducers/userReducer";
import { useField } from "../hooks";
import { Button, Input } from "./styles/GeneralStyles.styled";

const LoginForm = () => {
    const usernameField = useField("text");
    const passwordField = useField("text");

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
                username: usernameField.value,
                password: passwordField.value,
            })
        );
    };

    return (
        <>
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <Input {...usernameField.inputProp} name="Username" id="username-input" />
                </div>
                <div>
                    password
                    <Input {...passwordField.inputProp} name="Password" id="password-input" />
                </div>
                <Button id="login-button" type="submit">
                    login
                </Button>
            </form>
        </>
    );
};

export default LoginForm;
