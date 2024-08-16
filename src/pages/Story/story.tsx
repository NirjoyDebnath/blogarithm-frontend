import { useState, useEffect, useContext, useRef } from "react";
import { getStoryById } from "../../api/storyAPI";
import Header from "../../components/Header/header";
import { IStory } from "../../interfaces/story";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Card/card";
import { CreateUpdateDeleteContext } from "../../contexts/createupdatedeleteContext";
import CreateUpdateModal from "../../components/Modal/createUpdateModal";
import { ENV } from "../../config/env";
import { commentStory, getCommentsByStoryId } from "../../api/commentAPI";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IComment, ICommentInfo } from "../../interfaces/comment";
import { SubmitHandler, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { ErrorSuccessContext } from "../../contexts/errorsuccessContext";
import DeleteConfirmationModal from "../../components/Modal/deleteStoryModal";
import { isUserLoggedIn } from "../../helpers/jwtHelper";
import LogInModal from "../../components/Modal/logIn";
import SignUpModal from "../../components/Modal/signUp";

const Story = () => {
  const params = useParams<{ id: string }>();
  const { task, createUpdateModal, deleteModal } = useContext(
    CreateUpdateDeleteContext
  );
  const commentRef = useRef<HTMLButtonElement>(null);
  const [story, setStory] = useState<IStory | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const { setMessage, setType } = useContext(ErrorSuccessContext);
  const navigate = useNavigate();
  const [handle, setHandle] =
    useState<React.RefObject<HTMLButtonElement>>(commentRef);
  const [logInModal, setLogInModal] = useState<boolean>(false);
  const [signUpModal, setSignUpModal] = useState<boolean>(false);

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
        setType("error");
        setMessage("Story doesn't exists");
        navigate("/");
      }
    })();
  }, []);
  const schema: yup.ObjectSchema<ICommentInfo> = yup.object().shape({
    Comment: yup.string().required("Please Fill"),
  });

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ICommentInfo> = async (data: ICommentInfo) => {
    try {
      const userLoggedIn = isUserLoggedIn();
      if (!userLoggedIn) {
        setType("error");
        setMessage("Please log in or sign up to comment");
        setHandle(commentRef);
        setLogInModal(true);
      } else if (!story) {
        setType("error");
        setMessage("No such story");
      } else {
        const comment: IComment = await commentStory(data, story.Id);
        setComments((prev) => [comment, ...prev]);
        setStory((prev) => {
          if (prev) {
            return { ...prev, commentCount: prev.commentCount + 1 };
          } else return prev;
        });
        reset();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setType("error");
        setMessage(error.response?.data.message);
      } else {
        setType("error");
        setMessage("An unexpected error occurred.");
      }
    }
  };
  return (
    <>
      {createUpdateModal && task == "UPDATE" && (
        <CreateUpdateModal story={story} setStory={setStory} page="HOME" />
      )}
      {deleteModal && <DeleteConfirmationModal />}

      {logInModal && (
        <LogInModal
          setSignUpModal={setSignUpModal}
          setLogInModal={setLogInModal}
          handle={handle}
        />
      )}
      {signUpModal && (
        <SignUpModal
          setSignUpModal={setSignUpModal}
          setLogInModal={setLogInModal}
          handle={handle}
        />
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
                  ref={commentRef}
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
                    <div
                      key={index}
                      className="flex flex-col pl-4 border-b items-start"
                    >
                      <Link
                        to={`/${ENV.FRONTEND_SERVER_ENDPOINT}/user/${comment.UserId}/profile`}
                        className="mt-1"
                      >
                        <p className="text-sm font-semibold text-gray-600 hover:underline mb-1">
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
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Story;
