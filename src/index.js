const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
// ================================================================== //
// Setup the port assignment:
// ================================================================= //
const port = process.env.PORT || 4000;

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
// Create a Schema using GraphQL Schema language:
// =============================================================== //
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID): Note
  }

  type Mutation {
    newNote(content: String!): Note
  }
`;

// =============================================================== //
// Create a resolver function for the schema language
// =============================================================== //
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
                author: 'Charles Wolfe'
            };
            notes.push(noteValue);
            return noteValue;
        }
    }
};

// ============================================================== //
// Create the app assignment:
// ============================================================== //
const app = express();

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
