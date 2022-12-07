import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { CREATE_BOOK } from "../mutations";
import { GET_BOOK_BY_GENRE, GET_GENRES } from "../queries";
import { updateBookCache, updateGenreCache } from "../utilities";

const NewBook = props => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [published, setPublished] = useState("");
    const [genre, setGenre] = useState("");
    const [genres, setGenres] = useState([]);
    const [genresInDb, setGenreInDb] = useState([]);

    const getGenres = useQuery(GET_GENRES);

    useEffect(() => {
        if (getGenres.data) {
            setGenreInDb(getGenres.data.allGenres);
        }
    }, [getGenres.data]);

    const updateCache = (cache, response) => {
        genres.forEach(current => {
            const genreQuery = { query: GET_BOOK_BY_GENRE, variables: { genre: [current] } };
            const addedBook = response.data.addBook;

            if (genresInDb.includes(current) && cache.readQuery(genreQuery)) {
                updateBookCache(cache, genreQuery, addedBook);
                console.info("Updated book cache in NewBook.js");
            } else {
                updateGenreCache(cache, { query: GET_GENRES }, current);
            }
        });
    };

    const [createBook, { loading, error }] = useMutation(CREATE_BOOK, {
        onError: error => console.error(error),
        update: updateCache,
    });

    if (!props.show) return null;
    if (loading || getGenres.loading) return <div>Adding book...</div>;
    if (error) return <div>Error! {error.message}</div>;
    if (getGenres.error) return <div>Error! {getGenres.error.message}</div>;

    const submit = async event => {
        event.preventDefault();

        createBook({ variables: { title, author, genres, published: parseInt(published) } });

        setTitle("");
        setPublished("");
        setAuthor("");
        setGenres([]);
        setGenre("");
    };

    const addGenre = () => {
        setGenres(genres => genres.concat(genre));
        setGenre("");
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input value={title} onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    author
                    <input value={author} onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    published
                    <input type="number" value={published} onChange={({ target }) => setPublished(target.value)} />
                </div>
                <div>
                    <input value={genre} onChange={({ target }) => setGenre(target.value)} />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(" ")}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    );
};

export default NewBook;
