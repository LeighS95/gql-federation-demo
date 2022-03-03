import { verify } from "jsonwebtoken";

export const checkJwt = (token: string) => {
    if(!token) throw new Error('Invalid Credentials');

    const decoded = verify(token, 'secret');

    return decoded;
}