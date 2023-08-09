import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const PublicRoute = ({children}) => {
    const { token } = useContext(AuthContext);

    const lastPath = localStorage.getItem('lastPath') || '/';

    return (token == '')
        ? children
        : <Navigate to={lastPath} />
}
