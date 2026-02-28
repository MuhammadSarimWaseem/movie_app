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
    <Link href={`/movie/${movie.imdbID}`} className="block h-full">
      <div className="group relative bg-white dark:bg-zinc-900/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-zinc-800/50 h-full flex flex-col hover:ring-2 hover:ring-indigo-500/20">
        <div className="relative aspect-[2/3] w-full bg-gray-100 dark:bg-zinc-800 overflow-hidden">
          {movie.Poster !== "N/A" ? (
            <>
              <Image
                src={movie.Poster}
                alt={movie.Title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400 font-medium">
              No Poster
            </div>
          )}
          
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all duration-300 z-10 hover:scale-110 shadow-lg"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              size={18} 
              className={cn("transition-colors duration-300", favorite ? "fill-rose-500 text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" : "")} 
            />
          </button>

          {movie.imdbRating && movie.imdbRating !== "N/A" && (
            <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg flex items-center gap-1.5 text-white text-xs font-bold shadow-lg border border-white/10 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span>{movie.imdbRating}</span>
            </div>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col bg-white dark:bg-zinc-900/60 backdrop-blur-sm z-10 relative">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg leading-tight line-clamp-2 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {movie.Title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50"></span>
            {movie.Year}
          </p>
        </div>
      </div>
    </Link>
  );
}
