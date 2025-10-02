import { useState } from "react";
import { AuthUserContext } from "./AuthUserContext";

const tokenValue = localStorage.getItem("TokenJWT");
const nameValue = localStorage.getItem("NombreContext");
const rolValue = localStorage.getItem("RolContext");
const idUserValue = localStorage.getItem("IdUserContext");

const AuthUserContextProvider = ({ children }) => {
  const [token, setToken] = useState(tokenValue);
  const [user, setUser] = useState(nameValue);
  const [rol, setRol] = useState(rolValue);
  const [idUser, setIdUser] = useState(idUserValue);

  const handleLogin = (token, nombre, rol) => {
    setToken(token);
    localStorage.setItem("TokenJWT", token);
    setUser(nombre);
    localStorage.setItem("NombreContext", nombre);
    setRol(rol);
    localStorage.setItem("RolContext", rol);
    setIdUser(idUser);
    localStorage.setItem("IdUserContext", idUser);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setRol(null);
    setIdUser(null);
    localStorage.removeItem("TokenJWT");
    localStorage.removeItem("NombreContext");
    localStorage.removeItem("RolContext");
    localStorage.removeItem("IdUserContext");
  };

  return (
    <AuthUserContext
      value={{
        user,
        token,
        rol,
        idUser,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      {children}
    </AuthUserContext>
  );
};

export default AuthUserContextProvider;
