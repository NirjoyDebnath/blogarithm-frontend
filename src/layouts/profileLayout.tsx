import { IconPlus } from "@tabler/icons-react";
import Header from "../components/Header/header";
import Search from "../components/Search/search";
import { getUserId } from "../helpers/jwtHelper";
import { NavLink, Outlet, useParams } from "react-router-dom";

const ProfileLayout = () => {
  const params = useParams<{ id: string }>();
  const userId = getUserId();
  console.log(params.id, userId);

  return (
    <>
      <Header />
      <div className="flex justify-center py-5 border-b-2 gap-3">
        <Search />
        {(params.id ? params.id === userId : false) && (
          <button
            type="button"
            className="flex justify-center items-center text-white bg-black w-[40px] h-[40px] rounded-full outline-none"
          >
            {<IconPlus />}
          </button>
        )}
      </div>
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
