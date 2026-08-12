function MovieCard({ movie }) {
  return (
    <div className="bg-gray-50 p-2 rounded-xl border border-gray-100 hover:shadow-md transition cursor-pointer">
      <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-200 mb-2">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>
      <div className="flex items-center gap-1 text-xs text-yellow-500 font-semibold mb-1">
        <span>⭐</span>
        <span className="text-gray-700">{movie.rating}</span>
      </div>
      <h3 className="text-sm font-semibold text-gray-800 truncate">
        {movie.title}
      </h3>
    </div>
  );
}
