import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Query {
        user(id: ID!): User
    }

    type User @key(fields: "id") {
        id: ID!
        username: String
        role: String
    }
`;