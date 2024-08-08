import { jwtDecode } from "jwt-decode";

interface IDecodeToken {
  id: string;
  userName: string;
  name: string;
  role: number;
  iat: number;
  exp: number;
}

export const getToken = (): string | null => {
  const token: string | null = localStorage.getItem("token");
  return token;
};

export const decodeToken = ():IDecodeToken | null=>{
  try {
    const token: string | null = getToken();
    if(!token) return null;
    const decodedToken: IDecodeToken = jwtDecode<IDecodeToken>(token);
    return decodedToken;
  } catch (error) {
    return null;
  }
}

export const getTokenExpire = (): number | null => {
  const decodedToken = decodeToken();

  if(!decodedToken) return null;
  else return decodedToken.exp;
};

export const isTokenExpired = (): boolean => {
  const decodedToken = decodeToken();
  if (decodedToken) return decodedToken.exp < Date.now() / 1000;
  else return true;
};

export const isUserLoggedIn = (): boolean => {
  return !isTokenExpired();
};

export const getUserName = (): string | null => {
  const decodedToken = decodeToken();
  if (decodedToken) return decodedToken.userName;
  else return null;
};

export const getUserId = (): string | null => {
  const decodedToken = decodeToken();
  if (decodedToken) return decodedToken.id;
  else return null;
};

export const getUserRole = (): number | null => {
  const decodedToken = decodeToken();
  if (decodedToken) return decodedToken.role;
  else return null;
};
