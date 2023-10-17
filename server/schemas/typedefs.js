const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bits: [Bit]!
    buddies: [User]
  }

  type Bit {
    _id: ID
    bitText: String
    bitAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    bits(username: String): [Bit]
    bit(bitId: ID!): Bit
    me: User
    buddies(username: String): [User]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBit(bitText: String!): Bit
    addComment(bitId: ID!, commentText: String!): Bit
    addBuddy( userId: ID! ): User
    removeBit(bitId: ID!): Bit
    removeComment(bitId: ID!, commentId: ID!): Bit
  }
`;

module.exports = typeDefs;
