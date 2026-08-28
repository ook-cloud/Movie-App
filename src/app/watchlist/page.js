"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/features/Header";
import { Footer } from "@/features/Footer";
import { useWatchlist } from "@/app/store/useWatchlist";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function WatchlistPage() {
  const router = useRouter();

  // Zustand Store-оос хэрэгтэй өгөгдөл болон үйлдэл (action)-үүдээ дуудаж авах
  const items = useWatchlist((state) => state.items);
  const toggle = useWatchlist((state) => state.toggle);
  const clear = useWatchlist((state) => state.clear);

  const handleMovieClick = (id) => {
    router.push(`/detail/${id}`);
  };

  // Энэ хуудсан дээрх зүрх үргэлж улаан байх ба дарах үед жагсаалтаас хасагдана
  const onHeartClick = (event, movie) => {
    event.preventDefault();
    event.stopPropagation();
    toggle(movie);
  };

  // Хамгийн сүүлд нэмснээ эхэнд нь гаргахын тулд addedAt хугацаагаар нь эрэмбэлэх
  const sortedItems = [...items].sort((a, b) => b.addedAt - a.addedAt);

  return (
    // ШИНЭЧИЛСЭН: bg-white dark:bg-[#0a0a0a] болгож бусад хуудастай ижил болгов
    <div className="w-full min-h-screen flex flex-col items-center bg-white dark:bg-[#0a0a0a]">
      <Header />

      <main className="w-full max-w-[1280px] mx-auto px-4 py-10 flex-grow">
        {items.length === 0 ? (
          /* --- ХООСОН ҮЕИЙН ЗАГВАР (Empty State) --- */
          <div className="flex flex-col items-center justify-center min-h-[320px] text-center">
            <div className="mb-4 text-gray-400 dark:text-[#9A9AA6]">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            {/* ШИНЭЧИЛСЭН: text-gray-900 dark:text-white */}
            <h2 className="text-[18px] font-bold text-gray-900 dark:text-white mb-2">
              Nothing saved yet
            </h2>
            <p className="text-[14px] text-gray-500 dark:text-[#9A9AA6] mb-6">
              Tap the heart on any poster
            </p>
            <button
              onClick={() => router.push("/")}
              className="h-[40px] px-4 bg-[#6C5CE7] hover:bg-indigo-500 text-white rounded-lg font-medium transition"
            >
              Browse movies
            </button>
          </div>
        ) : (
          /* --- КИНО ХАДГАЛСАН ҮЕИЙН ЗАГВАР --- */
          <>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                {/* ШИНЭЧИЛСЭН: text-gray-900 dark:text-white */}
                <h1 className="text-[32px] font-[800] text-gray-900 dark:text-white leading-none tracking-tight">
                  Watchlist
                </h1>
                <p className="text-[14px] font-[500] text-gray-500 dark:text-[#9A9AA6] mt-2">
                  {items.length} movies saved
                </p>
              </div>

              {/* ШИНЭЧИЛСЭН: Border болон текст өнгө нь light/dark mode-д таарч өөрчлөгдөнө */}
              <button
                onClick={clear}
                className="px-4 py-2 text-sm font-medium border rounded-lg transition 
                  text-gray-900 border-gray-300 hover:bg-gray-100 
                  dark:text-white dark:border-white/20 dark:hover:bg-white/10"
              >
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 pb-20">
              {sortedItems.map((movie) => (
                // ШИНЭЧИЛСЭН: bg-[#F9FAFB] dark:bg-gray-900 болгож бусад картуудтай ижил болгов
                <div
                  key={movie.id}
                  onClick={() => handleMovieClick(movie.id)}
                  className="flex flex-col p-2.5 bg-[#F9FAFB] dark:bg-gray-900/50 rounded-xl cursor-pointer hover:shadow-lg transition relative group"
                >
                  <div className="relative w-full aspect-[2/3] mb-3 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
                    <img
                      src={
                        movie.poster_path
                          ? IMG_BASE_URL + movie.poster_path
                          : "/placeholder.jpg"
                      }
                      alt={movie.title}
                      className="object-cover w-full h-full"
                    />

                    {/* Энэ хуудсанд зүрх ҮРГЭЛЖ улаан (Filled) байна */}
                    <button
                      onClick={(e) => onHeartClick(e, movie)}
                      className="absolute top-2 right-2 z-10 w-[26px] h-[26px] rounded-full flex items-center justify-center transition hover:scale-105 border border-white/14 bg-[#F43F5E]"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="white"
                        stroke="white"
                        strokeWidth="2"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-1 mb-1 px-1">
                    <span className="text-yellow-400 text-sm">⭐</span>
                    {/* ШИНЭЧИЛСЭН: text-gray-900 dark:text-white */}
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {movie.vote_average ? movie.vote_average.toFixed(1) : "0"}
                      <span className="text-gray-500 dark:text-[#9A9AA6] text-xs font-normal">
                        /10
                      </span>
                    </span>
                  </div>
                  {/* ШИНЭЧИЛСЭН: text-gray-900 dark:text-white */}
                  <p className="text-sm md:text-base font-bold text-gray-900 dark:text-white px-1 line-clamp-2 leading-snug tracking-wide">
                    {movie.title}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
