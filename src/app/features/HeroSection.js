"use client";

import { ChevronRight } from "../icons/ChevronRight";
import { PlayIcon } from "../icons/PlayIcon";
import { StarIcon } from "../icons/StarIcon";
import { HeroSectionLoading } from "./HeroSectionLoading";
import { useState, useEffect, useRef } from "react";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjE0NDJiOGUwMTcxN2VlNDliZTU0Njc1ZDIwMmExMiIsIm5iZiI6MTc4NjU4NTA3NS45NDIwMDAyLCJzdWIiOiI2YTdkMWZmMzg4ZjQ0ZGJjMzI0NDU5ODgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FngqDaJnZYi7hYgRF6MBlM_mBw52dkzc72A78xQPoYI";

export const HeroSection = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const scrollContainerRef = useRef(null);
  const displayedMovies = movies.slice(0, 5);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          { headers: { Authorization: `Bearer ${API_TOKEN}` } },
        );

        if (!response.ok) throw new Error("Failed to fetch");

        const jsonData = await response.json();
        setMovies(jsonData.results || []);
      } catch (err) {
        setErrorMessage("Movie API error. Unable to load movies.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      if (clientWidth > 0) {
        const index = Math.round(scrollLeft / clientWidth);
        setCurrentIndex(index);
      }
    }
  };

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const targetIndex =
        (index + displayedMovies.length) % displayedMovies.length;
      container.scrollTo({
        left: targetIndex * container.clientWidth,
        behavior: "smooth",
      });
      setCurrentIndex(targetIndex);
    }
  };

  const handleNext = () => {
    scrollToIndex(currentIndex + 1);
  };

  if (loading) return <HeroSectionLoading />;
  if (errorMessage)
    return <div className="p-6 text-red-500">{errorMessage}</div>;

  return (
    <div className="relative w-full group select-none">
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`w-full mt-6 flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          isMouseDown ? "cursor-grabbing scroll-auto" : "cursor-grab"
        }`}
      >
        {displayedMovies.map((movie) => (
          <div
            key={movie.id}
            className="relative w-full min-w-full h-125 flex-shrink-0 snap-center rounded-xl overflow-hidden flex items-end p-8 md:p-16"
          >
            <img
              alt={movie.title || "Movie poster"}
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                  : "/placeholder-backdrop.jpg"
              }
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />

            <div className="relative z-20 max-w-xl text-white flex flex-col gap-3 pb-6 pointer-events-auto">
              <p className="text-sm font-normal text-zinc-300">Now Playing:</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight line-clamp-1">
                {movie.title}
              </h2>

              <div className="flex items-center gap-2">
                <StarIcon />
                <p className="font-semibold text-lg text-zinc-100">
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                  <span className="font-normal text-sm text-zinc-400">/10</span>
                </p>
              </div>

              <p className="text-xs md:text-sm text-zinc-200 line-clamp-3 leading-relaxed">
                {movie.overview}
              </p>

              <div className="pt-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-white text-zinc-900 font-medium text-sm hover:bg-zinc-200 transition-colors">
                  <PlayIcon />
                  <span>Watch Trailer</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {displayedMovies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? "w-6 bg-white"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white hover:bg-zinc-100 text-zinc-900 shadow-lg flex items-center justify-center transition-all duration-200 active:scale-95"
      >
        <ChevronRight className="w-4 h-4 shrink-0 text-zinc-900" />
      </button>
    </div>
  );
};
