import { gql } from 'apollo-server';

export const typeDefs = gql`
    extend type Query {
        campaign(id: ID!): Campaign
        campaigns: [Campaign]
    }

    type Campaign @key(fields: "id") {
        id: ID!
        name: String
        startDate: String
        endDate: String
    }
`;