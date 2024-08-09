import { getUserId, isUserLoggedIn } from "./jwtHelper";

export const isAuthorizedWithToken = (id:string | undefined): boolean => {
  const userLoggedIn = isUserLoggedIn();
  if (!userLoggedIn || !id) return false;
  const userId = getUserId();
  return id === userId;
};
