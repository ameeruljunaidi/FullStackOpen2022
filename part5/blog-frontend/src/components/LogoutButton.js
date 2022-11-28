import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { getUser, setUser } from "../reducers/userReducer";
import { useEffect } from "react";
import { InlineDiv } from "./styles/GeneralStyles.styled";
import { Button } from "./styles/GeneralStyles.styled";

const LogoutButton = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const userLoggedIn = useSelector((state) => state.user);

    const handleLogOut = (event) => {
        event.preventDefault();

        window.localStorage.removeItem("loggedBlogAppUser");
        dispatch(setUser(null));
        dispatch(setNotification({ message: "User logged out", success: true }));
    };

    if (!userLoggedIn) return <></>;

    return (
        <>
            <InlineDiv>{userLoggedIn.name} logged in</InlineDiv>
            <Button onClick={handleLogOut}>log out</Button>
        </>
    );
};

export default LogoutButton;
