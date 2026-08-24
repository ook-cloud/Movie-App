"use client";
import { ArrowDown } from "../icons/ArrowDown";
import { MoonIcon } from "../icons/MoonIcon";
import { Movielogo } from "../icons/Movielogo";
import { SearchIcon } from "../icons/SearchIcon";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronRight } from "../icons/ChevronRight";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2RlYjljY2JlMzU2YjJjOTMxZjRjZWI1OTA4YmQ4NSIsIm5iZiI6MTc4NjU4NTAxNC41MDcsInN1YiI6IjZhN2QxZmI2OGFhNWQzN2ZiNTQ0NTkzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wd9oLUNGObBB7hSw6-cdoMQ2J35kHO-koQ8BCdqOOwQ";

export const Header = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessege, SetErrorMessege] = useState("");
  const router = useRouter();

  const getData = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    const jsonData = await response.json();
    return jsonData.genres;
  };

  useEffect(() => {
    getData()
      .then((data) => setData(data))
      .catch(() => SetErrorMessege("Movie api error"))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [genre, setGenre] = useState(false);

  const JumpToHome = () => {
    router.push("/");
  };

  const HandleGenreDrop = () => {
    setGenre(true);
  };

  const HandleGenreClose = () => {
    setGenre(false);
  };

  return (
    <div className="w-full min-h-[59px] shrink-0 border-b border-zinc-200 bg-white px-6 lg:px-8 xl:px-12 flex justify-center items-center relative z-40">
      <div className="w-full max-w-7xl flex items-center justify-between gap-8">
        <div
          className="flex items-center gap-2 shrink-0 cursor-pointer"
          onClick={JumpToHome}
        >
          <Movielogo />
          <span className="font-bold italic text-lg text-[#4338CA]">
            Movie Z
          </span>
        </div>
        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          <div className="relative">
            <button
              onClick={genre ? HandleGenreDrop : HandleGenreClose}
              className="h-9 flex items-center gap-2 px-3 rounded-md border border-zinc-200 bg-white shadow-sm hover:bg-zinc-50 cursor-pointer text-sm font-medium text-[#18181B]"
            >
              <ArrowDown />
              Genre
            </button>

            {genre && (
              <div className="absolute top-full left-0 mt-2 w-144.25 max-w-[90vw] rounded-lg border border-[#E4E4E7] bg-white p-5 shadow-xl z-50">
                <div className="flex flex-col gap-1">
                  <p className="font-inter font-semibold text-[#09090B] text-[24px] leading-8">
                    Genres
                  </p>
                  <p className="font-inter font-normal text-[#71717A] text-[16px] leading-6">
                    See lists of movies by genre
                  </p>
                </div>

                <div className="w-full h-px bg-[#E4E4E7] my-4" />

                <div className="w-full flex flex-wrap gap-2.5 max-h-55 overflow-y-auto">
                  {data?.map((obj) => (
                    <div
                      key={obj.id}
                      className="flex items-center gap-1.5 rounded-full border border-[#E4E4E7] py-1 px-3 hover:bg-zinc-100 transition-colors cursor-pointer"
                    >
                      <p className="font-inter font-semibold text-[#09090B] text-[12px] leading-4">
                        {obj.name}
                      </p>
                      <ChevronRight />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-9 flex items-center gap-2.5 px-3 rounded-lg border border-zinc-200 bg-white shadow-sm flex-1 min-w-0">
            <SearchIcon />
            <input
              type="text"
              className="w-full min-w-0 text-sm text-[#18181B] bg-transparent outline-none placeholder:text-zinc-400"
              placeholder="Search ..."
            />
          </div>
        </div>

        <div className="w-9 h-9 flex justify-center items-center border border-zinc-200 shadow-sm bg-white rounded-lg shrink-0 cursor-pointer">
          <MoonIcon />
        </div>
      </div>
    </div>
  );
};