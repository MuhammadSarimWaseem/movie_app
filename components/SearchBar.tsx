"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center w-full h-14 rounded-2xl focus-within:shadow-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 overflow-hidden transition-shadow duration-200">
        <div className="grid place-items-center h-full w-14 text-gray-400">
          <Search size={20} className={isLoading ? "animate-pulse" : ""} />
        </div>
        
        <input
          className="peer h-full w-full outline-none text-gray-700 dark:text-gray-200 bg-transparent pr-12 text-lg"
          type="text"
          id="search"
          placeholder="Search for movies..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        
        {value && (
          <button 
            onClick={() => setValue("")}
            className="absolute right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
