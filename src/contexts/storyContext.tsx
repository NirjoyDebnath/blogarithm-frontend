import { createContext, useState } from "react";
import { IStories } from "../interfaces/story";

interface IStoryContext {
  index: number | null;
  setIndex: React.Dispatch<React.SetStateAction<number | null>>;
  stories: IStories | null;
  setStories: React.Dispatch<React.SetStateAction<IStories | null>>;
  reset: ()=> void;
}

export const StoryContext = createContext<IStoryContext>({
  index: null,
  setIndex: () => null,
  stories: null,
  setStories: () => null,
  reset: ()=> {}
});

const StoryContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [index, setIndex] = useState<number | null>(null);
  const [stories, setStories] = useState<IStories | null>(null);
  const reset = ()=>{
    setIndex(null);
    setStories(null);
  }

  return (
    <StoryContext.Provider
      value={{
        index,
        setIndex,
        stories,
        setStories,
        reset
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export default StoryContextProvider;