import { GraphQLResolverMap } from "apollo-graphql";
import fetch from "cross-fetch";
import { checkJwt } from "../jwt/jwt";


const apiUrl = "http://localhost:5000";

export const projectResolver: GraphQLResolverMap = {
    Query: {
        project(parent: any,
            args: any,
            context: any,
            info: any) {

            return fetch(`${apiUrl}/projects/${args.id}`).then(res => res.json());
        },
        projects(parent: any,
            args: any,
            context: any,
            info: any) {

            const user: any = checkJwt(context.user);

            if (!user.roles.includes('admin')) return new Error('Access Denied');

            return fetch(`${apiUrl}/projects`).then(res => res.json());
        },
        getUserProjects(parent: any,
            args: any,
            context: any,
            info: any) {

            const user: any = checkJwt(context.user);

            return fetch(`${apiUrl}/projects`)
                .then(res => res.json())
                .then(projects => projects.filter((i: any) => user.projects.includes(i.id))
                );

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