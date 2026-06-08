import { useState, useMemo } from "react";

export function useFighterSearch(fighters = []) {
  const [query, setQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");

  const filteredFighters = useMemo(() => {
    return fighters.filter((fighter) => {
      const matchesQuery =
        !query.trim() ||
        fighter.name?.toLowerCase().includes(query.toLowerCase()) ||
        fighter.nickname?.toLowerCase().includes(query.toLowerCase()) ||
        fighter.country?.toLowerCase().includes(query.toLowerCase());

      const matchesSport =
        selectedSport === "all" ||
        fighter.sport?.toLowerCase() === selectedSport.toLowerCase();

      return matchesQuery && matchesSport;
    });
  }, [fighters, query, selectedSport]);

  return {
    query,
    setQuery,
    selectedSport,
    setSelectedSport,
    filteredFighters,
    resultsCount: filteredFighters.length,
  };
}
