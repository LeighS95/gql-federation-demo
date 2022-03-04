import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = (
    { children }: { children: JSX.Element | JSX.Element[] }
) => {
    const [isAuthenticated, setIsAuthenticated] = useState(window.localStorage.getItem('token'));
    let location = useLocation();

    if(!isAuthenticated) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return (
        <>
            {children}
        </>
    )
}