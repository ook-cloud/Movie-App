"use client";

import { useState, useEffect } from "react";
import { Star } from "../icons/Star";
import { UpcomingLoading } from "../home/components/UpcomingLoading";
import { Header } from "../features/Header";
import { Footer } from "../features/Footer";
import { useRouter } from "next/navigation";
import { Previous } from "../icons/Previous";
import { Next } from "../icons/Next";
import { Dots } from "../icons/Dots";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjE0NDJiOGUwMTcxN2VlNDliZTU0Njc1ZDIwMmExMiIsIm5iZiI6MTc4NjU4NTA3NS45NDIwMDAyLCJzdWIiOiI2YTdkMWZmMzg4ZjQ0ZGJjMzI0NDU5ODgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FngqDaJnZYi7hYgRF6MBlM_mBw52dkzc72A78xQPoYI";

export default function UpcomingPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, SetErrorMessage] = useState("");
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    const jsonData = await response.json();
    return jsonData;
  };

  useEffect(() => {
    getData()
      .then((jsonData) => {
        setData(jsonData.results || []);
        setTotalPages(Math.min(jsonData.total_pages || 1, 500));
      })
      .catch(() => SetErrorMessage("Movie api error"))
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  const JumpToDetail = (id) => {
    router.push(`/detail/${id}`);
  };

  const handleNextButton = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrevButton = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen overflow-x-hidden">
      <Header />
      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto flex flex-col flex-1">
        <div className="w-full flex flex-col gap-6 sm:gap-8 mt-6 sm:mt-10 mb-16">
          {loading && <UpcomingLoading />}
          {!loading && errorMessage && (
            <div className="p-8 text-center text-red-500">{errorMessage}</div>
          )}
          {!loading && !errorMessage && (
            <div className="w-full flex flex-col gap-6 sm:gap-8">
              <div className="w-full flex justify-between items-center">
                <h1 className="font-inter font-semibold text-xl sm:text-2xl text-[#09090B] leading-8">
                  Popular
                </h1>
              </div>

              <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                {data.slice(0, 10).map((object) => (
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
                    <div className="flex flex-col p-2.5 sm:p-3 gap-1 flex-1 justify-between">
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
            </div>
          )}

          <div className="w-full flex justify-end mt-4">
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
              <button
                onClick={handlePrevButton}
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
                onClick={handleNextButton}
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
      </main>
      <Footer />
    </div>
  );
}
