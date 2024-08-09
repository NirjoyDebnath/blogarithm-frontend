import React, { useContext } from "react";
import TextInput from "../../components/TextInput/textInput";
import Button from "../../components/Button/button";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/passwordInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { logIn } from "../../api/authAPI";
import { ILogInInput } from "../../interfaces/auth";
import { AxiosError } from "axios";
import { ErrorSuccessContext } from "../../contexts/errorsuccessContext";

interface ILogInModal {
  setLogInModal: React.Dispatch<React.SetStateAction<boolean>>;
  handle: React.RefObject<HTMLDivElement | HTMLButtonElement | undefined>;
}

const LogInModal = ({ setLogInModal, handle }: ILogInModal) => {
  const { setMessage } = useContext(ErrorSuccessContext);

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
      handle.current?.click();
      window.location.reload();
      setLogInModal(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setMessage(error.response?.data.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  const onDivClick = () => {
    setLogInModal(false);
  };

  return (
    <div
      className="fixed inset-0 flex h-screen w-screen bg-black bg-opacity-80 items-center justify-center z-20"
      onClick={onDivClick}
    >
      <div
        className="absolute flex flex-col items-center min-w-[350px] w-1/3 h-2/3 bg-white rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-4xl font-bold pt-10">Log In</h1>
        <form
          className="grid grid-cols-1 place-items-center w-10/12 py-10 shadow-xl rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
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
    </div>
  );
};

export default LogInModal;
