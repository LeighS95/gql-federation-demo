import { ApolloServer } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';

import { typeDefs } from './typedefs/typeDefs';
import { campaignResolver as resolvers } from './resolvers/campaignResolver';

const server = new ApolloServer({
    schema: buildSubgraphSchema([
        {
            typeDefs,
            resolvers
        }
    ]),
    context: ({ req }: any) => {
        const user = req.headers.authorization || null;
        return { user }
    },
    introspection: process.env.NODE_ENV !== 'production' ? true : false
});

server.listen(4003).then(({ url }) => {
    console.log(`Campaign Ready at ${url}`);
});