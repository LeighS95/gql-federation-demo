import { data } from "../data/data";
import { checkJwt } from "../jwt/jwt";

export const authResolver = {
    Query: {
        messages(
            parent:any,
            args:any,
            context:any,
            info:any
        ) {
            const user:any = checkJwt(context.user);

            if(!user.roles.includes('admin')) return new Error('Access Denied');

            return data;
        },
        getSentMessages(
            parent:any,
            args:any,
            context:any,
            info:any
        ) {
            const user:any = checkJwt(context.user);

            return data.filter(i => {
                return i.sender === user.name
            });
        },
        getRecievedMessages(
            parent:any,
            args:any,
            context:any,
            info:any
        ) {
            const user:any = checkJwt(context.user);

            return data.filter(i => {
                return i.reciever === user.name
            });
        },
        message(
            parent:any,
            args:any,
            context:any,
            info:any
        ) {
            return data.find(i => {
                if(i.id !== args.id)
                    return new Error('No Messages');
                
                return i;
            });
        }
    }
}