import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ISearch {
  querySearch: string;
}

const Search = ({ querySearch }: ISearch) => {
  const [search, setSearch] = useState(querySearch || "");

  useEffect(() => {
    setSearch(querySearch || "");
  }, [querySearch]);

  return (
    <div className="flex rounded-md border border-black focus-within:ring-1 focus-within:ring-black focus-within:border-none w-[250px] sm:w-1/2">
      <input
        className="w-full h-10 rounded-md bg-transparent px-3 py-2 text-sm outline-none placeholder:text-gray-600 focus:outline-none focus:border-none"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      ></input>
      <Link
        to={search ? "?page=1&search=" + search : "?page=1"}
        className="flex justify-center items-center text-white bg-black min-w-10 sm:min-w-20 rounded-r-md outline-none"
      >
        {<IconSearch />}
      </Link>
    </div>
  );
};

export default Search;
