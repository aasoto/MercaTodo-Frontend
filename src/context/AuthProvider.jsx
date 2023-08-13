import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState('');
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState();
    const [isVerified, setIsVerified] = useState(null);
    const [name, setName] = useState('');

    return (
        <AuthContext.Provider value={{ 
            token, 
            setToken, 
            role, 
            setRole, 
            userId, 
            setUserId,
            isVerified,
            setIsVerified,
            name,
            setName,
        }}>
            {children}
        </AuthContext.Provider>
    );
}
