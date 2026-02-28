"use client";

import { useEffect, useState, use } from "react";
import { getMovieById, MovieItem } from "@/lib/omdb";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { Loader } from "@/components/Loader";
import { ErrorState } from "@/components/ErrorState";
import Image from "next/image";
import { Heart, Star, ArrowLeft, Calendar, Film } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const [movie, setMovie] = useState<MovieItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { isFavorite, addFavorite, removeFavorite } = useFavoriteStore();
  
  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true);
      const data = await getMovieById(id);
      setMovie(data);
      setIsLoading(false);
    }
    fetchMovie();
  }, [id]);

  if (isLoading) return <Loader />;
  if (!movie) return <ErrorState message="Movie not found." />;

  const favorite = isFavorite(movie.imdbID);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to search
      </Link>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-zinc-800">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-2/5 aspect-[2/3] md:aspect-auto bg-gray-100 dark:bg-zinc-800">
            {movie.Poster !== "N/A" ? (
              <Image
                src={movie.Poster}
                alt={movie.Title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400">
                No Poster Available
              </div>
            )}
            
            <button
              onClick={toggleFavorite}
              className="absolute top-4 right-4 p-4 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-all z-10 hover:scale-105"
            >
              <Heart 
                size={24} 
                className={cn("transition-colors", favorite ? "fill-rose-500 text-rose-500" : "")} 
              />
            </button>
          </div>

          <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.Genre?.split(', ').map(genre => (
                <span key={genre} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                  {genre}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {movie.Title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 font-medium mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-gray-400" />
                {movie.Year}
              </div>
              <div className="flex items-center gap-2">
                <Film size={18} className="text-gray-400" />
                {movie.Type}
              </div>
              {movie.imdbRating && movie.imdbRating !== "N/A" && (
                <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                  <Star size={18} className="fill-yellow-500 text-yellow-500" />
                  {movie.imdbRating} / 10
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Plot Summary</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                {movie.Plot !== "N/A" ? movie.Plot : "No plot summary available for this movie."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
