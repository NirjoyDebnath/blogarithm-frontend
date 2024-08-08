import { getUserId, isUserLoggedIn } from "./jwtHelper";

export const isAuthorizedWithToken = (id:string): boolean => {
  const userLoggedIn = isUserLoggedIn();
  if (!userLoggedIn) return false;
  const userId = getUserId();
  return id === userId;
};
