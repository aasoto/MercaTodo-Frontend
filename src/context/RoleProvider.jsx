import { useState } from "react";
import { RoleContext } from "./RoleContext";

export const RoleProvider = ({ children }) => {

    const [role, setRole] = useState('');

    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    );
}