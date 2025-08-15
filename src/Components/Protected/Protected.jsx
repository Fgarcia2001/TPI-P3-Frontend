import { Navigate } from "react-router";

const Protected = ({ children, role }) => {
  const isLoggedIn = role === "admin" ? true : false; // Replace with your authentication logic

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default Protected;
