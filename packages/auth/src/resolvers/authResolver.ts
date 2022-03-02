import { sign } from 'jsonwebtoken';
import { accounts } from '../data/accounts';

export const authResolver = {
    Account: {
        __resolveReference(object:any) {
            return accounts.find(account => account.id === object.id);
        }
    },
    Query: {
        account(
            parent:any,
            args:any,
            context:any,
            info:any
        ) {
            return accounts.find(account => account.id === args.id ? account : null);
        },
        accounts() {
            return accounts;
        },
    },
    Mutation: {
        login(
            parent:any,
            args:any,
            context:any,
            info:any
        ) {
            const account = accounts.find(account => account.email === args.email && account.password === args.password);

            if(!account) throw new Error('Account not found');

            return {
                token: sign({ ...account }, 'secret', { expiresIn: '1h' })
            }
        }
    }
}