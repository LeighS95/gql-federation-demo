import { sign } from 'jsonwebtoken';
// import { accounts } from '../data/accounts';
import { GraphQLResolverMap } from "apollo-graphql";
import fetch from "cross-fetch";

const apiUrl = "http://localhost:5000";

export const authResolver: GraphQLResolverMap = {
    Account: {
        __resolveReference(object: any) {
            // return accounts.find(account => account.id === object.id);
            return fetch(`${apiUrl}/accounts/${object.id}`).then(res => res.json());
        },
        projects(account: any) {
            if (account.role === 'admin') return fetch(`${apiUrl}/projects`).then((res: any) => res.json());

            return account.projects.map((id: any) => ({ __typename: "Account", id }));
        }
    },
    Query: {
        account(
            parent: any,
            args: any,
            context: any,
            info: any
        ) {
            // return accounts.find(account => account.id === args.id ? account : null);
            return fetch(`${apiUrl}/accounts/${args.id}`).then(res => res.json());
        },
        accounts() {
            // return accounts;
            return fetch(`${apiUrl}/accounts/`).then(res => res.json());
        },
    },
    Mutation: {
        async login(
            parent: any,
            args: any,
            context: any,
            info: any
        ) {
            return fetch(`${apiUrl}/accounts/`)
                .then(res => res.json())
                .then(accounts => {
                    const account = accounts.find((account: any) => account.email === args.email && account.password === args.password)

                    if (!account) throw new Error('Account not found');

                    return {
                        token: sign({ ...account }, 'secret', { expiresIn: '1h' })
                    }
                });


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