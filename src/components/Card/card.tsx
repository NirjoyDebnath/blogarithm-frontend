import CardMenu from "./cardMenu";
import {
  IconThumbUp,
  IconThumbUpFilled,
  IconMessageCircle,
  IconDownload,
  IconDotsVertical,
} from "@tabler/icons-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { likeStory, unlikeStory } from "../../api/likeAPI";
import { IStory } from "../../interfaces/story";
import { AxiosError } from "axios";
import { jsPDF } from "jspdf";
import { format } from "date-fns";
import {
  setCreatedAt,
  setDescription,
  setTitle,
  setUserName,
  setWebnameandpage,
} from "../../helpers/jsPDFHelper";
import { getUserId, isUserLoggedIn } from "../../helpers/jwtHelper";
import { ErrorSuccessContext } from "../../contexts/errorsuccessContext";
import LogInModal from "../Modal/logIn";
import SignUpModal from "../Modal/signUp";

interface IStoryCard {
  story: IStory;
  page: "HOME" | "STORY";
}

const Card = ({ story, page }: IStoryCard) => {
  const userId = getUserId();
  const likeRef = useRef<HTMLDivElement>(null);
  const [cardMenuShow, setCardMenuShow] = useState<boolean>(false);
  const [logInModal, setLogInModal] = useState<boolean>(false);
  const [signUpModal, setSignUpModal] = useState<boolean>(false);
  const { setMessage, setType } = useContext(ErrorSuccessContext);
  const [liked, setLiked] = useState(
    story.likes.some((like) => like.UserId === userId)
  );
  const [likeCount, setLikeCount] = useState(story.likes.length);
  const [handle, setHandle] = useState<React.RefObject<HTMLDivElement>>(likeRef);

  const cardMenuRef = useRef<HTMLDivElement | null>(null);

  const handleThreeDots = () => {
    setCardMenuShow((prev) => !prev);
  };

  const handleLikeStory = async () => {
    try {
      const userLoggedIn = isUserLoggedIn();
      if (!userLoggedIn) {
        setType("error");
        setMessage("Please log in or sign up to like this story");
        setHandle(likeRef);
        setLogInModal(true);
      }
      else if (liked) {
        await unlikeStory(story.Id);
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        await likeStory(story.Id);
        setLiked(true);
        setLikeCount((prev) => prev + 1);
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

  const handleDownload = () => {
    const doc = new jsPDF();
    let currentY: number = 20;

    setWebnameandpage(doc);

    currentY = setTitle(doc, currentY, story.Title, story.Id);
    currentY = setCreatedAt(doc, currentY, story.CreatedAt.toString());
    currentY = setUserName(doc, currentY, story.AuthorUserName, story.AuthorId);
    setDescription(doc, currentY, story.Description);

    doc.save(story.Title + ".pdf");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      cardMenuRef.current &&
      !cardMenuRef.current.contains(event.target as Node)
    ) {
      setCardMenuShow(false);
    }
  };

  const cutStory = (story: string) => {
    if (story.length <= 200) return story.slice(1, story.length);
    else if (page === "STORY") return story.slice(1, story.length);
    else return story.length > 200 ? story.slice(1, 200) + "..." : story;
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {logInModal && <LogInModal setSignUpModal={setSignUpModal} setLogInModal={setLogInModal} handle={handle}/>}
      {signUpModal && <SignUpModal setSignUpModal={setSignUpModal} setLogInModal={setLogInModal} handle={handle}/>}
      <div className={`relative w-full h-full flex flex-col items-start p-4 bg-white ${page === "HOME" && "shadow-md hover:shadow-xl"}`}>
        <div className="absolute right-2 top-2 rounded-full" ref={cardMenuRef}>
          <div className="cursor-pointer" onClick={handleThreeDots}>
            <IconDotsVertical />
          </div>
          <div onClick={() => setCardMenuShow(false)}>
            {cardMenuShow && (
              <CardMenu
                authorUserName={story.AuthorUserName}
                storyId={story.Id}
                storyTitle={story.Title}
                storyDescription={story.Description}
                _getHateoas={story._links[0].href}
              />
            )}
          </div>
        </div>
        {page === "HOME" ? (
          <Link to={"/story/" + story.Id} className="flex-none">
            <h2 className="text-2xl font-bold break-words w-full">
              {story.Title}
            </h2>
          </Link>
        ) : (
          <h2 className="text-2xl font-bold break-words w-full">
            {story.Title}
          </h2>
        )}
        <Link
          to={`/user/${story.AuthorId}/profile`}
          className="mt-1"
        >
          <p className="text-sm font-semibold text-gray-600 hover:underline mb-1">
            @{story.AuthorUserName}
          </p>
        </Link>
        <label className="text-xs">
          {format((story.CreatedAt), "yyyy-MM-dd h:mma")}
        </label>

        <div className="mt-5 flex-grow break-words w-full">
          &nbsp;&nbsp;
          <span className="text-xl">{story.Description.charAt(0)}</span>
          {cutStory(story.Description)}
          {story.Description.length > 200 && page === "HOME" && (
            <Link
              to={"/story/" + story.Id}
              className="font-semibold hover:underline"
            >
              Show More
            </Link>
          )}
        </div>

        <div className="flex w-full justify-around pt-3">
          <div className="flex text-gray-500">
            <div ref = {likeRef} className="hover:cursor-pointer" onClick={handleLikeStory}>
              {liked ? <IconThumbUpFilled /> : <IconThumbUp />}
            </div>
            {likeCount}
          </div>
          <Link to={"/story/" + story.Id} className="flex text-gray-500">
            <div className="hover:cursor-pointer">{<IconMessageCircle />}</div>
            {story.commentCount}
          </Link>
          <button
            className="flex text-gray-500 hover:cursor-pointer"
            onClick={handleDownload}
          >
            {<IconDownload />}
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
