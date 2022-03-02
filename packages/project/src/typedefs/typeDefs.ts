import { gql } from 'apollo-server';

export const typeDefs = gql`
    extend type Query {
        project(id: ID!): Project
        projects: [Project]
    }

    type Project @key(fields: "id") {
        id: ID!
        name: String
        campaigns: [Campaign]
    }

    extend type Campaign @key(fields: "id") {
        id: ID! @external
    }
`;