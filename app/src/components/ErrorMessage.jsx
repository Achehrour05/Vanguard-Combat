import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorMessage({
  title = "Failed to load data",
  message = "An error occurred while fetching combat sports information.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto rounded-2xl bg-red-500/5 border border-red-500/20 my-8">
      <div className="p-3 rounded-full bg-red-500/10 text-red-500 mb-3">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md shadow-red-600/20"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Retry Request
        </button>
      )}
    </div>
  );
}
