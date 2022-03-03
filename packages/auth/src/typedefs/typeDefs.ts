import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Account @key(fields: "id") {
        id: ID!
        name: String
        roles: [String]
        permissions: [String]
        projects: [Project]
        campaigns: [String]
    }

    extend type Project @key(fields: "id") {
        id: ID! @external
    }

    type Query {
        account(id: ID!): Account
        accounts: [Account]
    }

    type LoginResponse {
        token: String
    }

    extend type Mutation {
        login(
            email: String!,
            password: String!
        ): LoginResponse!
    }
`;