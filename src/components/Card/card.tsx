import CardMenu from "./cardMenu";
import {
  IconThumbUp,
  IconThumbUpFilled,
  IconMessageCircle,
  IconDownload,
  IconDotsVertical,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { likeStory, unlikeStory } from "../../api/likeAPI";
import { IStory } from "../../interfaces/story";
import { AxiosError } from "axios";
import { jsPDF } from "jspdf";
import { ENV } from "../../config/env";
import { ShowError } from "../ShowError/showError";
import { format } from "date-fns";
import {
  setCreatedAt,
  setDescription,
  setTitle,
  setUserName,
  setWebnameandpage,
  wrapText,
} from "../../helpers/jsPDFHelper";

interface IStoryCard {
  story: IStory;
  page: "HOME" | "STORY";
}

const Card = ({ story, page }: IStoryCard) => {
  const [cardMenuShow, setCardMenuShow] = useState<boolean>(false);
  const [deleted, setdeleted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | false>(false);
  const [liked, setLiked] = useState(story.userLiked);
  const [likeCount, setLikeCount] = useState(story.likes.length);
  const cardMenuRef = useRef<HTMLDivElement | null>(null);

  const handleThreeDots = () => {
    setCardMenuShow((prev) => !prev);
  };

  const handleLikeStory = () => {
    try {
      if (liked) {
        unlikeStory(story.Id);
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        likeStory(story.Id);
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
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
    if (page === "STORY") return story.slice(1);
    else return story.length > 200 ? story.slice(1, 200) + "..." : story;
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const afterFinish = () => {
    setErrorMessage(false);
  };

  return (
    <>
      {errorMessage && (
        <ShowError
          message={errorMessage}
          time={6000}
          afterFinish={afterFinish}
        ></ShowError>
      )}
      <div
        className={`relative w-full h-full flex flex-col items-start p-4 ${
          page === "HOME" ? "hover:shadow-md" : ""
        }  ${deleted ? "pointer-events-none opacity-50" : ""}`}
      >
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
                setDeleted={setdeleted}
              />
            )}
          </div>
        </div>
        {page === "HOME" ? (
          <Link to={"/" + story.Id} className="flex-none">
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
          to={`${ENV.FRONTEND_SERVER_ENDPOINT}/user/${story.AuthorId}/profile`}
          className="mt-1"
        >
          <p className="text-sm font-semibold text-gray-600 hover:underline mb-1">
            @{story.AuthorUserName}
          </p>
        </Link>
        <label className="text-xs">
          {format(new Date(story.CreatedAt), "yyyy-MM-dd h:mma")}
        </label>

        <div className="mt-5 flex-grow break-words w-full">
          &nbsp;&nbsp;
          <span className="text-xl">{story.Description.charAt(0)}</span>
          {cutStory(story.Description)}
          {story.Description.length > 200 && page === "HOME" && (
            <Link to={"/" + story.Id} className="font-semibold hover:underline">
              Show More
            </Link>
          )}
        </div>

        <div className="flex w-full justify-around pt-3">
          <div className="flex text-gray-500">
            <div className="hover:cursor-pointer" onClick={handleLikeStory}>
              {liked ? <IconThumbUpFilled /> : <IconThumbUp />}
            </div>
            {likeCount}
          </div>
          <Link to={"/" + story.Id} className="flex text-gray-500">
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
