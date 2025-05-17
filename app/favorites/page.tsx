"use client";
import { useEffect, useState } from "react";
import { storySites } from "../_components/StorySitesSection";
import SiteCard from "../_components/SiteCard";
import { BookHeart, Star, Library } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FavoritesPage() {
	const [favorites, setFavorites] = useState<string[]>([]);
	const [pendingUnfavorites, setPendingUnfavorites] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
		setFavorites(favs);
		setPendingUnfavorites([]);
		setLoading(false);
	}, []);

	const handleFavorite = (id: string) => {
		if (favorites.includes(id)) {
			setPendingUnfavorites((prev) => [...prev, id]);
			const updated = favorites.filter((fid) => fid !== id);
			setFavorites(updated);
			localStorage.setItem("favorites", JSON.stringify(updated));
		} else {
			setPendingUnfavorites((prev) => prev.filter((fid) => fid !== id));
			const updated = [...favorites, id];
			setFavorites(updated);
			localStorage.setItem("favorites", JSON.stringify(updated));
		}
	};

	const favoriteSites = storySites.filter(
		(site) =>
			favorites.includes(site.id) || pendingUnfavorites.includes(site.id)
	);

	if (loading) {
		return (
			<div className="min-h-[50vh] flex items-center justify-center">
				<div className="text-center animate-pulse">
					<Star className="w-12 h-12 mx-auto mb-4 text-[#ffd700]" />
					<p className="text-lg">Loading your magical collection...</p>
				</div>
			</div>
		);
	}

	if (favoriteSites.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="min-h-[60vh] flex flex-col items-center justify-center max-w-2xl mx-auto text-center px-4"
			>
				<div className="relative mb-8">
					<BookHeart className="w-16 h-16 text-[#ffd700]" />
					<div className="absolute -top-1 -right-1 w-6 h-6 bg-[#ffd700] rounded-full flex items-center justify-center text-[#232946] font-bold text-sm">
						0
					</div>
				</div>
				<h1 className="text-2xl md:text-3xl font-bold mb-4">
					Your Reading Collection is Empty
				</h1>
				<p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
					Start building your magical collection by starring your favorite story
					libraries! Each star you click adds a new treasure to your reading
					journey.
				</p>
				<Link
					href="/"
					className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#ffaa33] text-[#232946] font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
				>
					<Library className="w-5 h-5" />
					Discover Story Libraries
				</Link>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="space-y-8 px-4"
		>
			{/* Header Section */}
			<div className="max-w-2xl mx-auto text-center">
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					className="inline-block mb-6 p-3 rounded-full bg-[#ffd700]/20"
				>
					<BookHeart className="w-8 h-8 text-[#ffd700]" />
				</motion.div>
				<h1 className="text-3xl md:text-4xl font-bold mb-4">
					Your Magical Collection
				</h1>
				<p className="text-lg text-gray-600 dark:text-gray-300">
					Here are the story libraries you&apos;ve marked as favorites. Your
					personal constellation of {favoriteSites.length} magical reading
					destinations!
				</p>
			</div>

			{/* Cards Grid */}
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
					{favoriteSites.map((site, index) => (
						<motion.div
							key={site.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="h-full"
						>
							<SiteCard
								site={site}
								isFavorited={favorites.includes(site.id)}
								onFavorite={handleFavorite}
							/>
						</motion.div>
					))}
				</div>
			</div>

			{/* Bottom Call to Action */}
			<div className="text-center pt-8">
				<Link
					href="/"
					className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ffd700]/20 to-[#ffaa33]/20 text-[#232946] dark:text-white font-semibold hover:from-[#ffd700]/30 hover:to-[#ffaa33]/30 transition-all duration-200"
				>
					<Library className="w-5 h-5" />
					Discover More Libraries
				</Link>
			</div>
		</motion.div>
	);
}
