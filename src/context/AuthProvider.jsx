import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState('');
    const [role, setRole] = useState('');

    return (
        <AuthContext.Provider value={{ token, setToken, role, setRole }}>
            {children}
        </AuthContext.Provider>
    );
}
