import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
    mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(title: $title, published: $published, author: $author, genres: $genres) {
            author
            genres
            id
            published
            title
        }
    }
`

export const EDIT_BORN = gql`
    mutation EditAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            bookCount
            born
            name
            id
        }
    }
`
