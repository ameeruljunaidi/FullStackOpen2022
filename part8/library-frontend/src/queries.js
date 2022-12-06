import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
    query AllAuthors {
        allAuthors {
            born
            name
            bookCount
        }
    }
`;

export const ALL_BOOKS = gql`
    query {
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

export const GET_ME = gql`
    query {
        me {
            id
            username
            genres
        }
    }
`;
