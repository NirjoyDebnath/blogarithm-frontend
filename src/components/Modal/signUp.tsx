import React, { useContext } from "react";
import TextInput from "../../components/TextInput/textInput";
import Button from "../../components/Button/button";
import PasswordInput from "../../components/PasswordInput/passwordInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { logIn, signUp } from "../../api/authAPI";
import { ISignUpInput } from "../../interfaces/auth";
import { AxiosError } from "axios";
import { ErrorSuccessContext } from "../../contexts/errorsuccessContext";

interface ISignUpModal {
  setSignUpModal: React.Dispatch<React.SetStateAction<boolean>>;
  setLogInModal: React.Dispatch<React.SetStateAction<boolean>>;
  handle: React.RefObject<HTMLDivElement | HTMLButtonElement | undefined>;
}

const SignUpModal = ({ setSignUpModal, setLogInModal, handle }: ISignUpModal) => {
  const { setMessage, setType } = useContext(ErrorSuccessContext);

  const schema: yup.ObjectSchema<ISignUpInput> = yup.object().shape({
    Name: yup
      .string()
      .matches(/^[a-zA-Z.\s]*$/, "Name can not contain special character")
      .max(30, "Name must be under 30 charcter")
      .required(),
    Email: yup.string().email("Provide a valid email").required(),
    UserName: yup
      .string()
      .matches(/^[a-zA-Z0-9]*$/, "Username can not contain special character")
      .max(20, "Username must be under 20 charcter")
      .required(),
    Password: yup
      .string()
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/,
        "The minimum length of Password is 8 and it must contain atleast one character and one number"
      )
      .max(30, "Password must be under 30 charcter")
      .required(),
    ConfirmPassword: yup
      .string()
      .max(30, "Password must be under 30 charcter")
      .oneOf([yup.ref("Password")], "Password did not match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ISignUpInput> = async (data: ISignUpInput) => {
    try {
      await signUp(data);
      const token: string = await logIn(data);
      localStorage.setItem("token", token);
      setType("success");
      setMessage("Sign Up Successful");
      handle.current?.click();
      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        setType("error");
        setMessage(error.response?.data.message);
      } else {
        setType("error");
        setMessage("An unexpected error occurred.");
      }
    }
  };

  const onDivClick = () => {
    setSignUpModal(false);
  };

  const handleLogIn =()=>{
    setSignUpModal(false);
    setLogInModal(true);
  }

  return (
    <div
      className="fixed inset-0 flex h-screen w-screen bg-black bg-opacity-80 items-center justify-center z-20"
      onClick={onDivClick}
    >
      <div
        className="absolute flex flex-col items-center min-w-[350px] w-1/3 bg-white rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-4xl font-bold pt-10">Sign Up</h1>
        <form
          className="grid grid-cols-1 place-items-center w-96 py-10 rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid place-items-end gap-y-5 w-4/5 bg-white">
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <label className="font-bold">Name</label>
              <TextInput
                type="text"
                placeHolder="Name*"
                register={register}
                registerName="Name"
              />
              <p className="text-authWarning text-red-400">
                {errors.Name?.message}
              </p>
            </div>
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <label className="font-bold">Email</label>
              <TextInput
                type="text"
                placeHolder="Email*"
                register={register}
                registerName="Email"
              />
              <p className="text-authWarning text-red-400">
                {errors.Email?.message}
              </p>
            </div>
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <label className="font-bold">Username</label>
              <TextInput
                type="text"
                placeHolder="Username*"
                register={register}
                registerName="UserName"
              />
              <p className="text-authWarning text-red-400">
                {errors.UserName?.message}
              </p>
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
              <p className="text-authWarning text-red-400">
                {errors.Password?.message}
              </p>
            </div>
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <div className="flex justify-between w-full">
                <label className="font-bold">Confirm Password</label>
              </div>
              <div className="flex rounded-md outline-none w-full">
                <PasswordInput
                  placeHolder="Confirm Password*"
                  register={register}
                  registerName="ConfirmPassword"
                />
              </div>
              <p className="text-authWarning text-red-400">
                {errors.ConfirmPassword?.message}
              </p>
            </div>
            <Button
              type="submit"
              buttonName="Sign Up"
              backgroundColor="bg-black"
              textColour="text-white"
            />
            <div className="flex">
              Already have an account?&nbsp;
              <div
                onClick={handleLogIn}
                className="font-bold hover:underline cursor-pointer"
              >
                Log In
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
