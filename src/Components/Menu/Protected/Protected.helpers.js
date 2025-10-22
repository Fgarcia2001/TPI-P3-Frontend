import { jwtDecode } from "jwt-decode";
import { errorToast } from "../../shared/notifications/notification";

export const IsTokenValid = (token) => {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);

    const currentTime = Date.now() / 1000;

    return currentTime < decodedToken.exp;
  } catch (error) {
    errorToast("Error decoding the token");
    return false;
  }
};
