import { IconEye, IconEyeCancel } from "@tabler/icons-react";
import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface IPasswordInput {
  placeHolder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  registerName: string;
}

const PasswordInput = ({
  placeHolder,
  register,
  registerName,
}: IPasswordInput) => {
  const [passwordShow, setPasswordShow] = useState({
    state: false,
    icon: <IconEyeCancel />,
    type: "password",
  });

  const handleSetPasswordShow = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    setPasswordShow((prev) => {
      return prev.state === false
        ? { state: true, icon: <IconEye />, type: "text" }
        : { state: false, icon: <IconEyeCancel />, type: "password" };
    });
  };

  // const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter" && event.currentTarget === event.target) {
  //     event.preventDefault();
  //   }
  // };

  return (
    <div className="flex justify-between w-full rounded-md border border-black focus-within:ring-2 focus-within:ring-black focus-within:border-none">
      <input
        className="w-full h-10 rounded-md bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:border-none"
        type={passwordShow.type}
        placeholder={placeHolder}
        // onKeyDown={handleKeyPress}
        {...register(registerName)}
        required
      ></input>
      <button
        type="button"
        className="border-l-2 px-2"
        onClick={handleSetPasswordShow}
      >
        {passwordShow.icon}
      </button>
    </div>
  );
};

export default PasswordInput;
