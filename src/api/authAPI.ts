import {
  ILogInInfo,
  ILogInInput,
  ISignUpInfo,
  ISignUpInput,
} from "../interfaces/auth";
import api from "./initAPI";

export const logIn = async (loginInput: ILogInInput) => {
  try {
    const { UserName, Password }: ILogInInfo = loginInput;
    await api.post("/api/auth/logIn", { UserName, Password });
    console.log("Login SuccessFul");
  } catch (err) {
    console.log("Login UnsuccessFul", err);
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
    console.log("Signup SuccessFul");
  } catch (err) {
    console.log("Signup UnsuccessFul", err);
  }
};
