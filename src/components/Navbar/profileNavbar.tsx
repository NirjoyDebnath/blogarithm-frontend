import { NavLink } from 'react-router-dom'
import { isAuthorizedWithToken } from '../../helpers/authHelper'

interface IProfileNavbar{
  id: string | undefined;
}

const ProfileNavbar = ({id}:IProfileNavbar) => {
  return (
    <div className="">
        <div className="flex justify-evenly items-center h-10 w-full bg-gray-800">
          <NavLink
            to={"/user/"+id+"/profile"}
            className={({ isActive }) =>
              `text-white ${isActive ? "font-bold" : ""}`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to={"/user/"+id+"/stories"}
            className={({ isActive }) =>
              `text-white ${isActive ? "font-bold" : ""}`
            }
          >
            Stories
          </NavLink>
          {isAuthorizedWithToken(id) && (
            <NavLink
              to={"/user/"+id+"/update"}
              className={({ isActive }) =>
                `text-white ${isActive ? "font-bold" : ""}`
              }
            >
              Update
            </NavLink>
          )}
        </div>
      </div>
  )
}

export default ProfileNavbar