import { createContext } from "react";

export const AuthUserContext = createContext({
  user: null,
  token: null,
  rol: null,
  onLogin: () => {},
  onLogout: () => {},
});
