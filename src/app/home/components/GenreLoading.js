export const GenreLoading = ({ count = 20 }) => {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2 animate-pulse">
          <div className="relative w-full aspect-[2/3] bg-gray-200 rounded-xl mb-1"></div>
          <div className="w-1/3 h-4 bg-gray-200 rounded-md mt-1"></div>
          <div className="w-3/4 h-5 bg-gray-200 rounded-md"></div>
        </div>
      ))}
    </div>
  );
};
