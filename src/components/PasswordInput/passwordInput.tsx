import { IconEye, IconEyeCancel } from "@tabler/icons-react";
import React, { useState } from "react";

interface IPasswordInput {
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  placeHolder: string;
}

const PasswordInput = ({
  type,
  value,
  onChange,
  placeHolder,
}: IPasswordInput) => {
  const [passwordShow, setPasswordShow] = useState(<IconEyeCancel />);

  const handleSetPasswordShow = () => {
    setPasswordShow((prev) =>
      prev === <IconEyeCancel /> ? <IconEye /> : <IconEyeCancel />
    );

    console.log(passwordShow);
  };

  console.log(Date.now());

  return (
    <div className="flex justify-between w-full border border-black rounded-md">
      <input
        className=" h-10 rounded-md bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black"
        type={type}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      ></input>
      <button className="border-l-2 px-2" onClick={handleSetPasswordShow}>
        {passwordShow}
      </button>
    </div>
  );
};

export default PasswordInput;
