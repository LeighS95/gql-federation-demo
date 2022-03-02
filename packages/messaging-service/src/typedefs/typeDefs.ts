import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Query {
        messages: [Message]
        getSentMessages: [Message]
        getRecievedMessages: [Message]
        message(id: ID!): Message
    }

    type Message @key(fields: "id") {
        id: ID!
        sender: String
        reciever: String
        content: String
    }
`;