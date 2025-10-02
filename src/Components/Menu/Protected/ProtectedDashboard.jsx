import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthUserContext } from "../../../Services/AuthUserContext/AuthUserContext";
import { IsTokenValid } from "./Protected.helpers";

// SI TIENE TOKEN A MENUU Y SI NO TIENE A AUTH

const ProtectedDashboard = ({ children }) => {
  const { rol, token } = useContext(AuthUserContext);

  const hasValidToken = IsTokenValid(token);
  const hasAccess = rol === "admin" || rol === "sysadmin";

  if (!hasValidToken || !hasAccess) {
    return <Navigate to="/Auth" replace />;
  }

  return children;
};

export default ProtectedDashboard;
