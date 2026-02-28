"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Film, Heart, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial user preference or default to light
    if (
      localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Film size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">MovieBrowse</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link 
              href="/favorites" 
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <Heart size={18} className="text-rose-500" />
              <span className="hidden sm:inline">Favorites</span>
            </Link>

            <div className="pl-2 border-l border-gray-200 dark:border-gray-700 h-6 flex items-center">
              <UserButton afterSignOutUrl="/sign-in" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
