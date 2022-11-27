import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../reducers/usersReducer";

const Users = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const users = useSelector((state) => state.users);

    if (!users) return;

    return (
        <>
            <h2>users</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Users;
