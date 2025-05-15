"use client";
import { Story } from "@/lib/stories";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HeartPlus, Heart, Sun, Moon } from "lucide-react";


type Props = {
  story: Story;
  onFavorite: (id: string) => void;
  isFavorited: boolean;
};

export default function StoryCard({ story, onFavorite, isFavorited }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col">
      <img
        src={story.image}
        alt={story.title}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="mt-2 text-lg font-bold">{story.title}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        by {story.author}
      </p>
      <div className="mt-2 flex items-center gap-2">
        <a
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 underline"
        >
          Read Story
        </a>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Favorite"
          onClick={() => onFavorite(story.id)}
        >
          {isFavorited ? (
            <Heart className="text-red-500" />
          ) : (
            <HeartPlus className="text-gray-400" />
          )}
        </Button>
      </div>
    </div>
  );
}
