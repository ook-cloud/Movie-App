import React from "react";

export default function HeroSection() {
  return (
    <section className="relative h-100 md:h- bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop')`,
        }}
      ></div>

      {/* Gradient Overlay (Текст тодруулагч сүүдэр) */}
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center px-6 md:px-12 z-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
          Now Playing:
        </span>
        <h1 className="text-4xl md:text-6xl font-black mt-2 mb-3 tracking-tight">
          Wicked
        </h1>
        <div className="flex items-center gap-1.5 text-sm mb-4">
          <span className="text-yellow-400 font-bold">★ 6.8</span>
          <span className="text-gray-400">/ 10</span>
        </div>
        <p className="max-w-lg text-sm text-gray-300 mb-6 line-clamp-3 leading-relaxed">
          Elphaba, a misunderstood young woman because of her green skin,
          discovers her true power while Glinda, a popular young woman,
          discovers her true heart.
        </p>
        <button className="w-fit px-5 py-2.5 bg-white text-black font-semibold rounded-lg text-sm hover:bg-gray-200 transition flex items-center gap-2">
          <span>▶</span> Watch Trailer
        </button>
      </div>
    </section>
  );
}
