import { gql } from '@apollo/client';

export const QUERY_ALL_PROVIDERS = gql`
  {
    products {
      _id
      name
      description
      price
      availability
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  query getUser($_id: ID!){
    user(_id: $_id) {
      _id
      firstName
      lastName
      email
      pets {
        _id
        age
        breed
      }
      favorites {
        _id
        name
        description
        price
        #quantity
        image
        availability
        category {
          name
        }
      }
      orders {
        _id
        purchaseDate
        #products {
         # _id
         # name
         # description
         # price
         # quantity
         # image
        #}
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      firstName
      lastName
      email
      pets {
        _id
        age
        breed
      }
      favorites {
        _id
        name
        description
        price
        quantity
        image
        availability
        category {
          name
        }
      }
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_PROVIDER = gql`
  query provider($id: ID!) {
    provider(_id: $id) {
      _id
      name
      description
      image
      price
      availability
      category {
        name
      }
    }
  }
`;

export const QUERY_PROVIDERS = gql`
  query providers($name: String) {
    providers(name: $name) {
      _id
      name
      description
      image
      price
      availability
      category {
        _id
        name
      }
    }
  }
`;