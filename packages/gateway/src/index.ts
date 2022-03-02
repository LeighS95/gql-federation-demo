import { ApolloServer } from 'apollo-server';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { handleAuth } from './handleAuth';

const gateway = new ApolloGateway({
    serviceList: [
        { name: 'Auth', url: 'http://localhost:4001' },
        { name: 'Messaging', url: 'http://localhost:4002' }
    ],
    buildService({ name, url }) {
        return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }:any) {
                request.http?.headers.set(
                    'authorization',
                    context.user
                );
            }
        })
    }
});
const server = new ApolloServer({
    gateway,
    introspection: true,
    context: handleAuth
});

server.listen({port: 4000, cors: { origin: '*' }}).then(({ url }) => {
    console.log(`Gateway is ready at ${url}`);
}).catch(error => console.error(error));