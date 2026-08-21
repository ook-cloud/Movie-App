import React from "react";

export const TopRatedLoading = () => {
  // 10 ширхэг картны давталт
  const array = Array.from({ length: 10 });

  return (
    <div className="w-full flex flex-col gap-8 animate-pulse">
      {/* Гарчиг болон "See more" хэсгийн Skeleton */}
      <div className="w-full h-9 flex justify-between items-center">
        <div className="w-36 h-8 bg-[#E4E4E7] rounded-md"></div>
        <div className="w-40 h-9 bg-[#E4E4E7] rounded-md"></div>
      </div>

      {/* Кинонуудын Grid хэсгийн Skeleton */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {array.map((_, index) => (
          <div
            key={index}
            className="w-full h-110 flex flex-col rounded-lg gap-1 bg-[#F4F4F5] overflow-hidden"
          >
            {/* Постер зураг ачаалах хэсэг */}
            <div className="w-full h-85px bg-[#E4E4E7]"></div>

            {/* Мэдээллийн хэсэг */}
            <div className="w-full h-23.75 flex flex-col py-2 px-2 justify-between">
              {/* Одон ба үнэлгээний хэсэг */}
              <div className="w-20 h-5 bg-[#E4E4E7] rounded"></div>

              {/* Киноны нэр харагдах мөрүүд */}
              <div className="w-full flex flex-col gap-1.5">
                <div className="w-full h-5 bg-[#E4E4E7] rounded"></div>
                <div className="w-2/3 h-5 bg-[#E4E4E7] rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
