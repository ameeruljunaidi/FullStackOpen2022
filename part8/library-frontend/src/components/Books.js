import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = props => {
    const { loading, error, data } = useQuery(ALL_BOOKS);
    const [chosenGenre, setGenre] = useState(null);

    if (!props.show) return null;
    if (loading) return <div>Loading books...</div>;
    if (error) return <div>Error! {error.message}</div>;

    const books = data.allBooks;
    const genres = [...new Set(books.map(book => book.genres).flat())];

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
                    {books
                        .filter(book => (!chosenGenre ? true : book.genres.includes(chosenGenre)))
                        .map(a => (
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
