// src/context/WatchlistContext.jsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  const toggle = (movie) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      const updated = exists
        ? prev.filter((item) => item.id !== movie.id)
        : [...prev, movie];
      localStorage.setItem("watchlist", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <WatchlistContext.Provider value={{ items, toggle }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => useContext(WatchlistContext);
