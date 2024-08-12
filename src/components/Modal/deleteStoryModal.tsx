import { useContext } from "react";
import Button from "../Button/button";
import { CreateUpdateDeleteContext } from "../../contexts/createupdatedeleteContext";
import { deleteStory } from "../../api/storyAPI";
import { ErrorSuccessContext } from "../../contexts/errorsuccessContext";
import { useLocation, useNavigate } from "react-router-dom";

const DeleteConfirmationModal = () => {
  const { storyId, setDeleteModal } = useContext(CreateUpdateDeleteContext);
  const { setMessage, setType } = useContext(ErrorSuccessContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCancel = () => {
    setDeleteModal(false);
  };

  const handleDelete = async () => {
    try {
      if (storyId) {
        await deleteStory(storyId!);
        setType("success");
        setMessage("Story has been deleted");
        if (location.pathname.startsWith("/story")) navigate("/");
        else window.location.reload();
      } else {
        setType("error");
        setMessage("Story Doesn't Exists");
      }
    } catch (error) {
      setType("error");
      setMessage("Problem");
    }
    setDeleteModal(false);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-30"
      onClick={() => setDeleteModal(false)}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-80 w-full"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-800">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 mt-2">
          This action cannot be undone. Please confirm if you want to proceed
          with the deletion.
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <Button
            type="submit"
            buttonName="cancel"
            backgroundColor="bg-gray-200"
            textColour="text-black"
            handleClick={handleCancel}
          />
          <Button
            type="submit"
            buttonName="delete"
            backgroundColor="bg-black"
            textColour="text-white"
            handleClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
