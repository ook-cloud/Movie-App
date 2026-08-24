"use client";
import { useState, useEffect } from "react";
import { Down } from "../icons/Down";
import { Moon } from "../icons/Moon";
import { FlimBlue } from "../icons/FlimBlue";
import { Search } from "../icons/Search";
import { useRouter } from "next/navigation";

// 1. API Token зарлаж өгөв
const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjE0NDJiOGUwMTcxN2VlNDliZTU0Njc1ZDIwMmExMiIsIm5iZiI6MTc4NjU4NTA3NS45NDIwMDAyLCJzdWIiOiI2YTdkMWZmMzg4ZjQ0ZGJjMzI0NDU5ODgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FngqDaJnZYi7hYgRF6MBlM_mBw52dkzc72A78xQPoYI";

export const Header = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, SetErrorMessage] = useState("");

  const [inputValue, setInputValue] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const getData = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      { headers: { Authorization: `Bearer ${api_token}` } }
    );
    const jsonData = await response.json();
    return jsonData.results;
  };

  useEffect(() => {
    getData()
      .then((data) => setData(data))
      .catch(() => SetErrorMessage("Movie api error"))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const navigateToHomePage = () => {
    router.push("/");
  };

  const getSearchData = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
        { headers: { Authorization: `Bearer ${api_token}` } }
      );
      const jsonData = await response.json();
      setSearchResults(jsonData.results || []);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    getSearchData(value);
  };

  return (
    <div className="w-full min-h-14.75 shrink-0 border-b border-zinc-200 bg-white px-6 lg:px-8 xl:px-12 flex justify-center items-center relative">
      <div className="w-full max-w-7xl flex items-center justify-between gap-8">
        <div
          className="flex items-center gap-2 shrink-0 cursor-pointer"
          onClick={navigateToHomePage}
        >
          <FlimBlue />
          <span className="font-bold italic text-lg text-[#4338CA]">
            Movie Z
          </span>
        </div>

        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          <div className="h-9 flex items-center gap-2 px-3 rounded-md border border-zinc-200 bg-white shadow-sm shrink-0">
            <Down />
            <button className="text-sm font-medium text-[#18181B] border-none">
              Genre
            </button>
          </div>

          <div className="h-9 flex items-center gap-2.5 px-3 rounded-lg border border-zinc-200 bg-white shadow-sm flex-1 min-w-0">
            <Search />
            <input
              type="text"
              className="w-full min-w-0 text-sm text-[#18181B] bg-transparent outline-none placeholder:text-zinc-400"
              placeholder="Search ..."
              onChange={handleSearchChange}
              value={inputValue}
            />
          </div>
        </div>

        <div className="w-9 h-9 flex justify-center items-center border border-zinc-200 shadow-sm bg-white rounded-lg shrink-0">
          <Moon />
        </div>
      </div>
    </div>
  );
};