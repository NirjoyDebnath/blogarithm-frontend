import { UseFormRegister } from "react-hook-form";

interface ITextInput {
  type: string;
  placeHolder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  registerName: string;
  defaultValue?:string;
}

const TextInput = ({ type, placeHolder, register, registerName, defaultValue='' }: ITextInput) => {
  return (
    <input
      className="w-full h-10 rounded-md border border-black bg-white px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-none"
      type={type}
      placeholder={placeHolder}
      {...register(registerName)}
      required
      defaultValue={defaultValue}
    ></input>
  );
};

export default TextInput;
