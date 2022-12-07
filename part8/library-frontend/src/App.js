import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { useSubscription, useApolloClient } from "@apollo/client";
import { BOOK_ADDED } from "./subscriptions";
import { GET_BOOK_BY_GENRE, GET_GENRES } from "./queries";
import { updateBookCache, updateGenreCache } from "./utilities";

const App = () => {
    const [page, setPage] = useState("authors");
    const [errorMessage, setErrorMessage] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("booksapp-user-token"));
    const client = useApolloClient();

    useSubscription(BOOK_ADDED, {
        onData: ({ data, client }) => {
            const bookAdded = data.data.bookAdded;
            const genreQuery = { query: GET_BOOK_BY_GENRE, variables: { genre: [null] } };
            updateBookCache(client.cache, genreQuery, bookAdded);
            console.info("Updated book cache in App.js", bookAdded);
            bookAdded.genres.forEach(genre => {
                updateGenreCache(client.cache, { query: GET_GENRES }, genre);
            });
            window.alert(`New book added ${bookAdded.title}`);
        },
    });

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
