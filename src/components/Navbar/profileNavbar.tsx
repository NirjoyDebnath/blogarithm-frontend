import { NavLink } from "react-router-dom";

interface IProfileNavbar {
  id: string | undefined;
}

const ProfileNavbar = ({ id }: IProfileNavbar) => {
  return (
    <div className="">
      <div className="flex justify-evenly items-center h-10 w-full bg-gray-800">
        <NavLink
          to={"/user/" + id + "/profile"}
          className={({ isActive }) =>
            `text-white ${isActive ? "font-bold" : ""}`
          }
        >
          Profile
        </NavLink>
        <NavLink
          to={"/user/" + id + "/stories"}
          className={({ isActive }) =>
            `text-white ${isActive ? "font-bold" : ""}`
          }
        >
          Stories
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileNavbar;
