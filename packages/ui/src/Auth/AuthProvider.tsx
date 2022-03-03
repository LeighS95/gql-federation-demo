import jwt from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { gql, useMutation } from '@apollo/client';


interface AuthContextType {
    user: any;
    signin: (
        user: { email: string, password: string },
        callback: VoidFunction
    ) => void;
    signout: (callback: VoidFunction) => void;
}

const defaultState = (): AuthContextType => {
    return {
        user: window.localStorage.getItem('token'),
        signin: (
            user: { email: string, password: string },
            callback: () => void
        ) => null,
        signout: () => null
    }
}

const AuthContext = createContext<AuthContextType>(defaultState());

const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

export const AuthProvider:React.FC = ({ children }) => {
    const [user, setUser] = useState<any>(null);

    const [login, { data, loading, error, reset }] = useMutation(LOGIN_MUTATION);

    const signin = async (user: { email:string, password: string }, callback: VoidFunction) => {
        await login({
            variables: {
                email: user.email,
                password: user.password
            }
        });

        await window.localStorage.setItem('token', await data.login.token);

        const decoded = jwt(data.login.token)

        setUser(decoded);
        callback();
    }

    const signout = (callback: VoidFunction) => {
        setUser(null);
        window.localStorage.removeItem('token');
        callback();
    }

    let value = { user, signin, signout };

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);