import { useState } from "react";
import { AuthUserContext } from "./AuthUserContext";

const tokenValue = localStorage.getItem("TokenJWT");
const nameValue = localStorage.getItem("NombreContext");
const rolValue = localStorage.getItem("RolContext");


const AuthUserContextProvider = ({ children }) => {
  const [token, setToken] = useState(tokenValue);
  const [user, setUser] = useState(nameValue);
  const [rol, setRol] = useState(rolValue);


  const handleLogin = (token, nombre, rol) => {
    setToken(token);
    localStorage.setItem("TokenJWT", token);
    setUser(nombre);
    localStorage.setItem("NombreContext", nombre);
    setRol(rol);
    localStorage.setItem("RolContext", rol);

  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setRol(null);

    localStorage.removeItem("TokenJWT");
    localStorage.removeItem("NombreContext");
    localStorage.removeItem("RolContext");
  
  };

  return (
    <AuthUserContext
      value={{
        user,
        token,
        rol,

        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      {children}
    </AuthUserContext>
  );
};

export default AuthUserContextProvider;
