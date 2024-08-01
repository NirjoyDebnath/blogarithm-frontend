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


export const getTokenExpire = (): number | null => {
  const token: string | null = localStorage.getItem("token");
  if (!token) return null;

  const decodedToken: IDecodeToken = jwtDecode<IDecodeToken>(token);
  if (decodedToken) return decodedToken.exp;

  return null;
};

export const isTokenExpired = (): boolean => {
  const token: string | null = localStorage.getItem("token");
  if (!token) return true;

  const decodedToken: IDecodeToken = jwtDecode<IDecodeToken>(token);
  if (decodedToken) {
    return decodedToken.exp < Date.now() / 1000;
  }
  return true;
};

export const isUserLoggedIn = (): boolean => {
  return !isTokenExpired();
};

export const getUserName = (): string|null => {
  const token: string | null = localStorage.getItem("token");
  if (!token) return null;

  const decodedToken: IDecodeToken = jwtDecode<IDecodeToken>(token);
  if (decodedToken) {
    return decodedToken.userName;
  }
  return null;
};

export const getUserId = (): string|null => {
  const token: string | null = localStorage.getItem("token");
  if (!token) return null;

  const decodedToken: IDecodeToken = jwtDecode<IDecodeToken>(token);
  if (decodedToken) {
    return decodedToken.id;
  }
  return null;
};

export const getUserRole = (): number|null => {
  const token: string | null = localStorage.getItem("token");
  if (!token) return null;

  const decodedToken: IDecodeToken = jwtDecode<IDecodeToken>(token);
  if (decodedToken) {
    return decodedToken.role;
  }
  return null;
};
