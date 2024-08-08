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
import { format } from "date-fns";

const Story = () => {
  const params = useParams<{ id: string }>();
  const { task, modal } = useContext(CreateUpdateContext);
  const [story, setStory] = useState<IStory | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | false>(false);
  useEffect(() => {
    (async () => {
      try {
        if (params.id) {
          setStory(await getStoryById(params.id));
          setComments(await getCommentsByStoryId(params.id));
        } else {
          setStory(null);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data.message);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      }
    })();
  }, []);
  const schema: yup.ObjectSchema<ICommentInfo> = yup.object().shape({
    Comment: yup.string().required("Please Fill"),
  });

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const afterFinish = () => {
    setErrorMessage(false);
  };

  useEffect(() => {}, [comments]);

  const onSubmit: SubmitHandler<ICommentInfo> = async (data: ICommentInfo) => {
    try {
      if (!story) {
        setErrorMessage("No such story");
      } else {
        const comment: IComment = await commentStory(data, story.Id);
        setComments((prev) => [comment, ...prev]);
        reset()
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message);
      } else {
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
      <div className="w-full flex-grow flex flex-col items-center">
        <div className="flex flex-col w-full md:w-[750px]">
          {story ? (
            <>
              <div className="">
                <Card story={story} page="STORY" />
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex py-3 border-b rounded-md"
              >
                <textarea
                  placeholder="Add a comment..."
                  className="w-full pl-1 border border-gray-500 outline-none resize-none"
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
                {comments?.length ? (
                  <div className="border-b p-4">Comments</div>
                ) : (
                  ""
                )}

                {comments &&
                  comments.map((comment, index) => (
                    <div key={index} className="pl-4 border-b">
                      <Link
                        to={`${ENV.FRONTEND_SERVER_ENDPOINT}/user/${story.AuthorId}/profile`}
                        className="mt-1"
                      >
                        <p className="text-sm text-gray-500 hover:underline pb-1">
                          @{comment.UserName}
                        </p>
                      </Link>
                      <div className="text-xs pb-2 pl-3">
                        {format(
                          new Date(comment.CreatedAt),
                          "yyyy-MM-dd h:mma"
                        )}
                      </div>
                      <p className="pb-3">{comment.Comment}</p>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            "no story found"
          )}
        </div>
      </div>
    </>
  );
};

export default Story;
