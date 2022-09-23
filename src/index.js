// index.js
// This is the main entry point of our application

//  ================================================================================== //
// Import packages:
// =================================================================================== //
const express = require('express');

const { ApolloServer, gql } = require('apollo-server-express');

// ================================================================================== //
// Run the server on a port specified in our .env file or port 4000
// ================================================================================== //
const port = process.env.PORT || 4000;

//  ================================================================================= //
//  Now Add Notes for the app:
// ================================================================================= //
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

//  ================================================================================= //
// Construct a schema, using GraphQL's schema language
// ================================================================================= //
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

// =================================================================================== //
// Provide resolver functions for our schema fields
// =================================================================================== //
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        notes: () => notes,
        note: (parent, args) => {
            return notes.find(note => note.id === args.id);
        }
    },
    Mutation: {
        newNote: (parent, args) => {
            let noteValue = {
                id: String(notes.length + 1),
                content: args.content,
                author: 'Adam Scott'
            };
            notes.push(noteValue);
            return noteValue;
        }
    }
};
//  ================================================================================== //
// USe the express server:
// ================================================================================== //
const app = express();

//  ================================================================================= //
// Apollo Server setup
// ================================================================================== //
const server = new ApolloServer({ typeDefs, resolvers });

//  ================================================================================= //
// Apply the Apollo GraphQL middleware and set the path to /api
//  ================================================================================= //
server.applyMiddleware({ app, path: '/api' });

//  ================================================================================= //
// Run the app.listen function:
// ================================================================================== //
app.listen({ port }, () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
);
