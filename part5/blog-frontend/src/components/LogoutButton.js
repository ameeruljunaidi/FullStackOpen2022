import { getWindowUser } from "../utils/utils";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";

export function LogoutButton() {
    const userLoggedIn = getWindowUser();
    const dispatch = useDispatch();

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
}
