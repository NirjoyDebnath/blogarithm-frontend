import React, { useState } from "react";
import TextInput from "../../components/TextInput/textInput";
import Button from "../../components/Button/button";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/passwordInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { logIn } from "../../api/authAPI";
import { ILogInInput } from "../../interfaces/auth";
import { ShowError } from "../../components/ShowError/showError";
import { AxiosError } from "axios";

const LogIn: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | false>(false);

  const schema: yup.ObjectSchema<ILogInInput> = yup.object().shape({
    UserName: yup
      .string()
      .matches(/^[a-zA-Z0-9]*$/, "Username can not contain special character")
      .max(15, "Username must be under 15 charcter")
      .required(),
    Password: yup
      .string()
      .max(30, "Password must be under 30 charcter")
      .required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ILogInInput> = async (data: ILogInInput) => {
    try {
      const token: string = await logIn(data);
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.log("in log in error")
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  const afterFinish = () => {
    setErrorMessage(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">Log In</h1>
        <form
          className="grid grid-cols-1 place-items-center w-96 py-10 shadow-xl rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          {errorMessage && (
            <ShowError
              message={errorMessage}
              time={6000}
              afterFinish={afterFinish}
            ></ShowError>
          )}
          <div className="grid place-items-end gap-y-5 w-4/5 bg-white">
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <label className="font-bold">Username</label>
              <TextInput
                type="text"
                placeHolder="Username*"
                register={register}
                registerName="UserName"
              />
            </div>
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <div className="flex justify-between w-full">
                <label className="font-bold">Password</label>
              </div>
              <div className="flex rounded-md outline-none w-full">
                <PasswordInput
                  placeHolder="Password*"
                  register={register}
                  registerName="Password"
                />
              </div>
            </div>
            {/* <Link to=""> */}
            <Button
              type="submit"
              buttonName="Log In"
              backgroundColor="bg-black"
              textColour="text-white"
            />
            {/* </Link> */}
            <div>
              Don't have an account?&nbsp;
              <Link to="/Signup" className="font-bold hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LogIn;
