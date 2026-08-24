"use client";
// zaswar


import { useState, useEffect } from "react";
import { StarIcon2 } from "../icons/StarIcon2";
import { PopularLoading } from "../features/PopularLoading";
import { Header } from "../features/Header";
import { Footer } from "../features/Footer";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "../icons/ChevronLeft";
import { ChevronRight } from "../icons/ChevronRight";
import { ThreeDots } from "../icons/ThreeDots";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2RlYjljY2JlMzU2YjJjOTMxZjRjZWI1OTA4YmQ4NSIsIm5iZiI6MTc4NjU4NTAxNC41MDcsInN1YiI6IjZhN2QxZmI2OGFhNWQzN2ZiNTQ0NTkzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wd9oLUNGObBB7hSw6-cdoMQ2J35kHO-koQ8BCdqOOwQ";

export default function PopularPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessege, SetErrorMessege] = useState("");
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
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
      .catch(() => SetErrorMessege("Movie api error"))
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  const JumpToDetail = (id) => {
    router.push(`/detail/${id}`);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen overflow-x-hidden">
      <Header />
      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto flex flex-col flex-1">
        <div className="w-full flex flex-col gap-6 sm:gap-8 mt-6 sm:mt-10 mb-16">
          {loading && <PopularLoading />}
          {!loading && errorMessege && (
            <div className="p-8 text-center text-red-500">{errorMessege}</div>
          )}
          {!loading && !errorMessege && (
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
                        <StarIcon2 />
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
                onClick={handlePrev}
                disabled={page === 1}
                className={`h-9 sm:h-10 flex items-center justify-center gap-1 border border-[#E4E4E7] rounded-md py-1 px-2.5 sm:px-3 text-xs sm:text-sm ${
                  page === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:bg-zinc-100"
                }`}
              >
                <ChevronLeft />
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
                    <ThreeDots />
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
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}