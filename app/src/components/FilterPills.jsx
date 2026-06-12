import React from "react";

const SPORTS = [
  { id: "all", label: "All Disciplines" },
  { id: "mma", label: "MMA" },
  { id: "boxing", label: "Boxing" },
  { id: "kickboxing", label: "Kickboxing" },
  { id: "bjj", label: "BJJ" },
  { id: "wrestling", label: "Wrestling" },
];

export default function FilterPills({ selected, onSelect, className = "" }) {
  return (
    <div className={`flex items-center gap-2 overflow-x-auto py-2 scrollbar-none ${className}`}>
      {SPORTS.map((sport) => {
        const isActive = selected === sport.id;
        return (
          <button
            key={sport.id}
            onClick={() => onSelect(sport.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
              isActive
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5"
            }`}
          >
            {sport.label}
          </button>
        );
      })}
    </div>
  );
}
