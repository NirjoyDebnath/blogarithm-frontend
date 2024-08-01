import { useState, useEffect } from "react";
import { getStoryById } from "../../api/storyAPI";
import Header from "../../components/Header/header";
import { IStory } from "../../interfaces/story";
import { Link, useParams } from "react-router-dom";
import {
  IconThumbUp,
  IconMessageCircle,
  IconDownload,
} from "@tabler/icons-react";

const Story = () => {
  const [story, setStories] = useState<IStory>();
  const params = useParams<{ id: string }>();
  useEffect(() => {
    (async () => {
      const fetch = await getStoryById(params.id!);
      setStories(fetch);
    })();
  }, [params.id]);
  return (
    <>
      <Header />
      <div className="flex-grow">
        {story ? (
          <>
            <h2 className="text-2xl font-bold break-words flex-none">
              {story.Title}
            </h2>
            <Link to="" className="mt-1">
              <p className="text-sm text-gray-500 hover:underline">
                @{story.AuthorUserName}
              </p>
            </Link>
            <p className="mt-5 flex-grow">{story.Description}</p>
            <div className="flex w-full justify-evenly pt-3">
              <div className="flex text-gray-500">
                <div className="hover:cursor-pointer">{<IconThumbUp />}</div>
                {0}
              </div>
              <div className="flex text-gray-500">
                <div className="hover:cursor-pointer">
                  {<IconMessageCircle />}
                </div>
                {0}
              </div>
              <div className="flex text-gray-500 hover:cursor-pointer">
                {<IconDownload />}
              </div>
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
