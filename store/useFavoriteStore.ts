import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MovieItem } from '../lib/omdb';

interface FavoriteState {
    favorites: MovieItem[];
    addFavorite: (movie: MovieItem) => void;
    removeFavorite: (imdbID: string) => void;
    isFavorite: (imdbID: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
    persist(
        (set, get) => ({
            favorites: [],
            addFavorite: (movie) => {
                set((state) => {
                    if (!state.favorites.some((f) => f.imdbID === movie.imdbID)) {
                        return { favorites: [...state.favorites, movie] };
                    }
                    return state;
                });
            },
            removeFavorite: (imdbID) => {
                set((state) => ({
                    favorites: state.favorites.filter((f) => f.imdbID !== imdbID),
                }));
            },
            isFavorite: (imdbID) => {
                return get().favorites.some((f) => f.imdbID === imdbID);
            }
        }),
        {
            name: 'movie-favorites-storage', // Key in localStorage
            storage: createJSONStorage(() => localStorage),
        }
    )
);
