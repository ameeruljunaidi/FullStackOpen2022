const typeDefs = `#graphql
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type User {
        username: String!
        genres: [String]
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: [String]): [Book!]!
        allGenres: [String]!
        allAuthors: [Author]!
        me: User
    }

    type Mutation {
        addBook(title: String!, published: Int!, author: String!, genres: [String!]!): Book
        editAuthor(name: String!, setBornTo: Int!): Author
        createUser(username: String!): User
        login(username: String!, password: String!): Token
    }

    type Subscription {
        bookAdded: Book!
    }
`;

module.exports = typeDefs;
