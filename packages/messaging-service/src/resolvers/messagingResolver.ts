// import { data } from "../data/data";
import { GraphQLResolverMap } from "apollo-graphql";
import fetch from "cross-fetch";
import { checkJwt } from "../jwt/jwt";


const apiUrl = "http://localhost:5000";


export const authResolver: GraphQLResolverMap = {
    Query: {
        messages(
            parent: any,
            args: any,
            context: any,
            info: any
        ) {
            const user: any = checkJwt(context.user);

            if (!user.roles.includes('admin')) return new Error('Access Denied');

            return fetch(`${apiUrl}/messages`).then((res: any) => res.json());
        },
        getSentMessages(
            parent: any,
            args: any,
            context: any,
            info: any
        ) {
            const user: any = checkJwt(context.user);

            return fetch(`${apiUrl}/messages/`)
                .then(res => res.json())
                .then(messages => {

                    return messages.filter((i: any) => {
                        return i.sender === user.name
                    });
                });

        },
        getRecievedMessages(
            parent: any,
            args: any,
            context: any,
            info: any
        ) {
            const user: any = checkJwt(context.user);

            return fetch(`${apiUrl}/messages/`)
                .then(res => res.json())
                .then(messages => {

                    return messages.filter((i: any) => {
                        return i.reciever === user.name
                    });
                });


        },
        message(
            parent: any,
            args: any,
            context: any,
            info: any
        ) {
            return fetch(`${apiUrl}/messages/${args.id}`).then(res => res.json());

        }
    }
}