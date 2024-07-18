import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/button";
import PasswordInput from "../../components/PasswordInput/passwordInput";
import TextInput from "../../components/TextInput/textInput";

const SignUp = () => {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">Sign Up</h1>
        <form className="grid grid-cols-1 place-items-center w-96 py-10 shadow-xl rounded-md">
          <div className="grid place-items-end gap-y-5 w-4/5 bg-white">
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <label className="font-bold">Name</label>
              <TextInput
                type="text"
                value={Name}
                onChange={(e) => handleNameChange(e)}
                placeHolder="Name*"
              />
            </div>
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <label className="font-bold">Email</label>
              <TextInput
                type="text"
                value={email}
                onChange={(e) => handleEmailChange(e)}
                placeHolder="Email*"
              />
            </div>
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
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <div className="flex justify-between w-full">
                <label className="font-bold">Confirm Password</label>
              </div>
              <div className="flex rounded-md outline-none w-full">
                <PasswordInput
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e)}
                  placeHolder="Confirm Password*"
                />
              </div>
            </div>
            <Button
              type="submit"
              buttonName="Sign Up"
              backgroundColor="bg-black"
              textColour="text-white"
            />
            <div>
              Already have an account?&nbsp;
              <Link to="/logIn" className="font-bold hover:underline">
                Log In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
