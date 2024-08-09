import { createContext, useState } from "react";

interface ICreateUpdateDeleteContext {
  createUpdateModal: boolean | null;
  setCreateUpdateModal: React.Dispatch<React.SetStateAction<boolean | null>>;
  deleteModal: boolean | null;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean | null>>;
  task: "UPDATE" | "CREATE" | null;
  setTask: React.Dispatch<React.SetStateAction<"UPDATE" | "CREATE" | null>>;
  storyId: string | null;
  setStoryId: React.Dispatch<React.SetStateAction<string | null>>;
  storyTitle: string | null;
  setStoryTitle: React.Dispatch<React.SetStateAction<string | null>>;
  storyDescription: string | null;
  setStoryDescription: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CreateUpdateDeleteContext =
  createContext<ICreateUpdateDeleteContext>({
    createUpdateModal: null,
    setCreateUpdateModal: () => null,
    deleteModal: null,
    setDeleteModal: () => null,
    task: null,
    setTask: () => null,
    storyId: null,
    setStoryId: () => null,
    storyTitle: null,
    setStoryTitle: () => null,
    storyDescription: null,
    setStoryDescription: () => null,
  });

const CreateUpdateDeleteContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [createUpdateModal, setCreateUpdateModal] = useState<boolean | null>(
    false
  );
  const [deleteModal, setDeleteModal] = useState<boolean | null>(false);
  const [task, setTask] = useState<"UPDATE" | "CREATE" | null>("CREATE");
  const [storyId, setStoryId] = useState<string | null>(null);
  const [storyTitle, setStoryTitle] = useState<string | null>(null);
  const [storyDescription, setStoryDescription] = useState<string | null>(null);
  return (
    <CreateUpdateDeleteContext.Provider
      value={{
        createUpdateModal,
        setCreateUpdateModal,
        deleteModal,
        setDeleteModal,
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
    </CreateUpdateDeleteContext.Provider>
  );
};

export default CreateUpdateDeleteContextProvider;
