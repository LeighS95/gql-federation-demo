import { verify } from 'jsonwebtoken';

const PUBLIC_ACTIONS = ['LOGIN'];

const actionIsPublic = ({ query }:any) => (
    PUBLIC_ACTIONS.some(action => query.includes(action))
);

const isIntrospectionQuery = ({ opName }:any) => opName === 'IntrospectionQuery';

const shouldAuthenticate = (body:any) => (
    !isIntrospectionQuery(body) && !actionIsPublic(body)
);

export const handleAuth = ({ req }:any) => {
    // if(shouldAuthenticate(req.body)) {
    //     const decoded = verify(req.headers.authorization, 'secret');

    //     return decoded;
    // } else {
    //     return null
    // }

    if(req.headers.authorization) {
        const decoded = verify(req.headers.authorization, 'secret');
        return { user: req.headers.authorization };
    }
}