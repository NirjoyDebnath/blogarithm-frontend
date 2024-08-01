import { createContext, useState } from "react";

interface ICreateupdateContext {
  modal: boolean | null;
  setModal: React.Dispatch<React.SetStateAction<boolean | null>>;
  task: "UPDATE" | "CREATE" | null;
  setTask: React.Dispatch<React.SetStateAction<"UPDATE" | "CREATE" | null>>;
  storyId: string | null;
  setStoryId: React.Dispatch<React.SetStateAction<string | null>>;
  storyTitle: string | null;
  setStoryTitle: React.Dispatch<React.SetStateAction<string | null>>;
  storyDescription: string | null;
  setStoryDescription: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CreateUpdateContext = createContext<ICreateupdateContext>({
  modal: null,
  setModal: () => null,
  task: null,
  setTask: () => null,
  storyId: null,
  setStoryId: () => null,
  storyTitle: null,
  setStoryTitle: () => null,
  storyDescription: null,
  setStoryDescription: () => null,
});

const CreateUpdateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modal, setModal] = useState<boolean | null>(false);
  const [task, setTask] = useState<"UPDATE" | "CREATE" | null>("CREATE");
  const [storyId, setStoryId] = useState<string | null>(null);
  const [storyTitle, setStoryTitle] = useState<string | null>(null);
  const [storyDescription, setStoryDescription] = useState<string | null>(null);
  return (
    <CreateUpdateContext.Provider
      value={{
        modal,
        setModal,
        task,
        setTask,
        storyId,
        setStoryId,
        storyTitle,
        setStoryTitle,
        storyDescription,
        setStoryDescription,
      }}
    >
      {children}
    </CreateUpdateContext.Provider>
  );
};

export default CreateUpdateContextProvider;
