import { createContext, useState } from "react";
import { IStory } from "../interfaces/story";

interface IStoryContext {
  stories: IStory[] | null;
  setStories: React.Dispatch<React.SetStateAction<IStory[] | null>>;
}

export const StoryContext = createContext<IStoryContext>({
  stories: null,
  setStories: () => null,
});

const CreateUpdateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [stories, setStories] = useState<IStory[] | null>(null);
  return (
    <StoryContext.Provider
      value={{
        stories,
        setStories,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export default CreateUpdateContextProvider;
