import { gql } from '@apollo/client';

export const QUERY_SINGLE_USER = gql`
query GetSingleUser($id: ID!) {
    getSingleUser(_id: $id) {
      username
      savedBooks {
        title
      }
    }
  }
`;

export const MUTATION_CREATE_USER = gql`
mutation Signup($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) 
}
      
`;

export const MUTATION_SAVE_BOOK = gql`
mutation Mutation($id: ID!, $bookId: String!, $description: String!, $title: String!) {
    saveBook(_id: $id, bookId: $bookId, description: $description, title: $title) {
      username
      savedBooks {
        title
        bookId
      }
    }
  }
`;

export const MUTATION_DELETE_BOOK = gql`
mutation Mutation($id: ID!, $bookId: ID!) {
    deleteBook(_id: $id, bookId: $bookId) {
      username
      savedBooks {
        title
      }
    }
  }
`;

export const MUTATION_LOGIN = gql`
mutation Mutation($email: String, $password: String) {
  login(email: $email, password: $password)
}
`