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
    <div className="flex flex-col gap-8">
      <div className="text-center space-y-4 mb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500">
          Discover Movies
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Search, explore, and save your favorite films in one place.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
        <div className="w-full relative z-10">
          <SearchBar onSearch={setQuery} isLoading={isLoading} />
        </div>
        
        {movies.length > 0 && (
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap text-sm font-medium"
          >
            {sortOrder === "asc" ? <ArrowUpZA size={18} /> : <ArrowDownAZ size={18} />}
            Year ({sortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
        )}
      </div>

      <div className="min-h-[50vh]">
        {isLoading ? (
          <Loader />
        ) : error && query ? (
          <ErrorState message={error} />
        ) : sortedMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {sortedMovies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
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
