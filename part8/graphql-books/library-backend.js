require("dotenv").config();
const { v1: uuid } = require("uuid");
const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
const { authors, books } = require("./data");

const MONGODB_URI = process.env.MONGODB_URI;

(async () => {
    try {
        console.log("Connecting to ", MONGODB_URI);
        await mongoose.connect(MONGODB_URI);

        await Author.deleteMany();
        await Book.deleteMany();

        await Promise.all(
            authors
                .map(author => ({ ...author }))
                .map(author => new Author(author))
                .map(author => author.save())
        );

        const authorsIdDb = await Author.find({});

        await Promise.all(
            books
                .map(book => {
                    const authorId = authorsIdDb.find(author => author.name === book.author).id;
                    return { ...book, author: authorId };
                })
                .map(book => new Book(book))
                .map(book => book.save())
        );

        console.log("Connected to MongoDB with test data.");
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error.message);
    }
})();

const typeDefs = gql`
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

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author]!
    }

    type Mutation {
        addBook(title: String!, published: Int!, author: String!, genres: [String!]!): Book
        editAuthor(name: String!, setBornTo: Int!): Author
    }
`;

const resolvers = {
    Query: {
        bookCount: async () => Book.count({}),
        authorCount: async () => Author.count({}),
        allBooks: async (_root, args) => {
            const authorFound = args.author ? await Author.find({ name: args.author }) : null;

            const searchParam = {
                ...(args.author ? { author: authorFound } : {}),
                ...(args.genre ? { genres: { $in: [args.genre] } } : {}),
            };

            return Book.find(searchParam);
        },
        allAuthors: async () => Author.find({}),
    },
    Author: {
        bookCount: async root => Book.count({ author: root.id }),
    },
    Book: {
        author: async root => Author.findById(root.author),
    },
    Mutation: {
        addBook: async (_root, args) => {
            let authorFound = await Author.findOne({ name: args.author });

            if (!authorFound) {
                const author = new Author({ name: args.author });
                authorFound = await author.save();
            }

            const book = new Book({ ...args, author: authorFound });
            const returnedBook = await book.save();
            return returnedBook;
        },
        editAuthor: async (_root, args) => {
            const authorFound = await Author.findOne({ name: args.name });
            if (!authorFound) return null;

            const updatedAuthor = { ...authorFound, born: args.setBornTo };
            const returnedBlog = await Author.findByIdAndUpdate(authorFound.id, updatedAuthor, { new: true });
            return returnedBlog;
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
