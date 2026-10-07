"use client";
import {
  Sun,
  Moon,
  Film,
  Search,
  ChevronRight,
  Star,
  ArrowRight,
  ChevronDown, // <-- "Down"-ыг "ChevronDown" болгож засав
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "@base-ui/react";
// import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjE0NDJiOGUwMTcxN2VlNDliZTU0Njc1ZDIwMmExMiIsIm5iZiI6MTc4NjU4NTA3NS45NDIwMDAyLCJzdWIiOiI2YTdkMWZmMzg4ZjQ0ZGJjMzI0NDU5ODgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FngqDaJnZYi7hYgRF6MBlM_mBw52dkzc72A78xQPoYI";

export const Header = () => {
  const { theme, setTheme } = useTheme();

  const [data, setData] = useState([]);
  const [event, setEvent] = useState("");
  const router = useRouter();
  const [searchData, setSearchData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [genre, setGenre] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const genreRef = useRef(null);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const getData = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    const jsonData = await response.json();
    return jsonData.genres || [];
  };

  const getSearchData = async () => {
    if (!event.trim()) return [];
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(event)}&language=en-US&page=1`,
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    const jsonData = await response.json();
    return jsonData.results || [];
  };

  useEffect(() => {
    getData()
      .then((genres) => setData(genres))
      .catch(() => {});
  }, []);

  useEffect(() => {
    getSearchData()
      .then((results) => setSearchData(results))
      .catch(() => {});
  }, [event]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (genreRef.current && !genreRef.current.contains(e.target)) {
        setGenre(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target)
      ) {
        setIsSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const JumpToHome = () => {
    router.push("/");
  };

  const JumpToDetail = (id) => {
    setIsSearch(false);
    setIsMobileSearchOpen(false);
    router.push(`/detail/${id}`);
  };

  const EventTaker = (e) => {
    const value = e.target.value;
    setEvent(value);
    setIsSearch(Boolean(value.trim()));
  };

  const JumpToGenre = (id) => {
    setGenre(false);
    router.push(`/genre/${id}`);
  };

  const JumpToSearch = (query) => {
    if (!query || !query.trim()) return;
    setIsSearch(false);
    setIsMobileSearchOpen(false);
    router.push(`/searchDetails/${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="w-full min-h-16 shrink-0 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors px-4 sm:px-6 lg:px-8 xl:px-12 flex justify-center items-center relative z-40">
      <div className="w-full max-w-7xl flex items-center justify-between gap-4 sm:gap-6">
        {/* Logo */}
        <div
          className="flex items-center gap-2 shrink-0 cursor-pointer"
          onClick={JumpToHome}
        >
          <Film />
          <span className="font-bold italic text-base sm:text-lg text-[#4338CA] dark:text-indigo-400">
            Movie Z
          </span>
        </div>

        <div className="flex items-center gap-3 flex-1 max-w-xl md:max-w-2xl justify-end md:justify-start">
          {/* Genre Button */}
          <div className="relative shrink-0" ref={genreRef}>
            <button
              onClick={() => setGenre((prev) => !prev)}
              className="h-9 flex items-center gap-1.5 sm:gap-2 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer text-xs sm:text-sm font-medium text-[#18181B] dark:text-zinc-100 shrink-0 whitespace-nowrap transition-colors"
            >
              <ChevronDown className="w-4 h-4" />{" "}
              {/* <-- Down-ийн оронд ChevronDown ашиглав */}
              Genre
            </button>

            {/* Genre Dropdown */}
            {genre && (
              <div className="fixed inset-x-4 top-18 md:absolute md:top-11 md:left-0 md:inset-x-auto md:w-[576px] max-w-[calc(100vw-2rem)] rounded-xl border border-[#E4E4E7] dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-2xl z-50 transition-colors">
                <div className="flex flex-col gap-1">
                  <p className="font-inter font-semibold text-[#09090B] dark:text-zinc-100 text-lg sm:text-2xl leading-tight">
                    Genres
                  </p>
                  <p className="font-inter font-normal text-[#71717A] dark:text-zinc-400 text-xs sm:text-sm">
                    See lists of movies by genre
                  </p>
                </div>

                <div className="w-full h-px bg-[#E4E4E7] dark:bg-zinc-800 my-3 sm:my-4" />

                <div className="w-full flex flex-wrap gap-2 sm:gap-2.5 max-h-60 overflow-y-auto">
                  {data?.map((obj) => (
                    <div
                      key={obj.id}
                      className="flex items-center gap-1.5 rounded-full border border-[#E4E4E7] dark:border-zinc-800 py-1 px-3 bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                      onClick={() => JumpToGenre(obj.id)}
                    >
                      <p className="font-inter font-semibold text-[#09090B] dark:text-zinc-100 text-xs">
                        {obj.name}
                      </p>
                      <ChevronRight />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Search Button */}
          <button
            onClick={() => setIsMobileSearchOpen((prev) => !prev)}
            aria-label="Open search"
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer shrink-0 text-[#18181B] dark:text-zinc-100"
          >
            <Search />
          </button>

          {/* Desktop Search */}
          <div
            className="hidden md:flex h-9 items-center gap-2.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex-1 min-w-[220px] relative transition-colors"
            ref={searchRef}
          >
            <Search />
            <input
              type="text"
              value={event}
              className="w-full min-w-0 text-sm text-[#18181B] dark:text-zinc-100 bg-transparent outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
              placeholder="Search movies..."
              onChange={EventTaker}
              onKeyDown={(e) => {
                if (e.key === "Enter") JumpToSearch(event);
              }}
            />

            {/* Desktop Search Dropdown */}
            {isSearch && (
              <div className="w-full min-w-[380px] sm:min-w-[480px] flex flex-col bg-white dark:bg-zinc-900 border border-[#E4E4E7] dark:border-zinc-800 shadow-xl rounded-xl p-3 absolute left-0 top-11 z-50">
                <div className="flex flex-col divide-y divide-[#E4E4E7] dark:divide-zinc-800 max-h-96 overflow-y-auto">
                  {searchData.slice(0, 5).map((obj) => (
                    <div
                      key={obj.id}
                      className="flex gap-3 py-2.5 px-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 rounded-lg cursor-pointer transition-colors"
                      onClick={() => JumpToDetail(obj.id)}
                    >
                      <img
                        alt={obj.title || "Movie poster"}
                        src={
                          obj.poster_path
                            ? `https://image.tmdb.org/t/p/w200${obj.poster_path}`
                            : "/placeholder.png"
                        }
                        className="object-cover w-14 h-20 rounded shrink-0 bg-zinc-100 dark:bg-zinc-800"
                      />
                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <p className="font-inter font-semibold text-sm sm:text-base text-[#09090B] dark:text-zinc-100 line-clamp-1">
                            {obj.title}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Star />
                            <p className="font-semibold text-xs sm:text-sm text-[#09090B] dark:text-zinc-100">
                              {obj.vote_average
                                ? obj.vote_average.toFixed(1)
                                : "N/A"}
                              <span className="font-normal text-xs text-zinc-400">
                                /10
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                          <span>{obj.release_date?.slice(0, 4) || "N/A"}</span>
                          <span className="flex items-center gap-1 font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                            See more <ArrowRight />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {searchData.length === 0 && (
                    <div className="p-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
                      No movies found
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="w-full pt-3 pb-1 text-center font-medium text-xs sm:text-sm text-[#09090B] dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer border-t border-[#E4E4E7] dark:border-zinc-800 mt-1"
                  onClick={() => JumpToSearch(event)}
                >
                  {event ? `See all results for "${event}"` : "See all results"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Theme Toggle Button */}
        {/* <ThemeToggle onClick={() => setTheme("dark")} /> */}
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
      </div>

      {/* Mobile Search Dropdown */}
      {isMobileSearchOpen && (
        <div
          ref={mobileSearchRef}
          className="md:hidden absolute inset-x-0 top-16 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 p-3 shadow-md flex flex-col gap-2 z-50"
        >
          <div className="flex items-center gap-2 h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            <Search />
            <input
              type="text"
              value={event}
              autoFocus
              className="w-full text-sm text-[#18181B] dark:text-zinc-100 bg-transparent outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
              placeholder="Search movies..."
              onChange={EventTaker}
              onKeyDown={(e) => {
                if (e.key === "Enter") JumpToSearch(event);
              }}
            />
          </div>

          {isSearch && (
            <div className="flex flex-col divide-y divide-[#E4E4E7] dark:divide-zinc-800 max-h-80 overflow-y-auto mt-1">
              {searchData.slice(0, 5).map((obj) => (
                <div
                  key={obj.id}
                  className="flex gap-3 py-2 px-1 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg cursor-pointer"
                  onClick={() => JumpToDetail(obj.id)}
                >
                  <img
                    alt={obj.title || "Movie poster"}
                    src={
                      obj.poster_path
                        ? `https://image.tmdb.org/t/p/w200${obj.poster_path}`
                        : "/placeholder.png"
                    }
                    className="object-cover w-12 h-16 rounded shrink-0 bg-zinc-100 dark:bg-zinc-800"
                  />
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <p className="font-inter font-semibold text-xs sm:text-sm text-[#09090B] dark:text-zinc-100 line-clamp-1">
                        {obj.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Star />
                        <p className="font-semibold text-xs text-[#09090B] dark:text-zinc-100">
                          {obj.vote_average
                            ? obj.vote_average.toFixed(1)
                            : "N/A"}
                          <span className="font-normal text-[10px] text-zinc-400">
                            /10
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {obj.release_date?.slice(0, 4) || "N/A"}
                    </p>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="w-full py-3 text-center font-medium text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 cursor-pointer border-t border-[#E4E4E7] dark:border-zinc-800 mt-1"
                onClick={() => JumpToSearch(event)}
              >
                {event ? `See all results for "${event}"` : "See all results"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
