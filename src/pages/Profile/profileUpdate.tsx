import { useState } from "react";
import TextInput from "../../components/TextInput/textInput";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePassword, updateUserById } from "../../api/userAPI";
import { IUpdatePasswordInput, IUpdateUserInput } from "../../interfaces/user";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import Button from "../../components/Button/button";
import PasswordInput from "../../components/PasswordInput/passwordInput";
import { ShowError } from "../../components/ShowError/showError";

const ProfileUpdate = () => {
  const params = useParams<{ id: string }>();
  const [update, setUpdate] = useState<"PROFILE" | "PASSWORD">("PROFILE");
  const [errorMessage, setErrorMessage] = useState<string | false>(false);

  const editUserSchema: yup.ObjectSchema<IUpdateUserInput> = yup
    .object()
    .shape({
      Name: yup
        .string()
        .matches(/^[a-zA-Z.\s]*$/, "Name can not contain special character")
        .max(50, "Name must be under 15 charcter")
        .required(),
      Email: yup.string().email("Provide a valid email").required(),
    });

  const updatePasswordschema: yup.ObjectSchema<IUpdatePasswordInput> = yup
    .object()
    .shape({
      CurrentPassword: yup
        .string()
        .matches(
          /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/,
          "The minimum length of Password is 8 and it must contain atleast one character and one number"
        )
        .max(30, "Password must be under 30 charcter")
        .required(),
      NewPassword: yup
        .string()
        .matches(
          /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/,
          "The minimum length of Password is 8 and it must contain atleast one character and one number"
        )
        .max(30, "Password must be under 30 charcter")
        .required(),
      NewPasswordAgain: yup
        .string()
        .max(30, "Password must be under 30 charcter")
        .oneOf([yup.ref("NewPassword")], "Password did not match")
        .required(),
    });

  const {
    register: editUserRegister,
    handleSubmit: editUserHandleSubmit,
    formState: { errors: editUserErrors },
  } = useForm<IUpdateUserInput>({
    resolver: yupResolver(editUserSchema),
  });
  const {
    register: updatePasswordRegister,
    handleSubmit: updatePasswordHandleSubmit,
    formState: { errors: updatePasswordErrors },
  } = useForm<IUpdatePasswordInput>({
    resolver: yupResolver(updatePasswordschema),
  });

  const onSubmitEditProfile: SubmitHandler<IUpdateUserInput> = async (
    data: IUpdateUserInput
  ) => {
    try {
      if (params.id) {
        await updateUserById(data, params.id);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(errorMessage);
        setErrorMessage(error.response?.data.message);
        console.log(error.response?.data.message);
      } else {
        console.log("here");
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };
  const onSubmitUpdatePassword: SubmitHandler<IUpdatePasswordInput> = async (
    data: IUpdatePasswordInput
  ) => {
    try {
      if (params.id) {
        await updatePassword(data, params.id);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(errorMessage);
        setErrorMessage(error.response?.data.message);
        console.log(error.response?.data.message);
      } else {
        console.log("here");
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  const afterFinish = () => {
    setErrorMessage(false);
  };

  const handleEditProfile = () => {
    setUpdate("PROFILE");
  };
  const handleUpdatePassword = () => {
    setUpdate("PASSWORD");
  };
  return (
    <div className="flex-grow">
      {errorMessage && (
        <ShowError
          message={errorMessage}
          time={6000}
          afterFinish={afterFinish}
        />
      )}
      <div className="flex w-full h-10 bg-gray-800 items-center justify-evenly">
        <div
          className="text-white text-center cursor-pointer"
          onClick={handleEditProfile}
        >
          Edit profile
        </div>
        <div
          className="text-white text-center cursor-pointer"
          onClick={handleUpdatePassword}
        >
          Update password
        </div>
      </div>
      {update === "PROFILE" ? (
        <div className="p-5">
          <form
            className="grid grid-cols-1 place-items-end w-96 gap-2"
            onSubmit={editUserHandleSubmit(onSubmitEditProfile)}
          >
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <label className="font-bold">Name</label>
              <TextInput
                type="text"
                placeHolder="Name"
                register={editUserRegister}
                registerName="Name"
              />
              <p className="text-authWarning text-red-400">
                {editUserErrors.Name?.message}
              </p>
            </div>
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <label className="font-bold">Email</label>
              <TextInput
                type="text"
                placeHolder="Email"
                register={editUserRegister}
                registerName="Email"
              />
              <p className="text-authWarning text-red-400">
                {editUserErrors.Email?.message}
              </p>
            </div>
            <Button
              type="submit"
              buttonName="Update"
              backgroundColor="bg-black"
              textColour="text-white"
            />
          </form>
        </div>
      ) : (
        <div className="p-5">
          <form
            className="grid grid-cols-1 place-items-end w-96 gap-2"
            onSubmit={updatePasswordHandleSubmit(onSubmitUpdatePassword)}
          >
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <label className="font-bold">Current Password</label>
              <PasswordInput
                placeHolder="Current Password"
                register={updatePasswordRegister}
                registerName="CurrentPassword"
              />
              <p className="text-authWarning text-red-400">
                {updatePasswordErrors.CurrentPassword?.message}
              </p>
            </div>
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <label className="font-bold">New Password</label>
              <PasswordInput
                placeHolder="New Password"
                register={updatePasswordRegister}
                registerName="NewPassword"
              />
              <p className="text-authWarning text-red-400">
                {updatePasswordErrors.NewPassword?.message}
              </p>
            </div>
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <label className="font-bold">New Password</label>
              <PasswordInput
                placeHolder="New Password"
                register={updatePasswordRegister}
                registerName="NewPasswordAgain"
              />
              <p className="text-authWarning text-red-400">
                {updatePasswordErrors.NewPasswordAgain?.message}
              </p>
            </div>
            <Button
              type="submit"
              buttonName="Update"
              backgroundColor="bg-black"
              textColour="text-white"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileUpdate;
