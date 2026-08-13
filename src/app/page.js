import React from "react";
import Header from "./features/Header";
import HeroSection from "./features/HeroSection";
import MovieCard from "../components/MovieCart";
import Footer from "./features/Footer";

// Туршилтын киноны дата
const sampleMovies = [
  {
    id: 1,
    title: "Dear Santa",
    rating: "6.8",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "How To Train Your Dragon",
    rating: "6.8",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Alien: Romulus",
    rating: "6.8",
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "From the Ashes",
    rating: "6.8",
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Space Dogg",
    rating: "6.8",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col justify-between">
      <div>
        {/* 1. Header */}
        <Header />

        {/* 2. Hero Section */}
        <HeroSection />

        {/* Main Content Areas */}
        <main className="max-w-7xl mx-auto px-6 md:px-12 py-10 space-y-12">
          {/* Upcoming Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Upcoming</h2>
              <a
                href="#"
                className="text-xs font-semibold text-gray-500 hover:text-black"
              >
                See more &gt;
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {sampleMovies.map((movie) => (
                <MovieCard key={movie.id} {...movie} />
              ))}
            </div>
          </section>

          {/* Popular Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Popular</h2>
              <a
                href="#"
                className="text-xs font-semibold text-gray-500 hover:text-black"
              >
                See more &gt;
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {sampleMovies.map((movie) => (
                <MovieCard key={`pop-${movie.id}`} {...movie} />
              ))}
            </div>
          </section>

          {/* Top Rated Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Top Rated</h2>
              <a
                href="#"
                className="text-xs font-semibold text-gray-500 hover:text-black"
              >
                See more &gt;
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {sampleMovies.map((movie) => (
                <MovieCard key={`top-${movie.id}`} {...movie} />
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
