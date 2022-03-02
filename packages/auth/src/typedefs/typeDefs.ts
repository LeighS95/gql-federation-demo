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
    }
`;