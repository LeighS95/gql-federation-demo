import { GraphQLResolverMap } from "apollo-graphql";
import fetch from "cross-fetch";

const apiUrl = "http://localhost:3000";

export const authResolver: GraphQLResolverMap = {
    Query: {
        user(_, { id }) {
            return fetch(`${apiUrl}/users/${id}`).then(res => res.json());
        },
        users() {
            return fetch(`${apiUrl}/users`).then(res => res.json());
        }
    },
    User: {
        __resolveReference(ref: any) {
            return fetch(`${apiUrl}/users/${ref.id}`).then(res => res.json());
        },
        campaigns(user) {
            if (user.role === 'admin') return fetch(`${apiUrl}/campaigns`).then(res => res.json());

            return user.campaigns.map((id: any) => ({ __typename: "User", id }));
        }
    }
}