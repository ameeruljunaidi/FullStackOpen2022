import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ME, ALL_BOOKS, GET_BOOK_BY_GENRE } from "../queries";

const Recommend = ({ show }) => {
    const [genres, setGenres] = useState(null);
    const getMe = useQuery(GET_ME, { fetchPolicy: "network-only" });
    const getBooksByGenre = useQuery(GET_BOOK_BY_GENRE, { variables: { genre: genres } });

    useEffect(() => {
        if (getMe.data) {
            setGenres(getMe.data.me.genres);
        }
    }, [getMe.data]);

    if (!show) return null;
    if (getMe.loading || getBooksByGenre.loading) return <div>Loading recommended...</div>;
    if (getMe.error) return <div>Error! {getMe.error.message}</div>;
    if (getBooksByGenre.error) return <div>Error! {getBooksByGenre.error.message}</div>;

    const books = getBooksByGenre.data.allBooks;

    return (
        <div>
            <div>books by your favorite genre {genres.map(genre => `${genre} `)}</div>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books
                        .filter(book => book.genres.filter(genre => genres.includes(genre)).length)
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

export default Recommend;
