const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
// ================================================================== //
// Run our server on a port specified in our .env file or port 4000
// ================================================================= //
const port = process.env.PORT || 4000;
const DB_HOST = process.env.TEST_DB; // THIS NEEDS TO BE CHANGED TO MAIN DATABASE AT SOME POINT

// ============================================================== //
// Create the app assignment and connect to the database:
// ============================================================== //
const app = express();

db.connect(DB_HOST);

// ================================================================== //
// Get the user information from a JWT
// ================================================================= //
const getUser = token => {
    if (token) {
        try {
            // return the user information from the token
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            // if there's a problem with the token, throw an error
            throw new Error('Session invalid');
        }
    }
};
// ============================================================== //
// Build the new Apollo Server:
// ============================================================== //
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // get the user token from the headers
        const token = req.headers.authorization
        // try to retrieve a user with a token
        const user = getUser(token)
        // for now, lets log the user to the console
        console.log(user)
        // add the db models and the user to the context
        return { models, user };
    }
});

// ============================================================== //
// Apply the Apollo GraphQL middleware and set the path to /api
// ============================================================== //
server.applyMiddleware({ app, path: '/api' });

// ============================================================== //
// Build the app.listen  method:
// ============================================================== //
app.listen({ port }, () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
);
