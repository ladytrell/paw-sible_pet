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
    me: User
    categories: [Category]
    providers(category: ID, name: String): [Provider]
    provider(_id: ID!): Provider
    user(_id: ID!): User
    users: [User]
    order(_id: ID!): Order
    checkout(providers: [ID]!): Checkout 
    pets(_id: ID): [PetProfile]
    favorites(_id: ID): [User]
  }

  type Mutation {
    addFavorite(id: ID!): User
    deleteFavorite(id: ID!): User
    addPet(name: String!, breed: String!, age: Float!): PetProfile
    delPet(_id: ID!): User
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(providers: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProvider(_id: ID!, availability: [ID]!): Provider
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
