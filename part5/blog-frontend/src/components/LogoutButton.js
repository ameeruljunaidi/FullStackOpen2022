import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { getUser, setUser } from "../reducers/userReducer";
import { useEffect } from "react";

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
            <div className="inline">
                {userLoggedIn.name} logged in
                <button onClick={handleLogOut}>log out</button>
            </div>
            <br />
            <br />
        </>
    );
};

export default LogoutButton;
