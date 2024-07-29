import {
  IconThumbUp,
  IconMessageCircle,
  IconDownload,
} from "@tabler/icons-react";
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
  const cutblog = (blog: string) => {
    return blog.length > 200 ? blog.slice(0, 200) + "..." : blog;
  };
  return (
    <>
      <div className="w-96 flex flex-col items-start p-3 hover:shadow-md border">
        <Link to={id} className="flex-none">
          <h2 className="text-2xl font-bold break-words">{title}</h2>
        </Link>
        <Link to="" className="mt-1">
          <p className="text-sm text-gray-500 hover:underline">@{userName}</p>
        </Link>
        <p className="mt-5 flex-grow">
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
