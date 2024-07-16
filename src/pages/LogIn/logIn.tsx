import React, { useState } from "react";
import TextInput from "../../components/TextInput/textInput";
import Button from "../../components/Button/button";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/passwordInput";
const LogIn: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Log In</h1>
        <form className="grid grid-cols-1 place-items-center w-96 py-10 shadow-xl rounded-md">
          <div className="grid place-items-end gap-y-5 w-4/5 bg-white">
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <label className="font-bold">Username</label>
              <TextInput
                type="text"
                value={userName}
                onChange={(e) => handleUserNameChange(e)}
                placeHolder="Username*"
              />
            </div>
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <div className="flex justify-between w-full">
                <label className="font-bold">Password</label>
                <Link to="/Signup" className="hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="flex rounded-md outline-none w-full">
                <PasswordInput
                  type="password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e)}
                  placeHolder="Password*"
                />
              </div>
            </div>
            <Button buttonName="Log In" backgroundColor="bg-black" textColour='text-white'/>
            <div>Dont have an account? create one</div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LogIn;
