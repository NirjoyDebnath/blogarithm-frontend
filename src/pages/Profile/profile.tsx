import { IconUserFilled } from "@tabler/icons-react";
import { getUserById } from "../../api/userAPI";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IUser } from "../../interfaces/user";
import { ShowError } from "../../components/ShowError/showError";
import { AxiosError } from "axios";

const Profile = () => {
  const [errorMessage, setErrorMessage] = useState<string | false>(false);
  const params = useParams<{ id: string }>();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (params.id) {
          const user = await getUserById(params.id);
          setUser(user);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data.message);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      }
    })();
  }, []);

  const afterFinish = () => {
    setErrorMessage(false);
  };

  return (
    <>
      {errorMessage && (
        <ShowError
          message={errorMessage}
          time={6000}
          afterFinish={afterFinish}
        ></ShowError>
      )}
      <div className="flex-grow min-h-full">
        <div className="flex flex-col sm:flex-row items-center sm:items-start w-full shadow-lg bg-gray-100">
          <div className="min-w-52 min-h-52 p-5">
            <IconUserFilled className="w-full h-full rounded-full bg-gray-800 text-white" />
          </div>

          <div className="flex flex-col p-5 items-center sm:items-start">
            <div className="font-semibold text-gray-800">@{user?.UserName}</div>
            <div className="font-semibold text-black">{user?.Name}</div>
            <div className="font-semibold text-black">{user?.Email}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
