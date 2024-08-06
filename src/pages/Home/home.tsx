import { IconPlus } from "@tabler/icons-react";
import Header from "../../components/Header/header";
import { getUserName } from "../../helpers/jwtHelper";
import Card from "../../components/Card/card";
import { getAllStories } from "../../api/storyAPI";
import { useContext, useEffect, useState } from "react";
import { IStories } from "../../interfaces/story";
import Modal from "../../components/Modal/modal";
import { CreateUpdateContext } from "../../contexts/createupdateContext";
import { StoryContext } from "../../contexts/storyContext";
import Search from "../../components/Search/search";
import Pagination from "@mui/material/Pagination";
import {
  NavigateFunction,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const Home = () => {
  const { task, modal, setModal } = useContext(CreateUpdateContext);
  const { stories, setStories } = useContext(StoryContext);
  const [searchParams] = useSearchParams();
  const querySearch = searchParams.get("search");
  const queryPage = searchParams.get("page");
  const [page, setPage] = useState(Number(queryPage)||1)
  const [search, setSearch] = useState(querySearch||"")
  const navigate: NavigateFunction = useNavigate();

  const userName = getUserName();

  useEffect(() => {
    (async () => {
      try {
        if (search) {
          console.log(search);
          const fetch: IStories = await getAllStories(search, page);
          setStories(fetch);
        } else {
          console.log("nosearch");
          const fetch: IStories = await getAllStories(undefined);
          setStories(fetch);
        }
      } catch (error) {
        console.log("something went wrong");
      }
    })();
  }, [page, search]);

  useEffect(() => {
    setSearch(querySearch||"");
  }, [querySearch]);

  console.log("Home", userName, search);

  const handleCreateButton = () => {
    setModal(true);
  };

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    (async () => {
      try {
        if (search) {
          console.log(search);
          const fetch: IStories = await getAllStories(search, page);
          setStories(fetch);
        } else {
          console.log("nosearch");
          const fetch: IStories = await getAllStories(undefined, page);
          setStories(fetch);
        }
        const searchQuery = search ? "&search=" + search : "";
        setPage(page)
        navigate("?page=" + page + searchQuery);
      } catch (error) {
        console.log("something went wrong");
      }
    })();
  };

  return (
    <>
      {modal && task == "CREATE" && <Modal />}
      {modal && task == "UPDATE" && <Modal />}
      <Header />
      <div className="flex-grow flex flex-col mb-10">
        <div className="flex justify-center py-5 border-b-2 gap-3">
          <Search querySearch={search}/>
          <button
            type="button"
            className="flex justify-center items-center text-white bg-black w-[40px] h-[40px] rounded-full outline-none"
            onClick={handleCreateButton}
          >
            {<IconPlus />}
          </button>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(288px,_1fr))] lg:grid-cols-[repeat(3,_minmax(288px,_1fr))] gap-4 place-items-start m-10 mt-5">
          {stories?.stories &&
            stories.stories.map((story) => (
              <Card key={story.Id} story={story} page="HOME" />
            ))}
        </div>
        <div className="flex justify-center mb-5 rounded-full">
          <Pagination count={stories?.pageCount} onChange={handlePagination} page={page}/>
        </div>
      </div>
    </>
  );
};

export default Home;
