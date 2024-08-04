import { IconPlus } from "@tabler/icons-react";
import Header from "../../components/Header/header";
import { getUserName } from "../../helpers/jwtHelper";
import Card from "../../components/Card/card";
import { getAllStories } from "../../api/storyAPI";
import { useContext, useEffect } from "react";
import { IStory } from "../../interfaces/story";
import Modal from "../../components/Modal/modal";
import { CreateUpdateContext } from "../../contexts/createupdateContext";
import { StoryContext } from "../../contexts/storyContext";
import Search from "../../components/Search/search";

const Home = () => {
  const { task, modal, setModal } =
    useContext(CreateUpdateContext);
  const {stories, setStories} = useContext(StoryContext)

  const userName = getUserName();

  useEffect(() => {
    (async () => {
      try {
        const fetch: IStory[] = await getAllStories();
        console.log(fetch);
        setStories(fetch);
      } catch (error) {}
    })();
  }, []);

  console.log("Home", userName);

  const handleCreateButton = () => {
    setModal(true);
  };

  return (
    <>
      {modal && task=="CREATE" && <Modal />}
      {modal && task=="UPDATE" && <Modal />}
      <Header />
      <div className="flex-grow flex flex-col mb-10">
        <div className="flex justify-center py-5 border-b-2 gap-3">
          <Search/>
          <button
            type="button"
            className="flex justify-center items-center text-white bg-black w-[40px] h-[40px] rounded-full outline-none"
            onClick={handleCreateButton}
          >
            {<IconPlus />}
          </button>
        </div>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center"> */}
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(288px,_1fr))] lg:grid-cols-[repeat(3,_minmax(288px,_1fr))] gap-4 place-items-start m-10 mt-5 ">
          {stories && stories.map((story) => (
            <Card
              key={story.Id}
              title={story.Title}
              id={story.Id}
              authorId={story.AuthorId}
              userName={story.AuthorUserName}
              story={story.Description}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
