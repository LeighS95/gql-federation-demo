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
    ])
});

server.listen(4003).then(({ url }) => {
    console.log(`Campaign Ready at ${url}`);
});