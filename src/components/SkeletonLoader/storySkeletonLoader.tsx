const StorySkeletonLoader = () => {
  const array12 = Array(12).fill(null);
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(288px,_1fr))] lg:grid-cols-[repeat(3,_minmax(288px,_1fr))] gap-4 place-items-start m-10 mt-5 animate-pulse">
      {array12.map((_x, index) => (
        <div key={index} className="w-full h-full border">
          <div className="w-full bg-gray-300 h-[192px]"></div>
        </div>
        //
      ))}
    </div>
  );
};

export default StorySkeletonLoader;
