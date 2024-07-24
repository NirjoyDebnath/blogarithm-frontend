import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextInput from "../../components/TextInput/textInput";
import Button from "../../components/Button/button";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/passwordInput";
const LogIn: React.FC = () => {
  const schema = yup.object().shape({
    userName: yup.string().required(),
    password: yup.string().min(4).max(20).required(),
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
            <p>{errors.userName?.message}</p>
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
              <p>{errors.password?.message}</p>
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
