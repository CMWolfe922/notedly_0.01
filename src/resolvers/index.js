const Query = require('./query');
const Mutation = require('./mutations');
const Note = require('./note');
const User = require('./user');
const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = {
    Query,
    Mutation,
    Note,
    User,
    DateTime: GraphQLDateTime
};
