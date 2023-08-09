import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context";

export const PrivateRoute = ({ children }) => {

  const { role } = useContext(AuthContext);

  const { pathname } = useLocation();

  useEffect(() => {
    localStorage.setItem('lastPath', pathname);
  }, [pathname]);


  return (role != '')
    ? children
    : <Navigate to="/" />
}
