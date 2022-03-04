import { ApolloServer } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';

import { typeDefs } from './typedefs/typeDefs';
import { authResolver as resolvers } from './resolvers/messagingResolver';

const server = new ApolloServer({
    schema: buildSubgraphSchema([
        {
            typeDefs,
            resolvers
        }
    ]),
    context: ({ req }:any) => {
        const user = req.headers.authorization || null;
        return { user }
    },
    introspection: process.env.NODE_ENV !== 'production' ? true : false
});

server.listen(4004).then(({ url }) => {
    console.log(`Messaging Service Ready at ${url}`);
});