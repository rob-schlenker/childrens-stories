"use client";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
	site: {
		id: string;
		name: string;
		url: string;
		description: string;
		logo: string;
	};
	isFavorited: boolean;
	onFavorite: (id: string) => void;
};

const SiteCard = ({ site, isFavorited, onFavorite }: Props) => {
	return (
		<motion.div
			className="relative group"
			whileHover={{ y: -5 }}
			transition={{ type: "spring", stiffness: 300 }}
		>
			{/* Favorite Button - Top Right Corner */}
			<button
				onClick={() => onFavorite(site.id)}
				className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg backdrop-blur-sm hover:scale-110 transition-transform"
				aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
			>
				<Star
					className={`w-5 h-5 transform transition-colors ${
						isFavorited
							? "fill-yellow-400 stroke-yellow-400"
							: "stroke-gray-400 hover:stroke-yellow-400"
					}`}
				/>
			</button>

			{/* Card Content */}
			<div className="relative h-full flex flex-col bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-800/50 rounded-2xl px-6 pt-12 pb-6 shadow-xl backdrop-blur-sm border border-white/20 overflow-hidden transition-colors">
				<h3 className="text-xl font-bold text-center mb-2 text-gray-800 dark:text-white">
					{site.name}
				</h3>

				<p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6 flex-grow">
					{site.description}
				</p>

				{/* Visit Button */}
				<div className="relative mt-auto">
					<a
						href={site.url}
						target="_blank"
						rel="noopener noreferrer"
						className="block w-full py-2.5 px-4 text-center font-semibold rounded-xl bg-gradient-to-r from-[#ffd700] to-[#ffaa33] text-[#232946] shadow-lg hover:shadow-xl hover:scale-[1.02] hover:brightness-105 transition-all duration-200"
					>
						Visit Library
					</a>
				</div>
			</div>
		</motion.div>
	);
};

export default SiteCard;
