"use client";

import { useFavoriteStore } from "@/store/useFavoriteStore";
import { MovieCard } from "@/components/MovieCard";
import { HeartCrack } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites } = useFavoriteStore();

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-4 mb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Your Favorites
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Movies you've saved to watch later or because you love them.
        </p>
      </div>

      <div className="min-h-[50vh]">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {favorites.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="bg-gray-100 dark:bg-zinc-800 p-6 rounded-full mb-6 text-gray-400">
              <HeartCrack size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              No favorites yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8 text-lg">
              You haven't saved any movies to your favorites list. Start exploring and click the heart icon to save them here!
            </p>
            <Link 
              href="/"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
            >
              Browse Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
