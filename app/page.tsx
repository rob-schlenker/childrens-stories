"use client";
import { stories } from "@/lib/stories";
import StoryCard from "./_components/StoryCard";
import { useEffect, useState } from "react";

export default function HomePage() {
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

  return (
    <div>
      <div className="flex items-center justify-between p-4 flex-col">
        <h1 className="text-2xl font-bold mb-4">Welcome to Starlit Library</h1>
        <h3>Discover magical stories under a sky full of stars.
            Pick a tale, and let your imagination soar!</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {stories.map((story) => (
          <StoryCard
            key={story.id}
            story={story}
            isFavorited={favorites.includes(story.id)}
            onFavorite={handleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
