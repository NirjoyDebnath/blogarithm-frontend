import React from "react";

interface xp {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  placeHolder: string;
}

const TextInput = ({ value, onChange, placeHolder }: xp) => {
  return (
      <input
        className="flex h-10 rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black"
        type="email"
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      ></input>
  );
};

export default TextInput;
