import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../reducers/usersReducer";

const User = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const users = useSelector((state) => state.users);
    const id = useParams().id;
    const user = users.find((user) => user.id === id);

    if (!user) return null;

    return (
        <>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            {user.blogs.map((blog) => (
                <li key={blog.id}>{blog.title}</li>
            ))}
        </>
    );
};

export default User;
