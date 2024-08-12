import { getUserId, getUserRole, isUserLoggedIn } from "./jwtHelper";

export const isAuthorizedWithToken = (id:string | undefined): boolean => {
  const userLoggedIn = isUserLoggedIn();
  if (!userLoggedIn || !id) return false;
  const userId = getUserId();
  const userRole = getUserRole();
  return (id === userId || userRole === 1);
};
