import React from "react";
import { Link } from "react-router-dom";
import { Bookmark, Shield, ArrowRight } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";
import FighterCard from "../components/FighterCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 min-h-[75vh]">
      <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
        <div className="p-3 rounded-2xl bg-red-600/10 border border-red-500/20 text-red-500">
          <Bookmark className="w-8 h-8 fill-red-500" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-wider">
            Favorite Athletes
          </h1>
          <p className="text-gray-400 text-sm">
            Saved fighters and tactical profiles pinned for quick reference ({favorites.length})
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md max-w-md mx-auto">
          <Shield className="w-16 h-16 text-gray-500 mx-auto mb-4 opacity-50" />
          <h3 className="text-white font-bold text-lg mb-2">No Saved Fighters</h3>
          <p className="text-gray-400 text-sm mb-6">
            Bookmark fighters across MMA, Boxing, and Grappling to follow their careers here.
          </p>
          <Link
            to="/rankings"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all shadow-lg shadow-red-600/30"
          >
            Explore Rankings <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((fighter) => (
            <FighterCard
              key={fighter.id}
              fighter={fighter}
              sportColor="#e74c3c"
            />
          ))}
        </div>
      )}
    </div>
  );
}
