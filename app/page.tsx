"use client";

import { useEffect, useState, useCallback } from "react";
import { SearchBar } from "@/components/SearchBar";
import { MovieCard } from "@/components/MovieCard";
import { Loader } from "@/components/Loader";
import { ErrorState } from "@/components/ErrorState";
import { searchMovies, MovieItem } from "@/lib/omdb";
import { ArrowDownAZ, ArrowUpZA } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const fetchMovies = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const data = await searchMovies(searchQuery);

    if (data.Response === "True" && data.Search) {
      // Deduplicate movies by imdbID to prevent React key warnings
      const uniqueMovies = Array.from(
        new Map(data.Search.map((movie) => [movie.imdbID, movie])).values()
      );
      setMovies(uniqueMovies);
    } else {
      setMovies([]);
      setError(data.Error || "No movies found");
    }
    
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Initial fetch to show some movies (e.g. popular ones like Batman)
    // if the user hasn't typed anything yet or just use the query.
    if (query) {
      fetchMovies(query);
    } else {
      // Fetch default movies if query is empty
      fetchMovies("Batman");
    }
  }, [query, fetchMovies]);

  const sortedMovies = [...movies].sort((a, b) => {
    const yearA = parseInt(a.Year, 10) || 0;
    const yearB = parseInt(b.Year, 10) || 0;
    return sortOrder === "asc" ? yearA - yearB : yearB - yearA;
  });

  return (
    <div className="flex flex-col gap-12 w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8 rounded-3xl shadow-2xl">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.200),theme(colors.gray.900))] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.900),theme(colors.black))] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white dark:bg-black shadow-xl shadow-indigo-600/10 dark:shadow-indigo-900/10 ring-1 ring-indigo-50 dark:ring-white/10 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6 drop-shadow-sm">
            Discover Your Next Favorite Movie
          </h1>
          <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600 dark:text-gray-300">
            Search millions of films, explore their details, and save them to your personal favorites collection instantly.
          </p>
        </div>
        <div className="mt-10 max-w-2xl mx-auto flex items-center justify-center gap-x-6">
          <div className="w-full relative z-20 transform hover:scale-[1.02] transition-transform duration-300">
            <SearchBar onSearch={setQuery} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Grid Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full px-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          {query ? `Results for "${query}"` : "Trending Hits"}
        </h2>
        
        {movies.length > 0 && (
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700/50 rounded-full shadow-sm hover:shadow-md hover:border-indigo-500 dark:hover:border-indigo-400 group transition-all duration-300 text-sm font-semibold"
          >
            {sortOrder === "asc" ? (
              <ArrowUpZA size={18} className="text-gray-500 group-hover:text-indigo-500 transition-colors" />
            ) : (
              <ArrowDownAZ size={18} className="text-gray-500 group-hover:text-indigo-500 transition-colors" />
            )}
            <span className="text-gray-700 dark:text-gray-200">Year ({sortOrder === "asc" ? "Asc." : "Desc."})</span>
          </button>
        )}
      </div>

      {/* Results Region */}
      <div className="min-h-[50vh]">
        {isLoading ? (
          <Loader />
        ) : error && query ? (
          <ErrorState message={error} />
        ) : sortedMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10">
            {sortedMovies.map((movie, idx) => (
              <div 
                key={movie.imdbID} 
                className="animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                style={{ animationDelay: `${idx * 100}ms`, animationDuration: '700ms' }}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : !query ? (
          <ErrorState 
            title="Start Searching" 
            message="Type a movie name above to start exploring." 
          />
        ) : null}
      </div>
    </div>
  );
}
