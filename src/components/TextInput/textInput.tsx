import { UseFormRegister } from "react-hook-form";

interface ITextInput {
  type: string;
  placeHolder: string;
  register: UseFormRegister<any>;
  registerName: string;
}

const TextInput = ({ type, placeHolder, register, registerName }: ITextInput) => {
  return (
    <input
      className="w-full h-10 rounded-md border border-black bg-white px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-none"
      type={type}
      placeholder={placeHolder}
      // onKeyDown={handleKeyPress}
      {...register(registerName)}
      required
    ></input>
  );
};

export default TextInput;
