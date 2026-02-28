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
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 relative pb-12">
      
      {/* Immersive blurred backdrop */}
      {movie.Poster !== "N/A" && (
        <div className="absolute inset-0 -z-20 h-[60vh] overflow-hidden rounded-3xl opacity-20 dark:opacity-30 mask-image-gradient">
          <Image
            src={movie.Poster}
            alt="Backdrop"
            fill
            className="object-cover blur-3xl scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-[#0a0a0a]" />
        </div>
      )}

      <div className="pt-4 px-2">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm border border-gray-200/50 dark:border-zinc-800/50 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Discover
        </Link>
      </div>

      <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 dark:border-zinc-700/30">
        <div className="flex flex-col md:flex-row">
          
          {/* Poster Side */}
          <div className="relative w-full md:w-[40%] aspect-[2/3] md:aspect-auto bg-gray-100/50 dark:bg-zinc-800/50 p-4 md:p-8">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
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
                <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-zinc-800 text-gray-400 font-medium">
                  No Poster Available
                </div>
              )}
              
              <button
                onClick={toggleFavorite}
                className="absolute top-4 right-4 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/30 transition-all duration-300 z-10 hover:scale-110 shadow-2xl"
              >
                <Heart 
                  size={26} 
                  className={cn("transition-colors duration-300", favorite ? "fill-rose-500 text-rose-500 drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]" : "")} 
                />
              </button>
            </div>
          </div>

          {/* Details Side */}
          <div className="p-8 md:p-12 md:py-16 flex-1 flex flex-col justify-center animate-in slide-in-from-right-8 duration-700 delay-150 fill-mode-both">
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.Genre?.split(', ').map(genre => (
                <span key={genre} className="px-4 py-1.5 bg-indigo-50/80 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-500/20 rounded-full text-sm font-bold tracking-wide shadow-sm">
                  {genre}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
              {movie.Title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 font-semibold mb-10 text-lg bg-gray-50/50 dark:bg-black/20 p-4 rounded-2xl w-fit border border-gray-100 dark:border-zinc-800/50">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-indigo-500 dark:text-indigo-400" />
                {movie.Year}
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-zinc-700"></div>
              <div className="flex items-center gap-2 capitalize">
                <Film size={20} className="text-indigo-500 dark:text-indigo-400" />
                {movie.Type}
              </div>
              {movie.imdbRating && movie.imdbRating !== "N/A" && (
                <>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-zinc-700"></div>
                  <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                    <Star size={20} className="fill-yellow-500 text-yellow-500 drop-shadow-sm" />
                    <span>{movie.imdbRating} <span className="text-sm text-gray-400 font-medium">/ 10</span></span>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-4 max-w-2xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-zinc-800 pb-2 inline-block">Plot Summary</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg md:text-xl font-normal">
                {movie.Plot !== "N/A" ? movie.Plot : "No plot summary available for this movie."}
              </p>
            </div>
            
            {/* Additional meta details could go here in the future like Director, Actors */}
            {movie.Director && movie.Director !== "N/A" && (
               <div className="mt-8 pt-8 border-t border-gray-100 dark:border-zinc-800/50">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider block mb-2">Director</span>
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-100">{movie.Director}</span>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
