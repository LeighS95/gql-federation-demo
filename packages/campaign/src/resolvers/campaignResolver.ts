import { GraphQLResolverMap } from "apollo-graphql";
import fetch from "cross-fetch";
import { checkJwt } from "../jwt/jwt";


const apiUrl = "http://localhost:5000";

export const campaignResolver: GraphQLResolverMap = {
    Query: {
        campaign(parent: any,
            args: any,
            context: any,
            info: any) {
            return fetch(`${apiUrl}/campaigns/${args.id}`).then(res => res.json());
        },
        campaigns(parent: any,
            args: any,
            context: any,
            info: any) {

            const user: any = checkJwt(context.user);

            if (!user.roles.includes('admin')) return new Error('Access Denied');

            return fetch(`${apiUrl}/campaigns`).then(res => res.json());
        },
        getUserCampaigns(parent: any,
            args: any,
            context: any,
            info: any) {

            const user: any = checkJwt(context.user);

            return fetch(`${apiUrl}/campaigns`)
                .then(res => res.json())
                .then(campaigns => campaigns.filter((i: any) => user.campaigns.includes(i.id))
                );

        }
    },
    Campaign: {
        __resolveReference(ref: any) {
            return fetch(`${apiUrl}/campaigns/${ref.id}`).then(res => res.json());
        }
    }
}