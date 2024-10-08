import { useContext, useState } from "react";
import Button from "../Button/button";
import { ErrorSuccessContext } from "../../contexts/errorsuccessContext";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../api/userAPI";
import { AxiosError } from "axios";

interface IDeleteConfirmationModal {
  id: string | undefined;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteConfirmationModal = ({
  id,
  setDeleteModal,
}: IDeleteConfirmationModal) => {
  const { setMessage, setType } = useContext(ErrorSuccessContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCancel = () => {
    setDeleteModal(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (id) {
        await deleteUser(id!);
        setType("success");
        setMessage("The account has been deleted");
        navigate("/");
      } else {
        setType("error");
        setMessage("User Doesn't Exists");
      }
    } catch (error) {
      setType("error");
      if (error instanceof AxiosError) {
        setMessage(error.response?.data.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
    setLoading(false);
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
        <div
          className={`mt-4 flex justify-end space-x-2 ${
            loading && "pointer-events-none"
          }`}
        >
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
