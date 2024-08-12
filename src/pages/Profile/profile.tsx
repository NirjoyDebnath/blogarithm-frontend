import { useContext, useEffect, useState } from "react";
import TextInput from "../../components/TextInput/textInput";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getUserById, updatePassword, updateUserById } from "../../api/userAPI";
import {
  IUpdatePasswordInput,
  IUpdateUserInput,
  IUser,
} from "../../interfaces/user";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import Button from "../../components/Button/button";
import PasswordInput from "../../components/PasswordInput/passwordInput";
import Header from "../../components/Header/header";
import ProfileNavbar from "../../components/Navbar/profileNavbar";
import { ErrorSuccessContext } from "../../contexts/errorsuccessContext";
import { isAuthorizedWithToken } from "../../helpers/authHelper";
import { IconUserFilled } from "@tabler/icons-react";
import DeleteConfirmationModal from "../../components/Modal/deleteUserModal";
import { logIn } from "../../api/authAPI";
import { getUserName } from "../../helpers/jwtHelper";

const Profile = () => {
  const params = useParams<{ id: string }>();
  const [user, setUser] = useState<IUser | null>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [state, setState] = useState<
    "PROFILE" | "EDITPROFILE" | "UPDATEPASSWORD" | "DELETE"
  >("PROFILE");
  const { setMessage, setType } = useContext(ErrorSuccessContext);
  const authorized = isAuthorizedWithToken(params.id);
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        if (params.id) {
          const user = await getUserById(params.id);
          setUser(user);
        } else {
          setType("error");
          setMessage("An unexpected error occurred.");
          navigate("/");
        }
      } catch (error) {
        setType("error");
        if (error instanceof AxiosError) {
          setMessage(error.response?.data.message);
        } else {
          setMessage("An unexpected error occurred.");
        }
        navigate("/");
      }
    })();
  }, [params.id, state]);

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

  const updatePasswordSchema: yup.ObjectSchema<IUpdatePasswordInput> = yup
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
    resolver: yupResolver(updatePasswordSchema),
  });

  const onSubmitEditProfile: SubmitHandler<IUpdateUserInput> = async (
    data: IUpdateUserInput
  ) => {
    try {
      if (params.id) {
        await updateUserById(data, params.id);
        setState("PROFILE");
        setType("success");
        setMessage("Your profile has been updated");
      } else {
        setType("error");
        setMessage("An unexpected error occurred.");
      }
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
  const onSubmitUpdatePassword: SubmitHandler<IUpdatePasswordInput> = async (
    data: IUpdatePasswordInput
  ) => {
    try {
      if (params.id) {
        await updatePassword(data, params.id);
        const token = await logIn({
          UserName: getUserName()!,
          Password: data.NewPassword,
        });
        localStorage.setItem("token", token);
        setState("PROFILE");
        setType("success");
        setMessage("Your password has been updated");
      } else {
        setType("error");
        setMessage("An unexpected error occurred.");
      }
    } catch (error) {
      setType("error");
      if (error instanceof AxiosError) {
        setMessage(error.response?.data.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  const handleProfile = () => {
    setState("PROFILE");
  };

  const handleEditProfile = () => {
    setState("EDITPROFILE");
  };

  const handleUpdatePassword = () => {
    setState("UPDATEPASSWORD");
  };

  const handleDelete = () => {
    setDeleteModal(true);
  };

  return (
    <div className="flex-grow flex flex-col bg-gray-300">
      <Header />
      <ProfileNavbar id={params.id} />
      <div className="flex-grow flex w-full min-h-full">
        <div className="flex border-r">
          <div className="flex flex-col w-36 justify-start">
            <div
              className="cursor-pointer hover:bg-gray-400 p-2 border-b"
              onClick={handleProfile}
            >
              profile
            </div>
            {authorized && (
              <>
                <div
                  className="cursor-pointer hover:bg-gray-400 p-2 border-b"
                  onClick={handleEditProfile}
                >
                  Edit profile
                </div>
                <div
                  className="cursor-pointer hover:bg-gray-400 p-2 border-b"
                  onClick={handleUpdatePassword}
                >
                  Update password
                </div>
                <div
                  className="cursor-pointer hover:bg-gray-400 p-2 border-b"
                  onClick={handleDelete}
                >
                  Delete account
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex-grow bg-gray-200">
          {state === "PROFILE" &&
            (user && (
              <>
                <div className="flex flex-col items-center w-full h-full shadow-lg bg-gray-200">
                  <div className="min-w-52 min-h-52 p-5">
                    <IconUserFilled className="w-full h-full rounded-full bg-gray-800 text-white" />
                  </div>

                  <div className="flex flex-col pb-5 items-center">
                    <div className="font-semibold text-black">{user?.Name}</div>
                    <div className="font-semibold text-gray-800">
                      @{user?.UserName}
                    </div>
                    <div className="font-semibold text-black">
                      {user?.Email}
                    </div>
                  </div>
                </div>
              </>
            ) )}
          {state === "EDITPROFILE" && (
            <div className="p-5">
              <form
                className="grid grid-cols-1 place-items-end max-w-96 gap-2"
                onSubmit={editUserHandleSubmit(onSubmitEditProfile)}
              >
                <div className="grid grid-cols-1 w-full place-items-start gap-1">
                  <label className="font-bold">Name</label>
                  <TextInput
                    type="text"
                    placeHolder="Name"
                    register={editUserRegister}
                    registerName="Name"
                    defaultValue={user?.Name}
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
                    defaultValue={user?.Email}
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
          )}
          {state === "UPDATEPASSWORD" && (
            <div className="p-5">
              <form
                className="grid grid-cols-1 place-items-end max-w-96 gap-2"
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
                  <label className="font-bold">Confirm Password</label>
                  <PasswordInput
                    placeHolder="Confirm Password"
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

          {deleteModal && (
            <div className="p-5">
              <DeleteConfirmationModal
                id={params.id}
                setDeleteModal={setDeleteModal}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
