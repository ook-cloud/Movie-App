import { create } from "zustand";
import { persist } from "zustand/middleware";

export const UseWatchlist = create(
  persist(
    (set, get) => ({
      items: [],

      isSaved: (id) => {
        return get().items.some((movie) => movie.id === id);
      },
      add: (movie) =>
        set((state) => ({
          items: [{ ...movie, addedAt: Date.now() }, ...state.items],
        })),
      remove: (id) =>
        set((state) => ({
          items: state.items.filter((movie) => movie.id !== id),
        })),

      toggle: (movie) => {
        const { isSaved, add, remove } = get();
        if (isSaved(movie.id)) {
          remove(movie.id);
        } else {
          add(movie);
        }
      },
      clear: () => set({ items: [] }),
    }),
    {
      name: "moviez:watchlist",
    },
  ),
);
