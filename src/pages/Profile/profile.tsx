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
  const [state, setState] = useState<"EDITPROFILE" | "UPDATEPASSWORD" | null>(
    null
  );
  const { setMessage, setType } = useContext(ErrorSuccessContext);
  const authorized = isAuthorizedWithToken(params.id);
  const navigate = useNavigate();

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
        setState(null);
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
        setState(null);
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

  const handleEditProfile = () => {
    setState((prev) => (prev === "EDITPROFILE" ? null : "EDITPROFILE"));
  };

  const handleUpdatePassword = () => {
    setState((prev) => (prev === "UPDATEPASSWORD" ? null : "UPDATEPASSWORD"));
  };

  const handleDelete = () => {
    setState(null);
    setDeleteModal(true);
  };

  return (
    <div className="flex-grow flex flex-col bg-gray-300">
      <Header />
      <ProfileNavbar id={params.id} />
      <div className="flex flex-col h-full items-center">
        <div className="flex flex-col items-center max-w-96 h-full">
          <div className="min-w-52 min-h-52 p-5">
            <IconUserFilled className="w-full h-full rounded-full bg-gray-800 text-white" />
          </div>

          <div className="flex flex-col pb-2 items-center">
            <div className="font-semibold text-black sm:text-4xl">
              {user?.Name}
            </div>
            <div className="font-semibold text-gray-800 sm:text-2xl">
              {user && "@"+user.UserName}
            </div>
            <div className="font-semibold text-black sm:text-2xl">
              {user?.Email}
            </div>
          </div>
          {authorized && (
            <div className="flex flex-col w-full gap-1">
              <button
                className="w-full rounded-full border border-gray-500 hover:bg-gray-400 duration-300 p-1"
                onClick={handleEditProfile}
              >
                Edit profile
              </button>
              {state === "EDITPROFILE" && (
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
              )}
              <button
                className="w-full rounded-full border border-gray-500 hover:bg-gray-400 duration-300 p-1"
                onClick={handleUpdatePassword}
              >
                Update password
              </button>
              {state === "UPDATEPASSWORD" && (
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
              )}
              <button
                className="w-full rounded-full border border-gray-500 hover:bg-gray-400 duration-300 p-1"
                onClick={handleDelete}
              >
                Delete account
              </button>
            </div>
          )}
        </div>
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
  );
};

export default Profile;
