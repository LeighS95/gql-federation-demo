import { GraphQLResolverMap } from "apollo-graphql";
import fetch from "cross-fetch";

const apiUrl = "http://localhost:3000";

export const projectResolver: GraphQLResolverMap = {
    Query: {
        project(_, { id }) {
            return fetch(`${apiUrl}/projects/${id}`).then(res => res.json());
        },
        projects() {
            return fetch(`${apiUrl}/projects`).then(res => res.json());
        }
    },
    Project: {
        __resolveReference(ref: any) {
            return fetch(`${apiUrl}/projects/${ref.id}`).then(res => res.json());
        },
        campaigns(projects) {
            return projects.campaigns.map((id: any) => ({ __typename: "Campaign", id }));
        }
    }
}