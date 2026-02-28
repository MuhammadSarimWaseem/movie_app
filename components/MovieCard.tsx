"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { MovieItem } from "@/lib/omdb";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: MovieItem;
}

export function MovieCard({ movie }: MovieCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
  const favorite = isFavorite(movie.imdbID);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to movie details
    e.stopPropagation();
    if (favorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <Link href={`/movie/${movie.imdbID}`}>
      <div className="group relative bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-zinc-800 h-full flex flex-col">
        <div className="relative aspect-[2/3] w-full bg-gray-200 dark:bg-zinc-800 overflow-hidden">
          {movie.Poster !== "N/A" ? (
            <Image
              src={movie.Poster}
              alt={movie.Title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400">
              No Poster
            </div>
          )}
          
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-colors z-10"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              size={18} 
              className={cn("transition-colors", favorite ? "fill-rose-500 text-rose-500" : "")} 
            />
          </button>

          {movie.imdbRating && (
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-md rounded-lg flex items-center gap-1 text-white text-xs font-semibold">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span>{movie.imdbRating}</span>
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg leading-tight line-clamp-2 mb-1">
            {movie.Title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-auto">
            {movie.Year}
          </p>
        </div>
      </div>
    </Link>
  );
}
