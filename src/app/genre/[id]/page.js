"use client";

import { Header } from "../../features/Header";
import { Footer } from "../../features/Footer";
import { useState, useEffect } from "react";
import {
  useRouter,
  useSearchParams,
  usePathname,
  useParams,
} from "next/navigation";

import { GenreLoading } from "../../home/components/GenreLoading";
import { useWatchlist } from "@/app/store/useWatchlist";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjE0NDJiOGUwMTcxN2VlNDliZTU0Njc1ZDIwMmExMiIsIm5iZiI6MTc4NjU4NTA3NS45NDIwMDAyLCJzdWIiOiI2YTdkMWZmMzg4ZjQ0ZGJjMzI0NDU5ODgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FngqDaJnZYi7hYgRF6MBlM_mBw52dkzc72A78xQPoYI";

export default function GenresMainPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const param = useParams();

  const { items = [], toggle } = useWatchlist();

  const urlGenres = searchParams.get("genres");

  // NaN болон 0 гэсэн утгуудыг устгаж цэвэрлэх
  const initialGenres = urlGenres
    ? urlGenres
        .split(",")
        .map(Number)
        .filter((n) => !isNaN(n) && n !== 0)
    : param?.id && !isNaN(Number(param.id))
      ? [Number(param.id)]
      : [];

  const initialPage = Number(searchParams.get("page")) || 1;

  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState(initialGenres);
  const [page, setPage] = useState(initialPage);

  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);

  const onHeartClick = (event, movie) => {
    event.preventDefault();
    event.stopPropagation();

    if (toggle) {
      toggle({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
      });
    }
  };

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", {
      headers: { Authorization: `Bearer ${api_token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.genres) setGenres(data.genres);
      })
      .catch((err) => console.error("Жанр татахад алдаа гарлаа:", err));
  }, []);

  useEffect(() => {
    // Зөвхөн хүчинтэй тоон утгуудыг шүүж авах
    const validGenres = selectedGenres.filter((n) => !isNaN(n) && n !== 0);

    // Босоо зураас (|) тэмдэгт нь URL-д алдаа заадаг тул encodeURIComponent ашиглан кодлох (%7C болгох)
    const genreIds = encodeURIComponent(validGenres.join("|"));

    const url =
      validGenres.length > 0
        ? `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genreIds}&page=${page}`
        : `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;

    fetch(url, {
      headers: { Authorization: `Bearer ${api_token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("API-аас дата татахад алдаа гарлаа");
        return res.json();
      })
      .then((data) => {
        if (data.results) {
          setMovies(data.results);
          setTotalResults(data.total_results);
          setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
        }
      })
      .catch((err) => {
        console.error("Кино татахад алдаа гарлаа:", err);
        setMovies([]); // Алдаа гарсан үед хоосон харуулах
        setTotalResults(0);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedGenres, page]);

  const updateURL = (newGenres, newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    const validGenres = newGenres.filter((n) => !isNaN(n) && n !== 0);

    if (validGenres.length > 0) {
      params.set("genres", validGenres.join(","));
    } else {
      params.delete("genres");
    }

    if (newPage > 1) {
      params.set("page", newPage.toString());
    } else {
      params.delete("page");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const toggleGenre = (id) => {
    let updatedGenres;
    if (selectedGenres.includes(id)) {
      updatedGenres = selectedGenres.filter((genreId) => genreId !== id);
    } else {
      updatedGenres = [...selectedGenres, id];
    }

    setSelectedGenres(updatedGenres);
    setPage(1);
    setLoading(true);
    updateURL(updatedGenres, 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setLoading(true);
    updateURL(selectedGenres, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedGenreNames = genres
    .filter((g) => selectedGenres.includes(g.id))
    .map((g) => g.name)
    .join(", ");

  const handleMovieClick = (movieId) => {
    router.push(`/detail/${movieId}`);
  };

  const getPaginationNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const endPage = page + 6;

    if (endPage >= totalPages) {
      if (page + 3 >= totalPages) {
        const pages = [];
        for (let i = page; i <= totalPages; i++) {
          pages.push(i);
        }
        return pages;
      }
      return [page, page + 1, page + 2, "...", totalPages];
    }

    return [page, page + 1, page + 2, "...", endPage];
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white dark:bg-[#0a0a0a]">
      <Header />

      <main className="flex flex-col lg:flex-row w-full max-w-[1280px] px-4 py-8 flex-grow gap-8 lg:gap-12 dark:bg-[#0a0a0a]">
        <aside className="w-full lg:w-1/4">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl lg:mb-6">
            Search filter
          </h2>
          <div className="mb-6 lg:mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Search by genre
            </h3>
            <p className="mb-4 text-sm text-gray-800 dark:text-gray-300 lg:mb-6">
              See lists of movies by genre
            </p>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => {
                const isSelected = selectedGenres.includes(genre.id);
                return (
                  <button
                    key={genre.id}
                    onClick={() => toggleGenre(genre.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-colors border rounded-full ${
                      isSelected
                        ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                        : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100 dark:bg-transparent dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800"
                    }`}
                  >
                    {genre.name}
                    {isSelected ? (
                      <span className="text-xs">&#10005;</span>
                    ) : (
                      <span className="font-bold text-gray-500 dark:text-gray-400">
                        &rsaquo;
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <section className="w-full lg:w-3/4">
          <div className="mb-6 min-h-[30px]">
            {loading ? (
              <div className="w-1/2 h-7 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
            ) : (
              <h2 className="text-[20px] font-bold text-gray-900 dark:text-white">
                {selectedGenres.length > 0
                  ? `${totalResults} titles in "${selectedGenreNames}"`
                  : `${totalResults} popular titles`}
              </h2>
            )}
          </div>

          {loading ? (
            <GenreLoading count={20} />
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {movies.map((movie) => {
                const saved = items.some((item) => item.id === movie.id);
                return (
                  <div
                    key={movie.id}
                    className="flex flex-col cursor-pointer group relative"
                    onClick={() => handleMovieClick(movie.id)}
                  >
                    <div className="relative w-full aspect-[2/3] overflow-hidden rounded-xl mb-3 bg-gray-100 dark:bg-gray-800">
                      <img
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        alt={movie.title}
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "https://via.placeholder.com/500x750?text=No+Image"
                        }
                      />
                      <button
                        onClick={(e) => onHeartClick(e, movie)}
                        className="absolute top-2 right-2 z-10 w-[28px] h-[28px] rounded-full flex items-center justify-center transition hover:scale-110 border border-white/20 shadow-md"
                        style={{
                          backgroundColor: saved
                            ? "#F43F5E"
                            : "rgba(10, 10, 12, 0.62)",
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill={saved ? "white" : "none"}
                          stroke="white"
                          strokeWidth="2"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-sm font-medium">
                      <span className="text-yellow-400">★</span>
                      <span className="text-gray-900 dark:text-white">
                        {movie.vote_average?.toFixed(1) || "N/A"}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        /10
                      </span>
                    </div>
                    <h3 className="mt-1 text-base font-semibold leading-tight text-gray-900 dark:text-white line-clamp-2">
                      {movie.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center w-full gap-1 pt-8 pb-10 mt-8 lg:justify-end">
              <button
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className={`flex items-center gap-1 px-2 py-2 text-sm font-medium transition rounded-lg ${
                  page === 1
                    ? "opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-600"
                    : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 cursor-pointer"
                }`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <div className="flex items-center gap-1">
                {getPaginationNumbers().map((p, index) => {
                  if (p === "...") {
                    return (
                      <span
                        key={`ellipsis-${index}`}
                        className="flex items-center justify-center w-6 h-10 font-medium text-gray-900 dark:text-white"
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`flex items-center justify-center w-8 h-8 text-sm font-medium transition rounded-lg ${
                        page === p
                          ? "border border-gray-200 shadow-sm text-gray-900 bg-white font-bold dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                          : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 cursor-pointer"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className={`flex items-center gap-1 px-2 py-2 text-sm font-medium transition rounded-lg ${
                  page === totalPages
                    ? "opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-600"
                    : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 cursor-pointer"
                }`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
