import {
  ILogInInfo,
  ILogInInput,
  ISignUpInfo,
  ISignUpInput,
} from "../interfaces/auth";
import api from "./initAPI";

export const logIn = async (loginInput: ILogInInput): Promise<string> => {
  try {
    const { UserName, Password }: ILogInInfo = loginInput;
    const res = await api.post("/api/auth/logIn", {
      UserName,
      Password,
    });
    console.log("Login SuccessFul");
    return res.data.data.token;
  } catch (err) {
    console.log("Login UnsuccessFul", err);
    throw new Error((err as Error).message);
  }
};

export const signUp = async (signUpInput: ISignUpInput) => {
  try {
    const { Name, UserName, Email, Password }: ISignUpInfo = signUpInput;
    await api.post("/api/auth/signUp", {
      Name,
      UserName,
      Email,
      Password,
    });
  } catch (err) {
    console.log("Signup UnsuccessFul", err);
  }
};
