import { createContext, useState } from "react";
import { IStories, IStory } from "../interfaces/story";

interface IStoryContext {
  index: number | null;
  setIndex: React.Dispatch<React.SetStateAction<number | null>>;
  stories: IStories | null;
  setStories: React.Dispatch<React.SetStateAction<IStories | null>>;
}

export const StoryContext = createContext<IStoryContext>({
  index: null,
  setIndex: () => null,
  stories: null,
  setStories: () => null,
});

const CreateUpdateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [index, setIndex] = useState<number | null>(null);
  const [stories, setStories] = useState<IStories | null>(null);
  return (
    <StoryContext.Provider
      value={{
        index,
        setIndex,
        stories,
        setStories,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export default CreateUpdateContextProvider;
