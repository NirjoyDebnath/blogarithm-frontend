import { Link, useLocation } from "react-router-dom";
import Button from "../Button/button";
import { getUserId, isUserLoggedIn } from "../../helpers/jwtHelper";
import { IconUserFilled } from "@tabler/icons-react";
import { useRef } from "react";

const Header = () => {
  const location = useLocation();
  const userLoggedIn = isUserLoggedIn();
  const divRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <div className="flex min-h-20 sticky top-0 h-16 bg-gray-100 items-center z-10">
        <Link to="/" className="flex ml-3">
          <img
            src="\images\logo1.jpg"
            width="30"
            height="20"
            alt=""
            className="rounded-lg"
          />
          <div className="text-2xl text-black font-extrabold font-">
            logarithm
          </div>
        </Link>
        <div className="flex flex-grow justify-end items-center">
          {userLoggedIn ? (
            <>
              <div className="flex flex-col mt-1" ref={divRef}>
                <Link
                  to={`/user/${getUserId()}/profile`}
                  className="block mr-4 p-1 text-gray-800 bg-gray-400 rounded-full"
                >
                  <IconUserFilled />
                </Link>
              </div>

              <div className="mr-3">
                <Button
                  type="button"
                  buttonName="Log Out"
                  backgroundColor="bg-black"
                  textColour="text-white"
                  handleClick={handleLogout}
                />
              </div>
            </>
          ) : (
            <>
              <Link state={location} to="/SignUp" className="mr-3">
                <Button
                  type="button"
                  buttonName="Sign Up"
                  backgroundColor="bg-black"
                  textColour="text-white"
                />
              </Link>
              <Link
                state={location.pathname + location.search}
                to="/LogIn"
                className="mr-5"
              >
                <Button
                  type="button"
                  buttonName="Log In"
                  backgroundColor="bg-black"
                  textColour="text-white"
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
