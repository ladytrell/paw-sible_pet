import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_FAVORITE = gql`
    mutation addFavorite($id: ID!){
      addFavorite(id: $id) {
        _id
      }
    }
  `;

export const REMOVE_FAVORITE = gql`
  mutation deleteFavorite($id: ID!) {
    deleteFavorite(id: $id) {
      _id
    }
  }`;

export const ADD_RESERVATION = gql`
  mutation AddReservation(
    $provider: [ID]!, 
    $timeSlot: String!
    ) {
    addReservation(
      provider: $provider, 
      timeSlot: $timeSlot
      ) {
      _id
      provider {
        _id
        name
        price
        category{
          name
        }
      }
      timeSlot
    }
  }
`;