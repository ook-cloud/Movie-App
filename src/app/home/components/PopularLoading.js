import React from "react";

export const PopularLoading = () => {
  const skeletons = Array.from({ length: 10 });

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full h-9 flex justify-between items-center animate-pulse">
        <div className="w-32 h-8 bg-gray-300 rounded-md"></div>
        <div className="w-24 h-8 bg-gray-300 rounded-md"></div>
      </div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {skeletons.map((_, index) => (
          <div
            key={index}
            className="w-full flex flex-col rounded-lg gap-2 bg-[#F4F4F5] p-2 animate-pulse"
          >
            <div className="w-full aspect-2/3 bg-gray-300 rounded-md"></div>

            <div className="w-16 h-4 bg-gray-300 rounded mt-1"></div>

            <div className="flex flex-col gap-1.5 mt-1">
              <div className="w-full h-4 bg-gray-300 rounded"></div>
              <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
