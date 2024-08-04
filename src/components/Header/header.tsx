import { Link } from "react-router-dom";
import Button from "../Button/button";
import { getUserId, isUserLoggedIn } from "../../helpers/jwtHelper";
import { IconUserFilled } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const userLoggedIn = isUserLoggedIn();
  const [dropDown, setDropDown] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);
  const userId = getUserId()

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleIconcUser = () => {
    setDropDown((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex min-h-20 sticky top-0 h-16 bg-gray-100 items-center z-10">
        <Link to="/" className="flex ml-3">
          <img src="\src\images\logo1.jpg" width="30" height="20" alt="" className="rounded-lg"/>
          <div className="text-2xl text-black font-extrabold font-">
            Blogarithm
          </div>
        </Link>
        {/* <Link to="/dummy">
          <div className="text-2xl font-bold text-black">dummy</div>
        </Link> */}
        <div className="flex flex-grow justify-end items-center">
          {userLoggedIn ? (
            <>
              <div className="flex flex-col mt-1" ref={divRef}>
                <div
                  className="p-1 mr-4 bg-gray-400 rounded-full cursor-pointer"
                  onClick={handleIconcUser}
                  
                >
                  <IconUserFilled />
                </div>

                {dropDown && (
                  <div className="absolute right-0 top-16 mt-2 w-48 bg-white border border-gray-300 shadow-lg">
                    <div className="absolute -top-2 right-28 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-white"></div>
                    <Link
                      to={`/user/${userId}/profile`}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                  </div>
                )}
              </div>

              <div className="mr-3">
                <Button
                  type="button"
                  buttonName="Log Out"
                  backgroundColor=""
                  textColour="text-black"
                  handleClick={handleLogout}
                />
              </div>
            </>
          ) : (
            <>
              <Link to="/SignUp" className="mr-3">
                <Button
                  type="button"
                  buttonName="Sign Up"
                  backgroundColor=""
                  textColour="text-black"
                />
              </Link>
              <Link to="/LogIn" className="mr-5">
                <Button
                  type="button"
                  buttonName="Log In"
                  backgroundColor=""
                  textColour="text-black"
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
