"use client";
import { stories } from "@/lib/stories";
import StoryCard from "../_components/StoryCard";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [pendingUnfavorites, setPendingUnfavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
    setPendingUnfavorites([]); // Clear pending unfavorites on mount
    setLoading(false); // Set loading to false after loading favorites
  }, []);

  const handleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      // Unfavorite: add to pendingUnfavorites, update localStorage, but keep in UI
      setPendingUnfavorites((prev) => [...prev, id]);
      const updated = favorites.filter((fid) => fid !== id);
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    } else {
      // Favorite: remove from pendingUnfavorites if present, add to favorites
      setPendingUnfavorites((prev) => prev.filter((fid) => fid !== id));
      const updated = [...favorites, id];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  // Show all stories that are in favorites or pendingUnfavorites
  const favoriteStories = stories.filter(
    (story) => favorites.includes(story.id) || pendingUnfavorites.includes(story.id)
  );

  if (!loading && favoriteStories.length === 0) {
    return <p>You have no favorite stories yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {favoriteStories.map((story) => (
        <StoryCard
          key={story.id}
          story={story}
          isFavorited={favorites.includes(story.id)}
          onFavorite={handleFavorite}
        />
      ))}
    </div>
  );
}
