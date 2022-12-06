import { useQuery } from "@apollo/client";
import { GET_ME, ALL_BOOKS } from "../queries";

const Recommend = ({ show }) => {
    const getMe = useQuery(GET_ME, { fetchPolicy: "network-only" });
    const getBooks = useQuery(ALL_BOOKS);

    if (!show) return null;
    if (getMe.loading || getBooks.loading) return <div>Loading recommended...</div>;
    if (getMe.error) return <div>Error! {getMe.error.message}</div>;
    if (getBooks.error) return <div>Error! {getBooks.error.message}</div>;

    const genres = getMe.data.me.genres;
    const books = getBooks.data.allBooks;

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
