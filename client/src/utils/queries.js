import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      bits {
        _id
        bitText
        createdAt
      }
    }
  }
`;

export const QUERY_BITS = gql`
  query getBits {
    bits {
      _id
      bitText
      bitAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_BIT = gql`
  query getSingleBit($bitId: ID!) {
    bit(bitId: $bitId) {
      _id
      bitText
      bitAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      bits {
        _id
        bitText
        bitAuthor
        createdAt
      }
    }
  }
`;
