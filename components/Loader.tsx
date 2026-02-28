import { Loader2 } from "lucide-react";

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-20 min-h-[50vh]">
      <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
      <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">
        Loading movies...
      </p>
    </div>
  );
}
