const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');
const models = require('./models');

// ================================================================== //
// Run our server on a port specified in our .env file or port 4000
// ================================================================= //
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

// ================================================================= //
// Create Notes:
// ================================================================= //
let notes = [
    {
        id: '1',
        content: 'This is a note',
        author: 'Adam Scott'
    },
    {
        id: '2',
        content: 'This is another note',
        author: 'Harlow Everly'
    },
    {
        id: '3',
        content: 'Oh hey look, another note!',
        author: 'Riley Harrison'
    }
];

// =============================================================== //
// Construct a schema, using GraphQL's schema language
// =============================================================== //
const typeDefs = gql`
  type Note {
    id: ID
    content: String
    author: String
  }

  type Query {
    hello: String
    notes: [Note]
    note(id: ID): Note
  }

  type Mutation {
    newNote(content: String!): Note
  }
`;

// =============================================================== //
// Provide resolver functions for our schema fields
// =============================================================== //
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        notes: async () => {
            return await models.Note.find();
        },
        note: async (parent, args) => {
            return await models.Note.findById(args.id);
        }
    },
    Mutation: {
        newNote: async (parent, args) => {
            return await models.Note.create({
                content: args.content,
                author: 'Adam Scott'
            });
        }
    }
};


// ============================================================== //
// Create the app assignment and connect to the database:
// ============================================================== //
const app = express();

db.connect(DB_HOST);

// ============================================================== //
// Build the new Apollo Server:
// ============================================================== //
const server = new ApolloServer({ typeDefs, resolvers });

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
