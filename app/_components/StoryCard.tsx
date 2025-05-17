"use client";

import { useState, useEffect } from "react";
import { Story } from "@/lib/stories";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
	story: Story;
	onFavoriteAction: () => Promise<void>;
	isFavorited: boolean;
	className?: string;
}

// Array of fun gradient backgrounds
const gradients = [
	"from-indigo-500 via-purple-500 to-pink-500",
	"from-blue-400 via-cyan-400 to-green-300",
	"from-yellow-400 via-red-400 to-pink-400",
	"from-purple-600 via-indigo-400 to-blue-400",
	"from-green-400 via-lime-300 to-yellow-200",
	"from-pink-400 via-fuchsia-500 to-purple-500",
	"from-orange-400 via-yellow-300 to-pink-300",
	"from-teal-400 via-cyan-300 to-blue-200",
];

export default function StoryCard({
	story,
	onFavoriteAction,
	isFavorited,
	className,
}: Props) {
	const [imgError, setImgError] = useState(false);

	// Reset imgError if the story.image changes
	useEffect(() => {
		setImgError(false);
	}, [story.image]);

	// Pick a gradient based on the story id
	const gradient = gradients[parseInt(story.id, 10) % gradients.length];

	return (
		<div
			className={cn(
				"bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col justify-between",
				className
			)}
		>
			{story.image && !imgError ? (
				<div className="w-full h-40 overflow-hidden rounded">
					<Image
						src={story.image}
						alt={story.title}
						className="w-full h-40 object-cover rounded transition-transform duration-300 ease-in-out hover:scale-105"
						onError={() => {
							setImgError(true);
							if (process.env.NODE_ENV !== "production") {
								console.warn(
									"Image failed to load for story:",
									story.title,
									story.image
								);
							}
						}}
					/>
				</div>
			) : (
				<div
					className={`w-full h-40 rounded flex flex-col items-center justify-center text-center text-white font-bold text-lg bg-gradient-to-br ${gradient}`}
				>
					<span className="text-xl drop-shadow">{story.title}</span>
					<span className="text-sm font-normal drop-shadow mt-2">
						by {story.author}
					</span>
				</div>
			)}
			<h2 className="mt-2 text-lg font-bold">{story.title}</h2>
			<p className="text-sm text-gray-500 dark:text-gray-400">
				by {story.author}
			</p>
			<div className="mt-2 flex items-center gap-2">
				<a
					href={story.url}
					target="_blank"
					rel="noopener noreferrer"
					className="px-6 py-2 rounded-full bg-[#ffd700] text-[#232946] font-bold shadow-lg hover:bg-[#ffe066] transition"
				>
					Read Story
				</a>
				<button
					className={`ml-auto px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
					onClick={onFavoriteAction}
					aria-label={isFavorited ? "Unfavorite" : "Favorite"}
				>
					<span
						className={`text-2xl ${
							isFavorited ? "text-yellow-400" : "text-gray-400"
						}`}
					>
						{isFavorited ? "★" : "☆"}
					</span>
				</button>
			</div>
		</div>
	);
}
