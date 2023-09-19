import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BIT = gql`
  mutation addBit($bitText: String!) {
    addBit(bitText: $bitText) {
      _id
      bitText
      bitAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($bitId: ID!, $commentText: String!) {
    addComment(bitId: $bitId, commentText: $commentText) {
      _id
      bitText
      bitAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const REMOVE_BIT = gql`
  mutation removeBit($bitId: ID!) {
    removeBit(bitId: $bitId) {
      _id
      username
      email
    }
  }
`;