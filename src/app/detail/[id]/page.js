"use client";
import { Footer } from "@/app/features/Footer";
import { Header } from "@/app/features/Header";
import { Play } from "@/app/icons/Play";
import { Star } from "@/app/icons/Star";
import { Star2 } from "@/app/icons/Star2";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { NextArrow } from "@/app/icons/NextArrow";
const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2RlYjljY2JlMzU2YjJjOTMxZjRjZWI1OTA4YmQ4NSIsIm5iZiI6MTc4NjU4NTAxNC41MDcsInN1YiI6IjZhN2QxZmI2OGFhNWQzN2ZiNTQ0NTkzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wd9oLUNGObBB7hSw6-cdoMQ2J35kHO-koQ8BCdqOOwQ";

export default function Detail() {
  const router = useRouter();
  const [activeUrl, setActiveUrl] = useState(null);
  const [data, setData] = useState(null);
  const [similarData, setSimilarData] = useState([]);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [videoData, setVideoData] = useState([]);
  const param = useParams();

  const getVideoData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${param.id}/videos?language=en-US`,
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    const jsonData = await response.json();
    return jsonData.results[0] || [];
  };
  console.log(videoData);
  const getData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${param.id}?language=en-US`,
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    return await response.json();
  };

  const getDataSimilar = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${param.id}/similar?language=en-US&page=1`,
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    const jsonData = await response.json();
    return jsonData.results || [];
  };

  const getCredits = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${param.id}/credits?language=en-US`,
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    return await response.json();
  };

  useEffect(() => {
    if (!param?.id) return;

    Promise.all([getData(), getDataSimilar(), getCredits(), getVideoData()])
      .then(([movieDetails, similarMovies, creditData, videoData]) => {
        setData(movieDetails);
        setSimilarData(similarMovies);
        setCredits(creditData);
        setVideoData(videoData);
      })
      .catch(() => setErrorMessage("Movie API error"))
      .finally(() => setLoading(false));
  }, [param?.id]);
  const handlePlay = (videoId) => {
    setActiveUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`);
  };

  const handleClose = () => {
    setActiveUrl(null);
  };

  const jumpToDetail = (id) => {
    router.push(`/detail/${id}`);
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500">
        Loading movie details...
      </div>
    );
  }

  if (errorMessage || !data) {
    return (
      <div className="p-12 text-center text-red-500">
        {errorMessage || "Movie not found"}
      </div>
    );
  }

  const directors =
    credits?.crew
      ?.filter((person) => person.job === "Director")
      ?.map((p) => p.name)
      ?.join(" · ") || "N/A";

  const writers =
    Array.from(
      new Set(
        credits?.crew
          ?.filter(
            (person) =>
              person.department === "Writing" ||
              person.job === "Writer" ||
              person.job === "Screenplay",
          )
          ?.map((p) => p.name),
      ),
    )
      ?.slice(0, 3)
      ?.join(" · ") || "N/A";

  const stars =
    credits?.cast
      ?.slice(0, 4)
      ?.map((person) => person.name)
      ?.join(" · ") || "N/A";
  const JumpToMoreLikeThis = () => {
    router.push(`/moreLikeThis/${param.id}`);
  };
  return (
    <div className="w-full flex flex-col items-center relative min-h-screen">
      <Header />

      <main className="w-full max-w-270 px-4 flex flex-col items-center mt-10 mb-16 relative">
        {activeUrl && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={handleClose}
          >
            <div
              className="relative w-full max-w-250 aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                className="w-full h-full"
                src={activeUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex justify-between items-start gap-4">
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <h1 className="font-inter font-extrabold text-[32px] sm:text-[36px] text-[#09090B] leading-tight wrap-break-words">
                {data.title}
              </h1>
              <p className="font-inter font-normal text-[16px] sm:text-[18px] text-[#71717A]">
                {data.release_date}{" "}
                {data.runtime
                  ? `· ${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
                  : ""}
              </p>
            </div>

            <div className="flex flex-col gap-1 shrink-0">
              <p className="font-inter font-medium text-[12px] text-[#71717A]">
                Rating
              </p>
              <div className="flex items-center gap-1.5">
                <Star />
                <div className="flex flex-col">
                  <p className="font-inter font-semibold text-[18px] text-[#09090B] leading-none">
                    {data.vote_average ? data.vote_average.toFixed(1) : "N/A"}
                    <span className="font-inter font-normal text-[14px] text-[#71717A]">
                      /10
                    </span>
                  </p>
                  <p className="font-inter font-normal text-[12px] text-[#71717A]">
                    {data.vote_count
                      ? `${data.vote_count.toLocaleString()}`
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row gap-6 h-auto md:h-107.5">
            <div className="w-full md:w-72.5 h-100 md:h-full shrink-0 rounded-lg overflow-hidden bg-gray-100 shadow-sm">
              <img
                alt={data.title || "Movie poster"}
                src={
                  data.poster_path
                    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                    : "/placeholder.png"
                }
                className="object-cover w-full h-full"
              />
            </div>

            <div className="w-full flex-1 h-65 md:h-full rounded-lg overflow-hidden bg-gray-900 relative shadow-sm">
              <img
                alt={data.title || "Backdrop"}
                src={
                  data.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
                    : "/placeholder.png"
                }
                className="object-cover w-full h-full opacity-90"
              />
              <div className="flex gap-3 items-center absolute left-6 bottom-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full">
                <button
                  onClick={() => handlePlay(videoData.key)}
                  className="w-9 h-9 rounded-full flex justify-center items-center bg-white hover:scale-105 transition-transform"
                >
                  <Play />
                </button>
                <p
                  className="font-inter font-medium text-white text-[15px] cursor-pointer"
                  onClick={() => handlePlay(videoData.key)}
                >
                  Play trailer
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-5 mt-8">
          <div className="flex flex-wrap gap-2">
            {data?.genres?.map((genre) => (
              <span
                key={genre.id}
                className="py-1 px-3 rounded-full border border-[#E4E4E7] font-inter font-medium text-[13px] text-[#09090B] shrink-0"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="font-inter font-normal text-[#09090B] text-[16px] leading-relaxed">
            {data.overview}
          </p>

          <div className="w-full flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-2">
              <div className="flex gap-8">
                <p className="w-20 font-inter font-bold text-[14px] text-[#09090B] shrink-0">
                  Director
                </p>
                <p className="font-inter font-normal text-[14px] text-[#09090B]">
                  {directors}
                </p>
              </div>
              <div className="w-full h-px bg-[#E4E4E7]"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-8">
                <p className="w-20 font-inter font-bold text-[14px] text-[#09090B] shrink-0">
                  Writers
                </p>
                <p className="font-inter font-normal text-[14px] text-[#09090B]">
                  {writers}
                </p>
              </div>
              <div className="w-full h-px bg-[#E4E4E7]"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-8">
                <p className="w-20 font-inter font-bold text-[14px] text-[#09090B] shrink-0">
                  Stars
                </p>
                <p className="font-inter font-normal text-[14px] text-[#09090B]">
                  {stars}
                </p>
              </div>
              <div className="w-full h-px bg-[#E4E4E7]"></div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 mt-12">
          <div className="w-full flex justify-between items-center">
            <h2 className="font-inter font-semibold text-[22px] text-[#09090B]">
              More like this
            </h2>
            <div className="px-3 py-1.5 rounded-md flex justify-center items-center gap-2 hover:bg-gray-100 transition-colors cursor-pointer">
              <button
                className="border-none font-inter font-medium text-[14px] text-[#09090B]"
                onClick={JumpToMoreLikeThis}
                style={{ cursor: "pointer" }}
              >
                See more
              </button>
              <NextArrow />
            </div>
          </div>

          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {similarData.slice(0, 5).map((movie) => (
              <div
                key={movie.id}
                onClick={() => jumpToDetail(movie.id)}
                className="flex flex-col rounded-lg bg-[#F4F4F5] overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="relative w-full aspect-2/3 shrink-0 bg-gray-200">
                  <img
                    alt={movie.title || "Movie poster"}
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/placeholder.png"
                    }
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col p-3 gap-1">
                  <div className="flex items-center gap-1">
                    <Star2 />
                    <p className="font-inter font-medium text-[13px] text-[#09090B]">
                      {movie.vote_average
                        ? movie.vote_average.toFixed(1)
                        : "N/A"}
                      <span className="text-[#71717A]">/10</span>
                    </p>
                  </div>
                  <p className="font-inter font-medium text-[14px] text-[#09090B] line-clamp-2 leading-snug">
                    {movie.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
