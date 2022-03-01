import { ApolloServer } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';

import { typeDefs } from './typedefs/typeDefs';
import { authResolver as resolvers } from './resolvers/authResolver';

const server = new ApolloServer({
    schema: buildSubgraphSchema([
        {
            typeDefs,
            resolvers
        }
    ])
});

server.listen(4001).then(({ url }) => {
    console.log(`Auth Ready at ${url}`);
});