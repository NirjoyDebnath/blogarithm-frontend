import { useState, useEffect } from "react";
import { getStoryById } from "../../api/storyAPI";
import Header from "../../components/Header/header";
import { IStory } from "../../interfaces/story";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/Card/card";

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
            <Card story={story} />
            <div className="flex py-3 border-b rounded-md">
              <textarea
                placeholder="Add a comment..."
                className="w-full pl-1 border border-gray-500 outline-none"
              ></textarea>
              <button
                type="button"
                className={`bg-black text-white px-3 py-2 text-sm font-semibold shadow-sm ${`hover:$bg-black/85`} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all outline-none`}
              >
                Comment
              </button>
            </div>
            <div className="">
              <div className="font-extrabold text-xl m-3">Comments</div>
              <Link to={`user/${story.AuthorId}/profile`} className="mt-1">
                <p className="text-sm text-gray-500 hover:underline">
                  @{story.AuthorUserName}
                </p>
              </Link>
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
