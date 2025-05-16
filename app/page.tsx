"use client";
import { stories } from "@/lib/stories";
import StoryCard from "./_components/StoryCard";
import { useEffect, useState } from "react";
import HeroBanner from "./_components/HeroBanner";
import StorySitesSection from "./_components/StorySitesSection";


export default function HomePage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [view, setView] = useState<"gallery" | "list">("gallery");

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
      <HeroBanner />
      <StorySitesSection/>
      <div
        className="flex items-center justify-between p-4 flex-col sm:flex-row"
        id="stories"
      >
        <h3>
          Discover magical stories under a sky full of stars. Pick a tale, and let
          your imagination soar!
        </h3>
        <div className="mt-2 sm:mt-0 flex gap-2">
          <button
            className={`px-4 py-2 rounded cursor-pointer ${
              view === "gallery"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
            onClick={() => setView("gallery")}
            aria-label="Gallery view"
          >
            Gallery
          </button>
          <button
            className={`px-4 py-2 rounded cursor-pointer ${
              view === "list"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
            onClick={() => setView("list")}
            aria-label="List view"
          >
            List
          </button>
        </div>
      </div>
      {view === "gallery" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              isFavorited={favorites.includes(story.id)}
              onFavorite={handleFavorite}
            />
          ))}
        </div>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {stories.map((story) => (
            <li
              key={story.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1">
                <h2 className="text-lg font-bold">{story.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  by {story.author}
                </p>
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded bg-[#ffd700] text-[#232946] font-bold shadow hover:bg-[#ffe066] transition"
                >
                  Read Story
                </a>
              </div>
              <button
                className="ml-auto px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                onClick={() => handleFavorite(story.id)}
                aria-label={
                  favorites.includes(story.id) ? "Unfavorite" : "Favorite"
                }
              >
                {favorites.includes(story.id) ? "★" : "☆"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
