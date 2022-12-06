import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
    query getAllAuthors {
        allAuthors {
            born
            name
            bookCount
        }
    }
`;

export const ALL_BOOKS = gql`
    query getAllBooks {
        allBooks {
            author {
                name
            }
            published
            title
            genres
        }
    }
`;

export const GET_BOOK_BY_GENRE = gql`
    query getBookByGenre($genre: [String]) {
        allBooks(genre: $genre) {
            genres
            author {
                name
            }
            published
            title
        }
    }
`;

export const GET_GENRES = gql`
    query getGenres {
        allGenres
    }
`;

export const GET_ME = gql`
    query getMe {
        me {
            id
            username
            genres
        }
    }
`;
