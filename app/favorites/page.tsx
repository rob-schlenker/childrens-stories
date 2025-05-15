"use client";
import { stories } from "@/lib/stories";
import StoryCard from "../_components/StoryCard";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
  }, []);

  const handleFavorite = (id: string) => {
    let updated: string[];
    if (favorites.includes(id)) {
      updated = favorites.filter((fid) => fid !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const favoriteStories = stories.filter((story) =>
    favorites.includes(story.id)
  );

  if (favoriteStories.length === 0) {
    return <p>You have no favorite stories yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
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
