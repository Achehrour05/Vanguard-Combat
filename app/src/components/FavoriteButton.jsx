import React from "react";
import { Bookmark } from "lucide-react";

export default function FavoriteButton({ isFavorited, onToggle, className = "" }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center ${
        isFavorited
          ? "bg-red-500/20 text-red-500 border border-red-500/40 shadow-lg shadow-red-500/20"
          : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
      } ${className}`}
    >
      <Bookmark
        className={`w-5 h-5 transition-transform duration-200 ${
          isFavorited ? "fill-red-500 scale-110" : ""
        }`}
      />
    </button>
  );
}
