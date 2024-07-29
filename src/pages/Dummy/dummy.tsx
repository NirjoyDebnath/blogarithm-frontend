import Header from "../../components/Header/header";

const Dummy = () => {
  console.log("Dummy");
  return (
    <>
      <Header />
      <div className="flex">
      <input
        type="text"
        placeholder="Enter text"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {'buttonText'}
      </button>
    </div>
    </>
  );
};

export default Dummy;
