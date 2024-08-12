import { useContext } from "react";
import { getUserName, getUserRole } from "../../helpers/jwtHelper";
import { CreateUpdateDeleteContext } from "../../contexts/createupdatedeleteContext";

interface ICardMenu {
  authorUserName: string;
  storyId: string;
  storyTitle: string;
  storyDescription: string;
  _getHateoas: string;
}

const CardMenu = ({
  authorUserName,
  storyId,
  storyTitle,
  storyDescription,
}: ICardMenu) => {
  const {
    setCreateUpdateModal,
    setTask,
    setStoryId,
    setStoryTitle,
    setStoryDescription,
    setDeleteModal,
  } = useContext(CreateUpdateDeleteContext);

  const userName = getUserName();
  const userRole = getUserRole();

  const handleUpdate = () => {
    setCreateUpdateModal(true);
    setTask("UPDATE");
    setStoryId(storyId);
    setStoryTitle(storyTitle);
    setStoryDescription(storyDescription);
  };

  const handleDelete = () => {
    setStoryId(storyId);
    setDeleteModal(true);
  };

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.toString());
      alert("Text copied to clipboard");
    } catch (err) {
      alert("Failed to copy text");
    }
  };

  return (
    <>
      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg">
        <div className="absolute -top-2 right-1 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-gray-100"></div>
        {(userName === authorUserName || userRole === 1) && (
          <div
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={handleUpdate}
          >
            Update
          </div>
        )}
        {(userName === authorUserName || userRole === 1) && (
          <div
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={handleDelete}
          >
            Delete
          </div>
        )}
        <div
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          onClick={handleCopyLink}
        >
          Copy Link
        </div>
      </div>
    </>
  );
};

export default CardMenu;
