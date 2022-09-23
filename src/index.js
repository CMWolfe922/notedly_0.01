const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
// ================================================================== //
// Run our server on a port specified in our .env file or port 4000
// ================================================================= //
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

// ================================================================== //
// Setup the new mutation and resolver imports
// ================================================================= //

// ============================================================== //
// Create the app assignment and connect to the database:
// ============================================================== //
const app = express();

db.connect(DB_HOST);

// ============================================================== //
// Build the new Apollo Server:
// ============================================================== //
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        return { models };
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
