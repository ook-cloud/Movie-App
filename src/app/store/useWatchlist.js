import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWatchlist = create(
  persist(
    (set, get) => ({
      items: [],

      toggle: (movie) => {
        const currentItems = get().items;
        const exists = currentItems.some((m) => m.id === movie.id);
        if (exists) {
          set({ items: currentItems.filter((m) => m.id !== movie.id) });
        } else {
          set({ items: [{ ...movie, addedAt: Date.now() }, ...currentItems] });
        }
      },

      clear: () => set({ items: [] }),

      lists: [],

      createList: (name) =>
        set((state) => ({
          lists: [
            ...state.lists,
            {
              id: crypto.randomUUID(),
              name: name,
              createdAt: Date.now(),
              movies: [],
            },
          ],
        })),

      renameList: (id, newName) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === id ? { ...list, name: newName } : list,
          ),
        })),

      deleteList: (id) =>
        set((state) => ({
          lists: state.lists.filter((list) => list.id !== id),
        })),

      toggleMovieInList: (listId, movie) =>
        set((state) => ({
          lists: state.lists.map((list) => {
            if (list.id !== listId) return list;

            const isSaved = list.movies.some((m) => m.id === movie.id);
            if (isSaved) {
              return {
                ...list,
                movies: list.movies.filter((m) => m.id !== movie.id),
              };
            } else {
              return {
                ...list,
                movies: [
                  ...list.movies,
                  {
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                  },
                ],
              };
            }
          }),
        })),
    }),
    {
      name: "moviez:store",
    },
  ),
);
