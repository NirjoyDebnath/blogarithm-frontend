import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { createStory, getAllStories, updateStory } from "../../api/storyAPI";
import {
  ICreateStoryInfo,
  ICreateStoryInput,
  IStory,
} from "../../interfaces/story";
import Button from "../Button/button";
import * as yup from "yup";
import { useContext } from "react";
import { CreateUpdateDeleteContext } from "../../contexts/createupdatedeleteContext";
import { StoryContext } from "../../contexts/storyContext";
import { getUserId, getUserName } from "../../helpers/jwtHelper";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { ErrorSuccessContext } from "../../contexts/errorsuccessContext";

interface IModal {
  story?: IStory | null;
  setStory?: React.Dispatch<React.SetStateAction<IStory | null>>;
}

const Modal = ({ story, setStory }: IModal) => {
  const navigate = useNavigate();
  const { task, storyId, storyTitle, storyDescription, setCreateUpdateModal } =
    useContext(CreateUpdateDeleteContext);
  const { setMessage, setType } =
    useContext(ErrorSuccessContext);
  const { stories, setStories } = useContext(StoryContext);
  const schema: yup.ObjectSchema<ICreateStoryInput> = yup.object().shape({
    Title: yup.string().max(100, "Title must be under 100 charcter").required(),
    Description: yup
      .string()
      .min(10, "Description must be atleast 10 charcter")
      .required(),
  });

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget === event.target) {
      event.preventDefault();
      const nextElement = document.querySelector("textarea");
      if (nextElement) (nextElement as HTMLTextAreaElement).focus();
    }
  };

  const onDivClick = () => {
    setCreateUpdateModal(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ICreateStoryInput> = async (
    data: ICreateStoryInput
  ) => {
    try {
      if (task == "CREATE") {
        const AuthorId = getUserId();
        const AuthorUserName = getUserName();
        if (!AuthorId || !AuthorUserName) {
          setType('error')
          setMessage("You are not authorized");
        } else {
          const createStoryInfo: ICreateStoryInfo = {
            Title: data.Title,
            Description: data.Description,
          };
          await createStory(createStoryInfo);
          setStories(await getAllStories());
          setType('success')
          setMessage("Your story created successfully");
          navigate("/");
        }
      } else if (task == "UPDATE" && storyId) {
        await updateStory(data, storyId);
        setType('success')
        setMessage("Your story updated successfully");
        if (story && setStory) {
          story.Title = data.Title;
          story.Description = data.Description;
          setStory(story);
        } else if (stories && stories.stories) {
          stories.stories = stories.stories.map((story) => {
            if (story.Id === storyId) {
              story.Title = data.Title;
              story.Description = data.Description;
            }
            return story;
          });
          setStories(stories);
        }
      }
      setCreateUpdateModal(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setType('error')
        setMessage(error.response?.data.message);
      } else {
        setType('error')
        setMessage("An unexpected error occurred.");
      }
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
          <label className="text-2xl font-bold mt-6">
            {task === "CREATE" ? "Create" : "Update"} your story
          </label>
          <p className="text-authWarning text-red-400">
            {errors.Description?.message}
          </p>
          <p className="text-authWarning text-red-400">
            {errors.Title?.message}
          </p>
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
                defaultValue={task==='UPDATE' ? storyTitle||"" : ""}
                required
                {...register("Title")}
              />
              <textarea
                className="border border-black w-5/6 h-60 p-2"
                placeholder="Description"
                defaultValue={(task==='UPDATE') ? storyDescription||"" : ""}
                {...register("Description")}
              ></textarea>
              <div className="flex flex-col items-end w-5/6">
                <Button
                  type="submit"
                  buttonName={task === "CREATE" ? "Create" : "Update"}
                  backgroundColor="bg-black"
                  textColour="text-white"
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
