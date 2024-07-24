import React from "react";
import TextInput from "../../components/TextInput/textInput";
import Button from "../../components/Button/button";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/passwordInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
const LogIn: React.FC = () => {
  const schema = yup.object().shape({
    userName: yup
      .string()
      .matches(/^[a-zA-Z0-9]*$/, "Username can not contain special character")
      .max(15, "Username must be under 15 charcter"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/,
        "The minimum length of Password is 8 and it must contain atleast one character and one number"
      )
      .max(30, "Password must be under 30 charcter")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">Log In</h1>
        <form
          className="grid grid-cols-1 place-items-center w-96 py-10 shadow-xl rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid place-items-end gap-y-5 w-4/5 bg-white">
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <label className="font-bold">Username</label>
              <TextInput
                type="text"
                placeHolder="Username*"
                register={register}
                registerName="userName"
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
                  registerName="password"
                />
              </div>
            </div>
            <Button
              type="submit"
              buttonName="Log In"
              backgroundColor="bg-black"
              textColour="text-white"
            />
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
