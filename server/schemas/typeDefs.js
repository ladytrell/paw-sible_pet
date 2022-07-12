const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Provider {
    _id: ID
    name: String
    description: String
    image: String
    availability: [String]
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    providers: [Provider]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }  

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    providers(category: ID, name: String): [Provider]
    provider(_id: ID!): Provider
    user: User
    order(_id: ID!): Order
    checkout(providers: [ID]!): Checkout  
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(providers: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProvider(_id: ID!, quantity: Int!): Provider
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
