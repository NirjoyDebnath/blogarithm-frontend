import { IconSearch } from "@tabler/icons-react";
import Header from "../../components/Header/header";
import { getUserName } from "../../helpers/jwtHelper";
import Card from "../../components/Card/card";
import { getAllStories } from "../../api/storyAPI";
import { useEffect, useState } from "react";
import { IStory } from "../../interfaces/story";

const Home = () => {
  const userName = getUserName();
  const [stories, setStories] = useState<IStory[]>([]);
  useEffect(() => {
    (async () => {
      const fetch = await getAllStories();
      setStories(fetch);
    })();
  }, []);
  console.log("Home", userName);
  return (
    <>
      <Header />
      <div className="flex-grow flex flex-col mb-10">
        <div className="flex justify-center py-5 border-b-2 mx-10">
          <div className="flex rounded-md border border-black focus-within:ring-1 focus-within:ring-black focus-within:border-none w-1/2">
            <input
              className="w-full h-10 rounded-md bg-transparent px-3 py-2 text-sm outline-none placeholder:text-gray-600 focus:outline-none focus:border-none"
              type="text"
              placeholder="Search by Title..."
            ></input>
            <button
              type="button"
              className="flex justify-center items-center text-white bg-black min-w-10 sm:min-w-20 rounded-r-md outline-none"
            >
              {<IconSearch />}
            </button>
          </div>
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center"> */}
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(384px,_1fr))] gap-4 place-items-start m-10 mt-5 mr-24">
          {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            stories.map((story) => (
              <Card
                key={story.Id}
                title={story.Title}
                id={story.Id}
                userName={story.AuthorUserName}
                story={story.Description}
              />
            ))
          }
        </div>
      </div>
    </>
  );
};

export default Home;
