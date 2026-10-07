"use client";

import { useEffect, useState } from "react";
import { Footer } from "../features/Footer";
import { Header } from "../features/Header";
import { Star } from "../icons/Star";

import { useParams, useRouter } from "next/navigation";
import { Previous } from "../icons/Previous";
import { Next } from "../icons/Next";
import { Dots } from "../icons/Dots";
import { XIcon } from "../icons/XIcon";
import { SearchLoading } from "../home/components/SearchLoading";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjE0NDJiOGUwMTcxN2VlNDliZTU0Njc1ZDIwMmExMiIsIm5iZiI6MTc4NjU4NTA3NS45NDIwMDAyLCJzdWIiOiI2YTdkMWZmMzg4ZjQ0ZGJjMzI0NDU5ODgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FngqDaJnZYi7hYgRF6MBlM_mBw52dkzc72A78xQPoYI";

export default function SearchDetails() {
  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, SetErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedGenreIds, setSelectedGenreIds] = useState([]);

  const router = useRouter();
  const param = useParams();
  const searchQuery = param?.id ? decodeURIComponent(param.id) : "";

  const getTempData = async () => {
    if (!searchQuery) return { results: [], total_pages: 1, total_results: 0 };
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&language=en-US&page=${page}`,
      { headers: { Authorization: `Bearer ${api_token}` } },
    );

    const jsonData = await response.json();
    return jsonData;
  };

  useEffect(() => {
    getData()
      .then((data) => setData(data))
      .catch(() => SetErrorMessage("Movie api error"));
  }, []);

  useEffect(() => {
    getTempData()
      .then((jsonData) => {
        setTempData(jsonData.results || []);
        setTotalPages(Math.min(jsonData.total_pages || 1, 500));
        setTotalResults(jsonData.total_results || 0);
      })

      .catch(() => SetErrorMessage("Movie api error"))
      .finally(() => {
        setLoading(false);
      });
  }, [searchQuery, page]);

  const JumpToDetail = (id) => {
    router.push(`/detail/${id}`);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleGenreClick = (genreId) => {
    const idNum = Number(genreId);
    if (selectedGenreIds.includes(idNum)) {
      setSelectedGenreIds(selectedGenreIds.filter((id) => id !== idNum));
    } else {
      setSelectedGenreIds([...selectedGenreIds, idNum]);
    }
  };

  const filteredMovies =
    selectedGenreIds.length > 0
      ? tempData.filter((movie) =>
          movie.genre_ids?.some((id) => selectedGenreIds.includes(id)),
        )
      : tempData;

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden min-h-screen">
      <Header />
      <div className="w-full max-w-7xl flex flex-col px-4 sm:px-6 lg:px-8 gap-6 sm:gap-8 mt-6 sm:mt-10 mb-16 flex-1">
        {loading && <SearchLoading />}
        {!loading && errorMessage && (
          <div className="p-8 text-center text-red-500">{errorMessage}</div>
        )}
        {!loading && !errorMessage && (
          <div className="w-full flex flex-col gap-6 sm:gap-8">
            <h1 className="w-full font-inter font-semibold text-2xl sm:text-3xl text-[#09090B]">
              Search results
            </h1>

            <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              <div className="flex-1 w-full flex flex-col gap-6 sm:gap-8 order-2 md:order-1">
                <p className="font-inter font-semibold text-[#09090B] text-base sm:text-lg">
                  {totalResults} titles found for &ldquo;{searchQuery}&rdquo;
                </p>

                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                  {filteredMovies.slice(0, 8).map((object) => (
                    <div
                      key={object.id}
                      className="w-full flex flex-col rounded-lg bg-[#F4F4F5] overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => JumpToDetail(object.id)}
                    >
                      <div className="relative w-full aspect-2/3 bg-zinc-200 shrink-0">
                        <img
                          alt={object.title || "Movie poster"}
                          src={
                            object.poster_path
                              ? "https://image.tmdb.org/t/p/w500" +
                                object.poster_path
                              : "/placeholder.png"
                          }
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="w-full p-2.5 sm:p-3 flex flex-col gap-1 justify-between flex-1">
                        <div className="flex items-center gap-1">
                          <Star />
                          <p className="font-inter font-medium text-xs sm:text-sm text-[#09090B]">
                            {object.vote_average
                              ? object.vote_average.toFixed(1)
                              : "N/A"}
                            <span className="text-[#71717A] text-xs">/10</span>
                          </p>
                        </div>
                        <p className="font-inter font-medium text-xs sm:text-sm text-[#09090B] line-clamp-2 leading-snug">
                          {object.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full flex justify-end mt-4">
                  <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                    <button
                      onClick={handlePrev}
                      disabled={page === 1}
                      className={`h-9 sm:h-10 flex items-center justify-center gap-1 border border-[#E4E4E7] rounded-md py-1 px-2.5 sm:px-3 text-xs sm:text-sm ${
                        page === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer hover:bg-zinc-100"
                      }`}
                    >
                      <Previous />
                      <span className="font-inter font-medium text-[#09090B]">
                        Previous
                      </span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center bg-[#18181B] text-white text-xs sm:text-sm font-medium">
                        {page}
                      </button>
                      {page + 1 < totalPages && (
                        <button
                          onClick={() => setPage(page + 1)}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center hover:bg-zinc-100 text-xs sm:text-sm cursor-pointer"
                        >
                          {page + 1}
                        </button>
                      )}
                      {page + 2 < totalPages && (
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md flex justify-center items-center">
                          <Dots />
                        </div>
                      )}
                      {page < totalPages && (
                        <button
                          onClick={() => setPage(totalPages)}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center hover:bg-zinc-100 text-xs sm:text-sm cursor-pointer"
                        >
                          {totalPages}
                        </button>
                      )}
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={page === totalPages}
                      className={`h-9 sm:h-10 flex items-center justify-center gap-1 border border-[#E4E4E7] rounded-md py-1 px-2.5 sm:px-3 text-xs sm:text-sm ${
                        page === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer hover:bg-zinc-100"
                      }`}
                    >
                      <span className="font-inter font-medium text-[#09090B]">
                        Next
                      </span>
                      <Next />
                    </button>
                  </div>
                </div>
              </div>

              <div className="hidden md:block w-px self-stretch bg-[#E4E4E7]" />

              <div className="w-full md:w-80 flex flex-col gap-4 sm:gap-5 shrink-0 order-1 md:order-2">
                <div className="flex flex-col gap-1">
                  <p className="font-inter font-semibold text-[#09090B] text-lg sm:text-xl">
                    Genres
                  </p>
                  <p className="font-inter font-normal text-[#71717A] text-xs sm:text-sm">
                    Filter search results by genre
                  </p>
                </div>

                <div className="w-full flex flex-wrap gap-2 sm:gap-2.5 max-h-48 md:max-h-96 overflow-y-auto">
                  {data?.map((obj) => {
                    const isSelected = selectedGenreIds.includes(
                      Number(obj.id),
                    );
                    return (
                      <div
                        key={obj.id}
                        onClick={() => handleGenreClick(obj.id)}
                        className={`flex items-center gap-1.5 rounded-full border py-1 px-2.5 sm:px-3 transition-colors cursor-pointer text-xs sm:text-sm ${
                          isSelected
                            ? "bg-[#18181B] text-white border-[#18181B]"
                            : "border-[#E4E4E7] text-[#09090B] hover:bg-zinc-100"
                        }`}
                      >
                        <p className="font-inter font-semibold leading-4">
                          {obj.name}
                        </p>
                        {isSelected ? <XIcon /> : <Next />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
