import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_BOOK_BY_GENRE, GET_GENRES } from "../queries";

const Books = props => {
    const [chosenGenre, setGenre] = useState(null);
    const getBooksByGenre = useQuery(GET_BOOK_BY_GENRE, { variables: { genre: [chosenGenre] } });
    const getGenres = useQuery(GET_GENRES);

    if (!props.show) return null;
    if (getBooksByGenre.loading || getGenres.loading) return <div>Loading books...</div>;
    if (getBooksByGenre.error) return <div>Error! {getBooksByGenre.error.message}</div>;
    if (getGenres.error) return <div>Error! {getGenres.error.message}</div>;

    const books = getBooksByGenre.data.allBooks;
    const genres = getGenres.data.allGenres;

    const updateGenre = (event, toSetGenre) => {
        event.preventDefault();
        setGenre(toSetGenre);
    };

    return (
        <div>
            <h2>books</h2>
            <div>in genre {!chosenGenre ? "all" : chosenGenre}</div>
            {genres.map(genre => (
                <button key={genre} onClick={event => updateGenre(event, genre)}>
                    {genre}
                </button>
            ))}
            <button onClick={event => updateGenre(event, null)}>reset genre</button>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map(a => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Books;
