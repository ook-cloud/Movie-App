<section className="relative h-[400px] md:h-[480px] bg-black text-white overflow-hidden">
  {/* Баннерийн арын зураг */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-60"
    style={{ backgroundImage: `url('https://via.placeholder.com/1200x500')` }}
  ></div>

  {/* Давхаргатай сүүдэр (Gradient overlay) */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>

  {/* Баннерийн агуулга */}
  <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center px-8 z-10">
    <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
      Now Playing:
    </span>
    <h1 className="text-4xl md:text-6xl font-black mt-2 mb-3 tracking-tight">
      Wicked
    </h1>
    <div className="flex items-center gap-2 text-sm text-yellow-400 font-semibold mb-4">
      <span>⭐ 6.8</span>
      <span className="text-gray-400">/ 10</span>
    </div>
    <p className="max-w-md text-sm text-gray-300 mb-6 line-clamp-3">
      Elphaba, a misunderstood young woman because of her green skin, discovers
      her true power...
    </p>
    <button className="w-fit px-5 py-2.5 bg-white text-black font-semibold rounded-lg text-sm hover:bg-gray-200 transition flex items-center gap-2">
      <span>▶</span> Watch Trailer
    </button>
  </div>
</section>;
