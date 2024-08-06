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
import { ENV } from "../../config/env";
import { StoryContext } from "../../contexts/storyContext";

interface IStoryCard {
  story: IStory;
  page: "HOME" | "STORY";
}

const Card = ({ story, page }: IStoryCard) => {
  const [cardMenuShow, setCardMenuShow] = useState<boolean>(false);
  const [deleted, setdeleted] = useState<boolean>(false);
  const [incorrectInfoError, setIncorrectInfoError] = useState(false);
  const [liked, setLiked] = useState(story.userLiked);
  const [likeCount, setLikeCount] = useState(story.likes.length);
  const cardMenuRef = useRef<HTMLDivElement | null>(null);
  const { setIndex } = useContext(StoryContext);

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
      console.log(incorrectInfoError);
      setIncorrectInfoError(true);
      console.log((error as AxiosError).response?.status);
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.textWithLink("Title: " + story.Title, 10, 10, {
      url: ENV.FRONTEND_SERVER_ENDPOINT + `/${story.Id}`,
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(" " + story.CreatedAt.toString(), 10, 17);

    doc.textWithLink(" @" + story.AuthorUserName, 10, 24, {
      url: ENV.FRONTEND_SERVER_ENDPOINT + `/user/${story.AuthorId}/profile`,
    });

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Description: ", 10, 40);
    doc.setFont("helvetica", "normal");
    doc.text(story.Description, 57, 40);

    doc.setFontSize(10);
    const textWidth = doc.getTextWidth("Blogarithm");
    const pageWidth = doc.internal.pageSize.width;
    const x = (pageWidth - textWidth) / 2;
    const y = doc.internal.pageSize.height - 10;
    doc.text("Blogarithm", x, y);

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

  const cutblog = (blog: string) => {
    return blog.length > 200 ? blog.slice(0, 200) + "..." : blog;
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className={`relative w-full h-full flex flex-col items-start p-4 ${
          page === "HOME" ? "hover:shadow-md" : ""
        } border ${deleted ? "pointer-events-none opacity-50" : ""}`}
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
          <Link to={story.Id} className="flex-none">
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
          <p className="text-sm text-gray-500 hover:underline">
            @{story.AuthorUserName}
          </p>
        </Link>
        <label className="text-xs">{story.CreatedAt.toString()}</label>
        <p className="mt-5 flex-grow break-words w-full">
          &nbsp;&nbsp;{cutblog(story.Description)}&nbsp;
          {story.Description.length > 200 && (
            <Link to={story.Id} className="font-semibold hover:underline">
              Show More
            </Link>
          )}
        </p>
        <div className="flex w-full justify-evenly pt-3">
          <div className="flex text-gray-500">
            <div className="hover:cursor-pointer" onClick={handleLikeStory}>
              {liked ? <IconThumbUpFilled /> : <IconThumbUp />}
            </div>
            {likeCount}
          </div>
          <Link to={story.Id} className="flex text-gray-500">
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
