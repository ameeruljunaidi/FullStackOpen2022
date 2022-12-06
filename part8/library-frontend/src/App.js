import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { useApolloClient } from "@apollo/client";

const App = () => {
    const [page, setPage] = useState("authors");
    const [errorMessage, setErrorMessage] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("booksapp-user-token"));
    const client = useApolloClient();

    const notify = message => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage(null);
        }, 10000);
    };

    const logout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
        setPage("books");
    };

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>authors</button>
                <button onClick={() => setPage("books")}>books</button>
                {!token ? (
                    <button onClick={() => setPage("loginform")}>login</button>
                ) : (
                    <>
                        <button onClick={() => setPage("add")}>add book</button>
                        <button onClick={() => setPage("recommended")}>recommended</button>
                        <button onClick={logout}>logout</button>
                    </>
                )}
            </div>

            <Notify errorMessage={errorMessage} />
            <Authors show={page === "authors"} />
            <Books show={page === "books"} />
            <NewBook show={page === "add"} setError={notify} />
            <LoginForm show={page === "loginform"} setError={notify} setToken={setToken} />
            {token ? <Recommend show={page === "recommended"} /> : null}
        </div>
    );
};

export default App;
