import { gql } from 'apollo-server';

export const typeDefs = gql`
    extend type Query {
        user(id: ID!): User
        users: [User]
    }

    type User @key(fields: "id") {
        id: ID!
        username: String
        role: String
        campaigns: [Campaign]
    }

    extend type Campaign @key(fields: "id") {
        id: ID! @external
    }
`;