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
			className="relative group h-full"
			whileHover={{ y: -5 }}
			transition={{ type: "spring", stiffness: 300 }}
		>
			{/* Background gradient effect */}
			<div className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/5 via-[#b8c1ec]/5 to-[#6c63ff]/5 transform rotate-2 rounded-2xl group-hover:rotate-3 transition-transform duration-300" />
			<div className="absolute inset-0 bg-gradient-to-tl from-[#ffd700]/5 via-[#b8c1ec]/5 to-[#6c63ff]/5 transform -rotate-2 rounded-2xl group-hover:-rotate-3 transition-transform duration-300" />

			{/* Card Content */}
			<div className="relative h-full flex flex-col bg-white/90 dark:bg-gray-800/90 rounded-2xl px-6 pt-10 pb-6 shadow-xl backdrop-blur-sm border border-white/20 overflow-hidden transition-all duration-300 group-hover:border-[#ffd700]/30">
				{/* Favorite Button - Top Right */}
				<motion.button
					onClick={() => onFavorite(site.id)}
					className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-sm backdrop-blur-sm transition-transform"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					aria-label={
						isFavorited ? "Remove from favorites" : "Add to favorites"
					}
				>
					<Star
						className={`w-4 h-4 transform transition-all duration-300 ${
							isFavorited
								? "fill-yellow-400 stroke-yellow-400"
								: "stroke-gray-400 hover:stroke-yellow-400"
						}`}
					/>
				</motion.button>

				<div className="flex-1 flex flex-col items-center">
					<h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-3 max-w-[85%]">
						{site.name}
					</h3>

					<p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
						{site.description}
					</p>
				</div>

				{/* Visit Button */}
				<motion.div
					className="relative mt-auto"
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					<a
						href={site.url}
						target="_blank"
						rel="noopener noreferrer"
						className="block w-full py-2.5 px-4 text-center font-semibold rounded-xl bg-gradient-to-r from-[#ffd700] to-[#ffaa33] text-[#232946] shadow-lg hover:shadow-xl hover:brightness-105 transition-all duration-300"
					>
						Visit Library
					</a>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default SiteCard;
