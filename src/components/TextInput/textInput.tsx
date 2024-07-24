import { UseFormRegister } from "react-hook-form";

interface ITextInput {
  type: string;
  placeHolder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  registerName: string;
}

const TextInput = ({ type, placeHolder, register, registerName }: ITextInput) => {
  // const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter" && event.currentTarget === event.target) {
  //     event.preventDefault();
  //   }
  // };

  return (
    <input
      className="w-full h-10 rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-none"
      type={type}
      placeholder={placeHolder}
      // onKeyDown={handleKeyPress}
      {...register(registerName)}
      required
    ></input>
  );
};

export default TextInput;
