// index.js
// This is the main entry point of our application

//  ================================================================================== //
const express = require('express');
// I need to turn the express server into a GraphQL server using the apollo-server-express
// package.
const { ApolloServer, gql } = require('apollo-server-express');

//  ================================================================================== //
// currently the app is listening on port 4000 which is fine for development. but
// I will need to make some flexibility to set this to a different port number
// when deploying the application. To start I will create a `port` variable:

const port = process.env.PORT || 4000;

//  ================================================================================== //
/* Now That I have imported the apollo-server I can set up a basic GraphQL application
GraphQL applications consist of two primary components: a schema of type definitions
and resolvers., which resolve the queries and mutations performed against the data. */

// So to begin I will build a basic schema:
const typeDefs = gql
    `type Query {
    hello: String
    }`;

// Create the Resolver functions for the schema
const resolvers = {
    Query: {
        hello: () => "Hello World!"
    }
};

//  ================================================================================== //
const app = express();

//  ================================================================================== //
// Next I will integrate Apollo Server to serve GraphQL API. To Do so, we'll add
// some Apollo Server specific settings and middleware and update the app.listen
// method:

// Apollo Server Setup:
const server = new ApolloServer({ typeDefs, resolvers });

//  ================================================================================== //
app.get('/', (req, res) => res.send('Hello World!!'));


//  ================================================================================== //
// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

//  ================================================================================== //
// This change will allow me to dynamically set the port in the Node environment,
// but fall back to port 4000 when no port is specified. Now I will have to
// adjust the app.listen() method to work with this change and use a template
//  literal to log the correct port.

// Update this to accomodate the GraphQL API:
app.listen(port, () =>
    console.log(
        'GraphQL Server running at http://localhost:${port}${server.graphqlPath}'
    )
);

//  ================================================================================== //
