import { IconPlus } from "@tabler/icons-react";
import Header from "../../components/Header/header";
import Card from "../../components/Card/card";
import { getAllStories } from "../../api/storyAPI";
import { useContext, useEffect, useState } from "react";
import { IStories } from "../../interfaces/story";
import CreateUpdateModal from "../../components/Modal/createUpdateModal";
import { CreateUpdateDeleteContext } from "../../contexts/createupdatedeleteContext";
import { StoryContext } from "../../contexts/storyContext";
import Search from "../../components/Search/search";
import Pagination from "@mui/material/Pagination";
import {
  NavigateFunction,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { isUserLoggedIn } from "../../helpers/jwtHelper";
import DeleteConfirmationModal from "../../components/Modal/deleteStoryModal";
import { AxiosError } from "axios";
import { ErrorSuccessContext } from "../../contexts/errorsuccessContext";

const Home = () => {
  const {
    task,
    setTask,
    createUpdateModal,
    setCreateUpdateModal,
    deleteModal,
  } = useContext(CreateUpdateDeleteContext);
  const { stories, setStories } = useContext(StoryContext);
  const [searchParams] = useSearchParams();
  const querySearch = searchParams.get("search");
  const queryPage = searchParams.get("page");
  const [page, setPage] = useState(Number(queryPage) || 1);
  const [search, setSearch] = useState(querySearch || "");
  const navigate: NavigateFunction = useNavigate();
  const { setMessage, setType } = useContext(ErrorSuccessContext);

  useEffect(() => {
    (async () => {
      try {
        if (search) {
          const fetch: IStories = await getAllStories(page, search);
          setStories(fetch);
        } else {
          const fetch: IStories = await getAllStories(page);
          setStories(fetch);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          setType("error");
          setMessage(error.response?.data.message);
        } else {
          setType("error");
          setMessage("An unexpected error occurred.");
        }
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, setStories]);

  useEffect(() => {
    setSearch(querySearch || "");
  }, [querySearch]);

  useEffect(() => {
    setPage(Number(queryPage) || 1);
  }, [queryPage]);

  const handleCreateButton = () => {
    setTask("CREATE");
    setCreateUpdateModal(true);
  };

  const handlePagination = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    (async () => {
      const searchQuery = search ? "&search=" + search : "";
      setPage(page);
      navigate("?page=" + page + searchQuery);
    })();
  };

  return (
    <>
      {createUpdateModal && task == "CREATE" && <CreateUpdateModal />}
      {createUpdateModal && task == "UPDATE" && <CreateUpdateModal />}
      {deleteModal && <DeleteConfirmationModal />}

      <Header />
      <div className="flex-grow flex flex-col pb-10 bg-gray-200">
        <div className="flex justify-center py-5 border-b-2 gap-3 bg-gray-100">
          <Search querySearch={search} />
          {isUserLoggedIn() && (
            <button
              type="button"
              className="flex justify-center items-center text-white bg-black w-[40px] h-[40px] rounded-full outline-none"
              onClick={handleCreateButton}
            >
              {<IconPlus />}
            </button>
          )}
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(288px,_1fr))] lg:grid-cols-[repeat(3,_minmax(288px,_1fr))] gap-4 place-items-start m-10 mt-5">
          {stories?.stories &&
            stories.stories.map((story, index) => (
              <div key={index} className="w-full h-full border">
                <Card key={story.Id} story={story} page="HOME" />
              </div>
              //
            ))}
        </div>
        <div className="flex justify-center mb-5 rounded-full">
          <Pagination
            count={stories?.pageCount}
            onChange={handlePagination}
            page={page}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
