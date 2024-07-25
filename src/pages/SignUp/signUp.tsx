import { Link } from "react-router-dom";
import Button from "../../components/Button/button";
import PasswordInput from "../../components/PasswordInput/passwordInput";
import TextInput from "../../components/TextInput/textInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const SignUp = () => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[a-zA-Z.\s]*$/, "Name can not contain special character")
      .max(50, "Name must be under 15 charcter"),
    email: yup.string().email("Provide a valid email"),
    userName: yup
      .string()
      .matches(/^[a-zA-Z0-9]*$/, "Username can not contain special character")
      .max(15, "Username must be under 15 charcter"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/,
        "The minimum length of Password is 8 and it must contain atleast one character and one number"
      )
      .max(30, "Password must be under 30 charcter")
      .required(),
    confirmPassword: yup
      .string()
      .test("match", "Password did not match", function (value) {
        return value === this.parent.password;
      })
      .max(30, "Password must be under 30 charcter"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">Sign Up</h1>
        <form
          className="grid grid-cols-1 place-items-center w-96 py-10 shadow-xl rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid place-items-end gap-y-5 w-4/5 bg-white">
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <label className="font-bold">Name</label>
              <TextInput
                type="text"
                placeHolder="Name*"
                register={register}
                registerName="name"
              />
              <p className="text-authWarning text-red-400">{errors.name?.message}</p>
            </div>
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <label className="font-bold">Email</label>
              <TextInput
                type="text"
                placeHolder="Email*"
                register={register}
                registerName="email"
              />
              <p className="text-authWarning text-red-400">{errors.email?.message}</p>
            </div>
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <label className="font-bold">Username</label>
              <TextInput
                type="text"
                placeHolder="Username*"
                register={register}
                registerName="userName"
              />
              <p className="text-authWarning text-red-400">{errors.userName?.message}</p>
            </div>
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <div className="flex justify-between w-full">
                <label className="font-bold">Password</label>
              </div>
              <div className="flex rounded-md outline-none w-full">
                <PasswordInput
                  placeHolder="Password*"
                  register={register}
                  registerName="password"
                />
              </div>
              <p className="text-authWarning text-red-400">{errors.password?.message}</p>
            </div>
            <div className="grid grid-cols-1 w-full place-items-start gap-1">
              <div className="flex justify-between w-full">
                <label className="font-bold">Confirm Password</label>
              </div>
              <div className="flex rounded-md outline-none w-full">
                <PasswordInput
                  placeHolder="Confirm Password*"
                  register={register}
                  registerName="confirmPassword"
                />
              </div>
              <p className="text-authWarning text-red-400">{errors.confirmPassword?.message}</p>
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
