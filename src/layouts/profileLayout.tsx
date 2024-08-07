import Header from "../components/Header/header";
import { getUserId } from "../helpers/jwtHelper";
import { NavLink, Outlet, useParams } from "react-router-dom";

const ProfileLayout = () => {
  const params = useParams<{ id: string }>();
  const userId = getUserId();

  return (
    <>
      <Header />

      <div className="">
        <div className="flex justify-evenly items-center h-10 w-full bg-gray-800">
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `text-white ${isActive ? "font-bold" : ""}`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="stories"
            className={({ isActive }) =>
              `text-white ${isActive ? "font-bold" : ""}`
            }
          >
            Stories
          </NavLink>
          {userId === params.id && (
            <NavLink
              to="update"
              className={({ isActive }) =>
                `text-white ${isActive ? "font-bold" : ""}`
              }
            >
              Update
            </NavLink>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default ProfileLayout;
