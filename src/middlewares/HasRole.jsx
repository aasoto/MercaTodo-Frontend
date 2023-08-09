import { useContext } from "react"
import { AuthContext } from "../context"
import { Navigate } from "react-router-dom";

export const HasRole = ({ name, children }) => {

    const { role } = useContext(AuthContext);
    
    return role === name ? children : <Navigate to={'/'} />
}
