const Query = require('./query');
const Mutation = require('./mutations');
const { GraphQLDateTime } = require('graphql-iso-date');


module.exports = {
    Query,
    Mutation,
    DateTime: GraphQLDateTime
};
