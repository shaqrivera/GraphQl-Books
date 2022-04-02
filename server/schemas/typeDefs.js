const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }
  input inputBook {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
    token: String
  }

  type Query {
    getSingleUser(_id: ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): String
    login(email: String, password: String): String
    saveBook(_id: ID, book: inputBook): User
    deleteBook(_id: ID, bookId: ID): User
  }
`;

module.exports = typeDefs;
