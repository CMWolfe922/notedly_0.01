const { gql } = require('apollo-server-express');

// =============================================================== //
// Construct a schema, using GraphQL's schema language
// =============================================================== //
module.exports = gql`
  scalar DateTime
  type Note {
    id: ID!
    content: String!
    author: User!
    favoriteCount: Int!
    FavoritedBy: [User!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    notes: [Note!]!
    favorites: [Note!]!
  }

  type Query {
    notes: [Note!]!
    note(id: ID!): Note!
    user(username: String!): User
    users: [User!]!
    me: User!
    noteFeed:(cursor: String): NoteFeed
  }

  type Mutation {
    newNote(content: String!): Note!
    updateNote(id: ID!, content: String!): Note!
    deleteNote(id: ID!): Boolean!
    toggleFavorite(id: ID!): Note!
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
  }

  type NoteFeed {
    notes: [Note]!
    cursor: String!
    hasNextPage: Boolean!
  }
`;
