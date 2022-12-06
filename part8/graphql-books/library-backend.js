require("dotenv").config();
const { ApolloServer, UserInputError, AuthenticationError, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const { authors, books } = require("./data");
const jwt = require("jsonwebtoken");

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

(async () => {
    try {
        console.log("Connecting to ", MONGODB_URI);
        await mongoose.connect(MONGODB_URI);

        const collections = await mongoose.connection.db.collections();
        await Promise.all(collections.map(collection => collection.deleteMany({})));

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

        const user = new User({ username: "AJ Junaidi", genres: ["refactoring", "agile"] });
        await user.save();

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
`;

const resolvers = {
    Query: {
        bookCount: async () => Book.count({}),
        authorCount: async () => Author.count({}),
        allBooks: async (_root, args) => {
            const authorFound = args.author ? await Author.find({ name: args.author }) : null;

            const searchParam = {
                ...(args.author ? { author: authorFound } : {}),
                ...(args.genre && args.genre[0] ? { genres: { $in: args.genre } } : {}),
            };

            return Book.find(searchParam);
        },
        allGenres: async () => {
            const books = await Book.find({});
            return [...new Set(books.map(book => book.genres).flat())];
        },
        allAuthors: async () => Author.find({}),
        me: (_root, _args, context) => {
            return context.currentUser;
        },
    },
    Author: {
        bookCount: async root => Book.count({ author: root.id }),
    },
    Book: {
        author: async root => Author.findById(root.author),
    },
    Mutation: {
        addBook: async (_root, args, { currentUser }) => {
            if (!currentUser) throw new AuthenticationError("Not authenticated");

            let authorFound = await Author.findOne({ name: args.author });

            if (!authorFound) {
                const author = new Author({ name: args.author });

                try {
                    authorFound = await author.save();
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args.author,
                    });
                }
            }

            const book = new Book({ ...args, author: authorFound });

            let returnedBook;
            try {
                returnedBook = await book.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: { args },
                });
            }
            return returnedBook;
        },
        editAuthor: async (_root, args, { currentUser }) => {
            if (!currentUser) throw new AuthenticationError("Not authenticated");

            const authorFound = await Author.findOne({ name: args.name }).lean();
            if (!authorFound) throw new UserInputError("Author does not exist");

            const updatedAuthor = { ...authorFound, born: args.setBornTo };
            const returnedBlog = await Author.findByIdAndUpdate(authorFound._id, updatedAuthor, { new: true });
            return returnedBlog;
        },
        createUser: async (_root, args) => {
            const user = new User({ username: args.username });

            return user.save().catch(error => {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            });
        },
        login: async (_root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== "secret") {
                throw new UserInputError("wrong credentials");
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, JWT_SECRET) };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;

        if (auth && auth.toLowerCase().startsWith("bearer ")) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser };
        }
    },
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
