import { useState, useEffect, useContext } from "react";
import { getStoryById } from "../../api/storyAPI";
import Header from "../../components/Header/header";
import { IStory } from "../../interfaces/story";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/Card/card";
import { CreateUpdateContext } from "../../contexts/createupdateContext";
import Modal from "../../components/Modal/modal";
import { ENV } from "../../config/env";
import { commentStory, getCommentsByStoryId } from "../../api/commentAPI";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IComment, ICommentInfo } from "../../interfaces/comment";
import { SubmitHandler, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { ShowError } from "../../components/ShowError/showError";

const Story = () => {
  const params = useParams<{ id: string }>();
  const { task, modal } = useContext(CreateUpdateContext);
  const [story, setStory] = useState<IStory | null>(null);
  const [comments, setComments] = useState<IComment[] | null>(null);
  useEffect(() => {
    (async () => {
      try {
        if (params.id) {
          setStory(await getStoryById(params.id));
          console.log(await getCommentsByStoryId(params.id));
          setComments(await getCommentsByStoryId(params.id));
        } else {
          setStory(null);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(errorMessage);
          setErrorMessage(error.response?.data.message);
          console.log(error.response?.data.message);
        } else {
          console.log("here");
          setErrorMessage("An unexpected error occurred.");
        }
      }
    })();
  }, []);
  const [errorMessage, setErrorMessage] = useState<string | false>(false);
  const schema: yup.ObjectSchema<ICommentInfo> = yup.object().shape({
    Comment: yup.string().required("Please Fill"),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const afterFinish = () => {
    setErrorMessage(false);
  };

  useEffect(() => {}, []);

  const onSubmit: SubmitHandler<ICommentInfo> = async (data: ICommentInfo) => {
    console.log("here");
    try {
      if (!story) {
        setErrorMessage("No such story");
      } else {
        commentStory(data, story.Id);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(errorMessage);
        setErrorMessage(error.response?.data.message);
        console.log(error.response?.data.message);
      } else {
        console.log("here");
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };
  return (
    <>
      {modal && task == "UPDATE" && <Modal story={story} setStory={setStory} />}
      {errorMessage && (
        <ShowError
          message={errorMessage}
          time={6000}
          afterFinish={afterFinish}
        ></ShowError>
      )}
      <Header />
      <div className="flex-grow">
        {story ? (
          <>
            <Card story={story} page="STORY" />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex py-3 border-b rounded-md"
            >
              <textarea
                placeholder="Add a comment..."
                className="w-full pl-1 border border-gray-500 outline-none"
                required
                {...register("Comment")}
              ></textarea>
              <button
                type="submit"
                className={`bg-black text-white px-3 py-2 text-sm font-semibold shadow-sm ${`hover:$bg-black/85`} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all outline-none`}
              >
                Comment
              </button>
            </form>
            <div className="">
              <div className="border-b p-4">Comments</div>
              {comments &&
                comments.map((comment) => (
                  <div className="pl-4 border-b">
                    <Link
                      to={`${ENV.FRONTEND_SERVER_ENDPOINT}/user/${story.AuthorId}/profile`}
                      className="mt-1"
                    >
                      <p className="text-sm text-gray-500 hover:underline pb-1">
                        @{comment.UserName}
                      </p>
                    </Link>
                    <div className="text-xs pb-2 pl-3">
                      {comment.CreatedAt.toString()}
                    </div>
                    <p className="pl-">{comment.Comment}</p>
                  </div>
                ))}
            </div>
          </>
        ) : (
          "no story found"
        )}
      </div>
    </>
  );
};

export default Story;
