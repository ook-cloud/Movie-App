import React from "react";

export const HeroSectionLoading = () => {
  return (
    <div className="relative w-full mt-6 animate-pulse select-none">
      {/* Үндсэн Том Картны Skeleton */}
      <div className="relative w-full h-125 rounded-xl bg-zinc-800 overflow-hidden flex items-end p-8 md:p-16">
        {/* Текст болон контент байрлах хэсэг */}
        <div className="w-full max-w-xl flex flex-col gap-3 pb-6">
          {/* Subtitle ("Now Playing:") */}
          <div className="w-24 h-4 bg-zinc-700 rounded" />

          {/* Гарчиг (Movie Title) */}
          <div className="w-3/4 h-10 md:h-12 bg-zinc-700 rounded-lg" />

          {/* Үнэлгээ (Star & Rating) */}
          <div className="w-20 h-6 bg-zinc-700 rounded" />

          {/* Киноны тайлбар (3 мөр) */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="w-full h-4 bg-zinc-700 rounded" />
            <div className="w-11/12 h-4 bg-zinc-700 rounded" />
            <div className="w-2/3 h-4 bg-zinc-700 rounded" />
          </div>

          {/* Трейлер үзэх товч (Watch Trailer) */}
          <div className="pt-2">
            <div className="w-32 h-9 bg-zinc-700 rounded-md" />
          </div>
        </div>
      </div>

      {/* Доод талын дугуй цэгүүд (Pagination Dots) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        <div className="w-6 h-2 bg-zinc-500 rounded-full" />
        <div className="w-2 h-2 bg-zinc-700 rounded-full" />
        <div className="w-2 h-2 bg-zinc-700 rounded-full" />
        <div className="w-2 h-2 bg-zinc-700 rounded-full" />
        <div className="w-2 h-2 bg-zinc-700 rounded-full" />
      </div>

      {/* Баруун талын Суман Товч (Next Button) */}
      <div className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-zinc-700" />
    </div>
  );
};
