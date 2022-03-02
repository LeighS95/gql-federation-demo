import { GraphQLResolverMap } from "apollo-graphql";
import fetch from "cross-fetch";

const apiUrl = "http://localhost:3000";

export const campaignResolver: GraphQLResolverMap = {
    Query: {
        campaign(_, { id }) {
            return fetch(`${apiUrl}/campaigns/${id}`).then(res => res.json());
        },
        campaigns() {
            return fetch(`${apiUrl}/campaigns`).then(res => res.json());
        }
    },
    Campaign: {
        __resolveReference(ref: any) {
            return fetch(`${apiUrl}/campaigns/${ref.id}`).then(res => res.json());
        }
    }
}