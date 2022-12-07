const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

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
    Book: {
        author: async root => Author.findById(root.author),
    },
    Mutation: {
        addBook: async (_root, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError("Not authenticated", {
                    extensions: { code: "UNAUTHENTICATED" },
                });
            }

            let authorFound = await Author.findOne({ name: args.author });

            if (!authorFound) {
                const author = new Author({ name: args.author, bookCount: 1 });

                try {
                    authorFound = await author.save();
                } catch (error) {
                    throw new GraphQLError(error.message, {
                        extensions: { code: "BAD_USER_INPUT" },
                    });
                }
            } else {
                const updatedAuthor = { ...authorFound._doc, bookCount: authorFound.bookCount + 1 };
                authorFound = await Author.findByIdAndUpdate(authorFound._id, updatedAuthor, { new: true });
            }

            const book = new Book({ ...args, author: authorFound });

            try {
                await book.save();
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: { code: "INTERNAL_SERVER_ERROR" },
                });
            }

            pubsub.publish("BOOK_ADDED", { bookAdded: book });

            return book;
        },
        editAuthor: async (_root, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError("Not authenticated", {
                    extensions: { code: "UNAUTHENTICATED" },
                });
            }

            const authorFound = await Author.findOne({ name: args.name }).lean();

            if (!authorFound) {
                throw new GraphQLError("Author does not exist", {
                    extensions: { code: "BAD_USER_INPUT" },
                });
            }

            const updatedAuthor = { ...authorFound, born: args.setBornTo };
            const returnedBlog = await Author.findByIdAndUpdate(authorFound._id, updatedAuthor, { new: true });
            return returnedBlog;
        },
        createUser: async (_root, args) => {
            const user = new User({ username: args.username });

            return user.save().catch(error => {
                throw new GraphQLError(error.message, {
                    extensions: { code: "INTERNAL_SERVER_ERROR" },
                });
            });
        },
        login: async (_root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== "secret") {
                throw new GraphQLError("Wrong credentials", {
                    extensions: { code: "BAD_USER_INPUT" },
                });
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, JWT_SECRET) };
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
        },
    },
};

module.exports = resolvers;
