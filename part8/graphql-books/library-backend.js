require("dotenv").config();

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { execute, subscribe } = require("graphql");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const { authors, books } = require("./data");

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

    const getUserContext = async ({ req }) => {
        const auth = req ? req.headers.authorization : null;

        if (auth && auth.toLowerCase().startsWith("bearer ")) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser };
        }
    };

    try {
        const app = express();
        const httpServer = http.createServer(app);

        const schema = makeExecutableSchema({ typeDefs, resolvers });

        const wsServer = new WebSocketServer({
            server: httpServer,
            path: "/",
        });

        const serverCleanup = useServer({ schema }, wsServer);

        const server = new ApolloServer({
            schema,
            context: getUserContext,
            plugins: [
                ApolloServerPluginDrainHttpServer({ httpServer }),
                {
                    async serverWillStart() {
                        return {
                            async drainServer() {
                                await serverCleanup.dispose();
                            },
                        };
                    },
                },
            ],
        });

        await server.start();

        app.use("/", cors(), bodyParser.json(), expressMiddleware(server, { context: getUserContext }));

        const PORT = 4000;

        httpServer.listen(PORT, () => {
            console.log(`Server is now running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to GraphQL & Express", error.message);
    }
})();
