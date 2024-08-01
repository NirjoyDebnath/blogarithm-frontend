import CardMenu from "./cardMenu";
import {
  IconThumbUp,
  IconMessageCircle,
  IconDownload,
  IconDotsVertical,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface IStoryCard {
  title: string;
  userName: string;
  story: string;
  id: string;
  like?: number;
  comment?: number;
}

const Card = ({ title, userName, story, id, like, comment }: IStoryCard) => {
  const [cardMenuShow, setCardMenuShow] = useState<boolean>(false);
  const [deleted, setdeleted] = useState<boolean>(false);
  const cardMenuRef = useRef<HTMLDivElement | null>(null);

  const handleThreeDots = () => {
    setCardMenuShow((prev) => !prev);
  };

  const cutblog = (blog: string) => {
    return blog.length > 200 ? blog.slice(0, 200) + "..." : blog;
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      cardMenuRef.current &&
      !cardMenuRef.current.contains(event.target as Node)
    ) {
      setCardMenuShow(false);
    }
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
        className={`relative w-full h-full flex flex-col items-start p-4 hover:shadow-md border ${
          deleted ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <div className="absolute right-2 top-2 rounded-full" ref={cardMenuRef}>
          <div className="cursor-pointer" onClick={handleThreeDots}>
            <IconDotsVertical />
          </div>
          <div onClick={() => setCardMenuShow(false)}>
            {cardMenuShow && (
              <CardMenu
                authorUserName={userName}
                storyId={id}
                storyTitle={title}
                storyDescription={story}
                setDeleted = {setdeleted}
              />
            )}
          </div>
        </div>
        {/* <div className="absolute"><CardMenu/></div> */}
        <Link to={id} className="flex-none">
          <h2 className="text-2xl font-bold break-words w-full">{title}</h2>
        </Link>
        <Link to="" className="mt-1">
          <p className="text-sm text-gray-500 hover:underline">@{userName}</p>
        </Link>
        <p className="mt-5 flex-grow break-words w-full">
          &nbsp;&nbsp;{cutblog(story)}&nbsp;
          {story.length > 200 && (
            <Link to={id} className="font-semibold hover:underline">
              Show More
            </Link>
          )}
        </p>
        <div className="flex w-full justify-evenly pt-3">
          <div className="flex text-gray-500">
            <div className="hover:cursor-pointer">{<IconThumbUp />}</div>
            {like}
          </div>
          <div className="flex text-gray-500">
            <div className="hover:cursor-pointer">{<IconMessageCircle />}</div>
            {comment}
          </div>
          <div className="flex text-gray-500 hover:cursor-pointer">
            {<IconDownload />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
