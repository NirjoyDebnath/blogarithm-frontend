import React, { useState } from "react";
import TextInput from "../../components/TextInput/textInput";
import Button from "../../components/Button/button";
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
      <div className="flex items-center justify-center h-screen">
        <form className="flex justify-center w-3/5 min-w-400 shadow-xl rounded-md">
          <div className="grid grid-rows-1 place-items-end gap-y-5 bg-white py-10 rounded-md w-300">
            <div className="grid grid-cols-1 place-items-start gap-1">
              <label className="font-bold">Username</label>
              <TextInput
                value={userName}
                onChange={(e) => handleUserNameChange(e)}
                placeHolder="Username*"
              />
            </div>
            <div className="grid grid-cols-1 place-items-start gap-1">
              <label className="font-bold">Password</label>
              <TextInput
                value={password}
                onChange={(e) => handlePasswordChange(e)}
                placeHolder="Password*"
              />
            </div>
            <Button buttonName="Log In" backgroundColor="bg-black" />
          </div>
        </form>
      </div>
    </>
  );
};

export default LogIn;
