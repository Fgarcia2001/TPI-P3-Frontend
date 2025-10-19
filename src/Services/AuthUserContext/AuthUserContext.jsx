import { createContext } from "react";

export const AuthUserContext = createContext({
  isLogged: null,
  user: null,
  token: null,
  rol: null,
  idUser: null,
  onLogin: () => {},
  onLogout: () => {},
});
