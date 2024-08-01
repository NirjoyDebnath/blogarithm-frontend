import { useContext, useEffect, useState } from "react";
import { StoryContext } from "../../contexts/storyContext";
import { getStoryByUserId } from "../../api/storyAPI";
import { IStory } from "../../interfaces/story";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/card";
import { ShowError } from "../../components/ShowError/showError";
import { AxiosError } from "axios";

const ProfileStories = () => {
  const [errorMessage, setErrorMessage] = useState<string | false>(false);
  const params = useParams<{ id: string }>();
  const { stories, setStories } = useContext(StoryContext);

  useEffect(() => {
    (async () => {
      try {
        if (params.id) {
          const fetch: IStory[] = await getStoryByUserId(params.id);
          console.log(fetch);
          setStories(fetch);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(errorMessage);
          setErrorMessage(error.response?.data.message);
          console.log(error.response?.data.message);
        } else {
          console.log("here");
          setErrorMessage("An unexpected error occurred.");
        }
      }
    })();
  }, []);

  const afterFinish = () => {
    setErrorMessage(false);
  };

  return (
    <div>
      {errorMessage && (
        <ShowError
          message={errorMessage}
          time={6000}
          afterFinish={afterFinish}
        ></ShowError>
      )}
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(288px,_1fr))] lg:grid-cols-[repeat(3,_minmax(288px,_1fr))] gap-4 place-items-start m-10 mt-5 ">
        {stories &&
          stories.map((story) => (
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
  );
};

export default ProfileStories;
