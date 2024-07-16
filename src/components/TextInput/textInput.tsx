import React from "react";

interface ITextInput {
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  placeHolder: string;
}

const TextInput = ({type, value, onChange, placeHolder }: ITextInput) => {
  return (
      <input
        className="w-full h-10 rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black"
        type={type}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      ></input>
  );
};

export default TextInput;