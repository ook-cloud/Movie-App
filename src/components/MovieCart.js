import React from "react";

export default function MovieCard({ title, rating, image }) {
  return (
    <div className="bg-gray-50 p-2 rounded-xl border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
      {/* Poster Image */}
      <div className="aspect-2/3 rounded-lg overflow-hidden bg-gray-200 mb-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 text-xs mb-1">
        <span className="text-yellow-400">★</span>
        <span className="font-semibold text-gray-700">{rating}</span>
        <span className="text-gray-400 text-[10px]">/ 10</span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-900 truncate">{title}</h3>
    </div>
  );
}
