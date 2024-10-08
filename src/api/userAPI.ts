import { getToken } from "../helpers/jwtHelper";
import {
  IUpdatePasswordInfo,
  IUpdatePasswordInput,
  IUpdateUserInput,
  IUser,
} from "../interfaces/user";
import api from "./initAPI";

export const getUserById = async (id: string): Promise<IUser | null> => {
  const res = await api.get(`api/users/${id}`);
  return res.data.data;
};

export const updateUserById = async (
  updateUserInput: IUpdateUserInput,
  id: string
): Promise<boolean | null> => {
  const token = "Bearer " + getToken();
  await api.put(`api/users/${id}`, updateUserInput, {
    headers: { Authorization: token },
  });
  return true;
};

export const updatePassword = async (
  updatePasswordInput: IUpdatePasswordInput,
  id: string
): Promise<boolean | null> => {
  const token = "Bearer " + getToken();
  const updatePasswordInfo: IUpdatePasswordInfo = {
    CurrentPassword: updatePasswordInput.CurrentPassword,
    NewPassword: updatePasswordInput.NewPassword,
  };
  await api.patch(`api/users/${id}`, updatePasswordInfo, {
    headers: { Authorization: token },
  });
  return true;
};

export const deleteUser = async (id: string): Promise<boolean | null> => {
  const token = "Bearer " + getToken();
  await api.patch(`api/users/${id}`, {
    headers: { Authorization: token },
  });
  return true;
};
