import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 md:px-8 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black italic text-base">
          Z
        </div>
        <span className="font-bold text-lg text-indigo-600 tracking-tight">
          Movie Z
        </span>
      </div>

      {/* Search Input */}
      <div className="flex-1 max-w-md mx-4 md:mx-8">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 bg-gray-100 text-sm rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white transition-all text-gray-800 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Theme Toggle */}
      <button
        className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        title="Toggle Theme"
      >
        ☀️
      </button>
    </header>
  );
}
