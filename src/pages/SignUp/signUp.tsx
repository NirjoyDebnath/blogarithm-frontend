import { Link, NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button/button";
import PasswordInput from "../../components/PasswordInput/passwordInput";
import TextInput from "../../components/TextInput/textInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ISignUpInput } from "../../interfaces/auth";
import { logIn, signUp } from "../../api/authAPI";
import { useState } from "react";
import { ShowError } from "../../components/ShowError/showError";
import { AxiosError } from "axios";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState<string | false>(false);
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation()

  const schema: yup.ObjectSchema<ISignUpInput> = yup.object().shape({
    Name: yup
      .string()
      .matches(/^[a-zA-Z.\s]*$/, "Name can not contain special character")
      .max(50, "Name must be under 15 charcter")
      .required(),
    Email: yup.string().email("Provide a valid email").required(),
    UserName: yup
      .string()
      .matches(/^[a-zA-Z0-9]*$/, "Username can not contain special character")
      .max(15, "Username must be under 15 charcter")
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
      navigate("/");
    } catch (error) {
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
        <h1 className="text-4xl font-bold">Sign Up</h1>
        <form
          className="grid grid-cols-1 place-items-center w-96 py-10 shadow-xl rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid place-items-end gap-y-5 w-4/5 bg-white">
            {errorMessage && (
              <ShowError
                message={errorMessage}
                time={6000}
                afterFinish={afterFinish}
              ></ShowError>
            )}
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
            <div>
              Already have an account?&nbsp;
              <Link state={location.state.prev} to="/logIn" className="font-bold hover:underline">
                Log In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
