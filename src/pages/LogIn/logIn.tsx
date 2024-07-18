import React, { useState } from "react";
import TextInput from "../../components/TextInput/textInput";
import Button from "../../components/Button/button";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput/passwordInput";
const LogIn: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submitted");

    e.preventDefault();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">Log In</h1>
        <form
          className="grid grid-cols-1 place-items-center w-96 py-10 shadow-xl rounded-md"
          onSubmit={handleSubmit}
        >
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
              </div>
              <div className="flex rounded-md outline-none w-full">
                <PasswordInput
                  value={password}
                  onChange={(e) => handlePasswordChange(e)}
                  placeHolder="Password*"
                />
              </div>
            </div>
            <Button
              type="submit"
              buttonName="Log In"
              backgroundColor="bg-black"
              textColour="text-white"
            />
            <div>
              Don't have an account?&nbsp;
              <Link to="/Signup" className="font-bold hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LogIn;
