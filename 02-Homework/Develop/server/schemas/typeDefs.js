const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID!
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Query {
    getSingleUser(_id: String): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    login(email: String, username: String, password: String!): User
    saveBook(_id: ID!, book: Book!): User
    deleteBook(_id: ID!, bookId: ID!): User
  }
`;

module.exports = typeDefs;
