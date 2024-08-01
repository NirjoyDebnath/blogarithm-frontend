import { IconSearch } from "@tabler/icons-react";

const Search = () => {
  return (
    <div className="flex rounded-md border border-black focus-within:ring-1 focus-within:ring-black focus-within:border-none w-[250px] sm:w-1/2">
      <input
        className="w-full h-10 rounded-md bg-transparent px-3 py-2 text-sm outline-none placeholder:text-gray-600 focus:outline-none focus:border-none"
        type="text"
        placeholder="Search by Title..."
      ></input>
      <button
        type="button"
        className="flex justify-center items-center text-white bg-black min-w-10 sm:min-w-20 rounded-r-md outline-none"
      >
        {<IconSearch />}
      </button>
    </div>
  );
};

export default Search;
