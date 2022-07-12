const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Availability {
    _id: ID
    time: String
  }

  type Provider {
    _id: ID
    name: String
    description: String
    image: String
    availability: [Availability]
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    providers: [Provider]
  }

  type PetProfile {
    _id: ID
    name: String
    breed: String
    age: Float
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    pets: [PetProfile]
    favorites: [Provider]
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
    availability: [Availability]
    providers(availability: [ID], category: ID, name: String): [Provider]
    provider(_id: ID!): Provider
    user: User
    order(_id: ID!): Order
    checkout(providers: [ID]!): Checkout 
  }

  type Mutation {
    addFavorite(providers: [ID]!): [Provider]
    addPet(name: String!, breed: String!, age: String!): PetProfile
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(providers: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProvider(_id: ID!, availability: [ID]!): Provider
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
