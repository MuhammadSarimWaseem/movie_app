import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message: string;
}

export function ErrorState({ title = "Something went wrong", message }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center min-h-[50vh]">
      <div className="bg-red-100 dark:bg-rose-950/30 p-4 rounded-full mb-4">
        <AlertCircle className="w-8 h-8 text-red-500 dark:text-rose-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
        {message}
      </p>
    </div>
  );
}
