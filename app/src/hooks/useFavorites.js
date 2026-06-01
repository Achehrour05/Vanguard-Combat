import { useState, useEffect } from "react";

const STORAGE_KEY = "vanguard_favorite_fighters";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites to localStorage", e);
    }
  }, [favorites]);

  const toggleFavorite = (fighter) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === fighter.id);
      if (exists) {
        return prev.filter((f) => f.id !== fighter.id);
      }
      return [...prev, fighter];
    });
  };

  const isFavorite = (fighterId) => {
    return favorites.some((f) => f.id === fighterId);
  };

  return { favorites, toggleFavorite, isFavorite };
}
