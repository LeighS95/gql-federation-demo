import { sign } from 'jsonwebtoken';
import { accounts } from '../data/accounts';

const apiUrl = "http://localhost:5000";

export const authResolver = {
    Account: {
        __resolveReference(object:any) {
            return accounts.find(account => account.id === object.id);
        },
        projects(account:any) {
            if (account.role === 'admin') return fetch(`${apiUrl}/projects`).then((res:any) => res.json());

            return account.projects.map((id: any) => ({ __typename: "Account", id }));
        }
    },
    Query: {
        account(
            parent:any,
            args:any,
            context:any,
            info:any
        ) {
            return accounts.find(account => account.id === args.id ? account : null);
        },
        accounts() {
            return accounts;
        },
    },
    Mutation: {
        login(
            parent:any,
            args:any,
            context:any,
            info:any
        ) {
            const account = accounts.find(account => account.email === args.email && account.password === args.password);

            if(!account) throw new Error('Account not found');

            return {
                token: sign({ ...account }, 'secret', { expiresIn: '1h' })
            }
        }
    }
}

// import { GraphQLResolverMap } from "apollo-graphql";
// import fetch from "cross-fetch";

// const apiUrl = "http://localhost:5000";

// export const authResolver: GraphQLResolverMap = {
//     Query: {
//         user(_, { id }) {
//             return fetch(`${apiUrl}/users/${id}`).then(res => res.json());
//         },
//         users() {
//             return fetch(`${apiUrl}/users`).then(res => res.json());
//         }
//     },
//     User: {
//         __resolveReference(ref: any) {
//             return fetch(`${apiUrl}/users/${ref.id}`).then(res => res.json());
//         },
//         projects(user) {
//             if (user.role === 'admin') return fetch(`${apiUrl}/projects`).then(res => res.json());

//             return user.projects.map((id: any) => ({ __typename: "User", id }));
//     }
// }}