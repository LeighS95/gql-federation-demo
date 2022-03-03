import { ApolloServer } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';

import { typeDefs } from './typedefs/typeDefs';
import { projectResolver as resolvers } from './resolvers/projectResolver';

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

server.listen(4002).then(({ url }) => {
    console.log(`Project Ready at ${url}`);
});