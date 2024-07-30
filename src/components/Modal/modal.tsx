import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { createStory } from "../../api/storyAPI";
import { ICreateStoryInput } from "../../interfaces/story";
import Button from "../Button/button";
import { useRef } from "react";
import * as yup from "yup";
interface IModal {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ setModal }: IModal) => {
  const schema: yup.ObjectSchema<ICreateStoryInput> = yup.object().shape({
    Title: yup.string().max(50, "Title must be under 15 charcter").required(),
    Description: yup
      .string()
      .min(10, "Description must be atleast 10 charcter")
      .required(),
  });

  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget === event.target) {
      event.preventDefault();
      if (description.current) description.current.focus();
    }
  };

  const onDivClick = () => {
    setModal(false);
  };

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ICreateStoryInput> = async () => {
    try {
      await createStory({
        Title: title.current!.value,
        Description: description.current!.value,
      });
    } catch (err) {
      console.log("error")
    }
  };

  return (
    <>
      <div
        className="fixed flex h-screen w-screen bg-black bg-opacity-80 items-center justify-center z-20"
        onClick={onDivClick}
      >
        <div
          className="absolute flex flex-col items-center min-w-[288px] w-1/2 h-2/3 bg-white rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <label className="text-4xl font-bold mt-6">Create your story</label>
          <form
            className="grid grid-cols-1 place-items-center w-full h-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col w-full h-full justify-center items-center gap-5">
              <input
                type="text"
                placeholder="Title"
                className="border border-black w-5/6 h-10 p-2"
                onKeyDown={handleKeyPress}
                required
                {...register('Title')}
                ref = {title}
              />
              <textarea
                id=""
                className="border border-black w-5/6 h-60 p-2"
                placeholder="Description"
                {...register('Description')}
                ref = {description}
              ></textarea>
              <div className="flex flex-col items-end w-5/6">
                <Button
                  type="submit"
                  buttonName="Create"
                  backgroundColor="bg-black"
                  textColour="text-white"
                  // handleClick={onSubmit}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
