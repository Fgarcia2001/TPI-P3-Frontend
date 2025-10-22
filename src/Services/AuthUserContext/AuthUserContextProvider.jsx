import { useState } from "react";
import { AuthUserContext } from "./AuthUserContext";

const tokenValue = localStorage.getItem("TokenJWT");
const nameValue = localStorage.getItem("NombreContext");
const rolValue = localStorage.getItem("RolContext");
const idValue = localStorage.getItem("IdUserContext");
const isLoggedValue = localStorage.getItem("isLogged") === "true";

const AuthUserContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(isLoggedValue);
  const [token, setToken] = useState(tokenValue);
  const [user, setUser] = useState(nameValue);
  const [rol, setRol] = useState(rolValue);
  const [idUser, setIdUser] = useState(idValue);

  const handleLogin = (token, nombre, rol, idUser) => {
    if (nombre !== "usuario") {
      setToken(token);
      localStorage.setItem("TokenJWT", token);

      setUser(nombre);
      localStorage.setItem("NombreContext", nombre);

      setRol(rol);
      localStorage.setItem("RolContext", rol);

      setIdUser(idUser);
      localStorage.setItem("IdUserContext", idUser);

      setIsLogged(true);
      localStorage.setItem("isLogged", "true");
    } else {
      setUser(nombre);
      localStorage.setItem("NombreContext", nombre);
      setToken(token);
      localStorage.setItem("TokenJWT", token);
    }
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
    localStorage.removeItem("isLogged");
    setIsLogged(false);
  };

  return (
    <AuthUserContext.Provider
      value={{
        isLogged,
        user,
        token,
        rol,
        idUser,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserContextProvider;
