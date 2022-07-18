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

  type Reservation {
    _id: ID
    service: Category
    provider: Provider
    timeSlot: String
  }

  type Order {
    _id: ID
    purchaseDate: String
    reservations: [Reservation]
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
    providers(category: ID, name: String): [Provider]
    provider(_id: ID!): Provider
    user: User
    order(_id: ID!): Order
    checkout(providers: [ID]!): Checkout 
    reservation: [Reservation]
  }

  type Mutation {
    addFavorite(providers: [ID]!): [Provider]
    addPet(name: String!, breed: String!, age: Float!): PetProfile
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(providers: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProvider(_id: ID!, availability: [ID]!): Provider
    login(email: String!, password: String!): Auth
    addReservation(service: ID, provider: [ID]!, timeSlot: String!): Reservation
  }
`;

module.exports = typeDefs;
