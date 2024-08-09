import { useContext, useEffect, useState } from "react";
import { StoryContext } from "../../contexts/storyContext";
import { getStoryByUserId } from "../../api/storyAPI";
import { IStories } from "../../interfaces/story";
import {
  NavigateFunction,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Card from "../../components/Card/card";
import { AxiosError } from "axios";
import Pagination from "@mui/material/Pagination";
import Search from "../../components/Search/search";
import { IconPlus } from "@tabler/icons-react";
import { getUserId } from "../../helpers/jwtHelper";
import Header from "../../components/Header/header";
import ProfileNavbar from "../../components/Navbar/profileNavbar";
import { ErrorSuccessContext } from "../../contexts/errorsuccessContext";

const ProfileStories = () => {
  const { setMessage, setType } = useContext(ErrorSuccessContext);
  const params = useParams<{ id: string }>();
  const { stories, setStories } = useContext(StoryContext);
  const navigate: NavigateFunction = useNavigate();
  const [searchParams] = useSearchParams();
  const querySearch = searchParams.get("search");
  const queryPage = searchParams.get("page");
  const [page, setPage] = useState(Number(queryPage) || 1);
  const [search, setSearch] = useState(querySearch || "");
  const userId = getUserId();

  useEffect(() => {
    (async () => {
      try {
        if (params.id) {
          if (search) {
            const fetch: IStories = await getStoryByUserId(
              params.id,
              page,
              search
            );
            setStories(fetch);
          } else {
            const fetch: IStories = await getStoryByUserId(params.id, page);
            setStories(fetch);
          }
        } else {
          setType('error')
          setMessage("An unexpected error occurred.");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          setType('error')
          setMessage(error.response?.data.message);
        } else {
          setType('error')
          setMessage("An unexpected error occurred.");
        }
      }
    })();
  }, [page, search]);

  useEffect(() => {
    setSearch(querySearch || "");
  }, [querySearch]);

  useEffect(() => {
    setPage(Number(queryPage) || 1);
  }, [queryPage]);

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    (async () => {
      try {
        if (params.id) {
          const searchQuery = search ? "&search=" + search : "";
          setPage(page);
          navigate("?page=" + page + searchQuery);
        } else {
          setType('error')
          setMessage("An unexpected error occurred.");
        }
      } catch (error) {
        console.log("something went wrong");
      }
    })();
  };

  return (
    <div className="flex-grow">
      <Header />
      <ProfileNavbar id={params.id!} />
      <div className="flex justify-center py-5 border-b-2 gap-3">
        <Search querySearch={search} />
        {(params.id ? params.id === userId : false) && (
          <button
            type="button"
            className="flex justify-center items-center text-white bg-black w-[40px] h-[40px] rounded-full outline-none"
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
  );
};

export default ProfileStories;
