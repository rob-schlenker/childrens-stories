"use client";
import { useEffect, useState } from "react";
import HeroBanner from "./_components/HeroBanner";
import { storySites } from "./_components/StorySitesSection";
import SiteCard from "./_components/SiteCard";
import {
	BookOpen,
	Sparkles,
	Globe,
	Headphones,
	Stars,
	BookOpenCheck,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

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

	// Group sites by category
	const featured = storySites.find((site) => site.featured);
	const categories = {
		interactive: storySites.filter(
			(site) =>
				site.description.toLowerCase().includes("interactive") ||
				site.description.toLowerCase().includes("activities")
		),
		audio: storySites.filter(
			(site) =>
				site.description.toLowerCase().includes("audio") ||
				site.description.toLowerCase().includes("read aloud")
		),
		multilingual: storySites.filter(
			(site) =>
				site.description.toLowerCase().includes("language") ||
				site.description.toLowerCase().includes("multilingual")
		),
		other: storySites.filter(
			(site) =>
				!site.featured &&
				!site.description.toLowerCase().includes("interactive") &&
				!site.description.toLowerCase().includes("activities") &&
				!site.description.toLowerCase().includes("audio") &&
				!site.description.toLowerCase().includes("read aloud") &&
				!site.description.toLowerCase().includes("language") &&
				!site.description.toLowerCase().includes("multilingual")
		),
	};

	return (
		<div className="space-y-24">
			<HeroBanner />

			{/* Featured Site */}
			{featured && (
				<section className="max-w-4xl mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="relative"
					>
						<div className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/10 via-[#b8c1ec]/10 to-[#6c63ff]/10 transform rotate-3 rounded-3xl" />
						<div className="absolute inset-0 bg-gradient-to-tl from-[#ffd700]/10 via-[#b8c1ec]/10 to-[#6c63ff]/10 transform -rotate-3 rounded-3xl" />
						<div className="relative flex flex-col md:flex-row items-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-lg p-8 pt-16 md:p-12 border-2 border-[#ffd700]">
							<div className="absolute -top-6 right-6 px-4 py-2 bg-gradient-to-r from-[#ffd700] to-[#ffaa33] rounded-full shadow-lg">
								<span className="flex items-center gap-2 text-sm font-bold text-[#232946]">
									<Sparkles className="w-4 h-4" />
									Featured Pick
								</span>
							</div>
							<div className="flex flex-col md:flex-row items-center gap-8 w-full">
								<div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 bg-white/80 rounded-2xl p-4">
									<Image
										src="/logos/sooper-books-logo.png"
										alt="Sooper Books Logo"
										width={160}
										height={160}
										className="w-full h-full object-contain"
										priority
									/>
								</div>
								<div>
									<h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#232946] dark:text-white text-center md:text-left">
										{featured.name}
									</h2>
									<p className="text-md md:text-lg mb-6 text-gray-800 dark:text-gray-200">
										{featured.description}
									</p>
									<a
										href={featured.url}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-block px-6 py-2.5 rounded-xl bg-[#232946] text-[#ffd700] font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
									>
										Explore Now
									</a>
								</div>
							</div>
						</div>
					</motion.div>
				</section>
			)}

			{/* Audio Stories */}
			<section className="relative px-4 py-20">
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/80 dark:via-gray-900/80 to-transparent" />
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					className="relative max-w-6xl mx-auto"
				>
					<div className="flex flex-col items-center gap-4 mb-12 text-center">
						<div className="p-4 rounded-full bg-[#ffd700]/10">
							<Headphones className="w-10 h-10 text-[#ffd700]" />
						</div>
						<h2 className="text-3xl font-bold">Listen & Learn</h2>
						<p className="text-gray-600 dark:text-gray-300 max-w-2xl">
							Discover magical audio stories perfect for bedtime, car rides, or
							any time you want to spark your child's imagination.
						</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{categories.audio.map((site, index) => (
							<motion.div
								key={site.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
							>
								<SiteCard
									site={site}
									isFavorited={favorites.includes(site.id)}
									onFavorite={handleFavorite}
								/>
							</motion.div>
						))}
					</div>
				</motion.div>
			</section>

			{/* Multilingual Stories */}
			<section className="relative px-4 py-20">
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					className="relative max-w-6xl mx-auto"
				>
					<div className="flex flex-col items-center gap-4 mb-12 text-center">
						<div className="p-4 rounded-full bg-[#ffd700]/10">
							<Globe className="w-10 h-10 text-[#ffd700]" />
						</div>
						<h2 className="text-3xl font-bold">Stories in Many Languages</h2>
						<p className="text-gray-600 dark:text-gray-300 max-w-2xl">
							Explore stories from around the world and help your child discover
							new languages and cultures.
						</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{categories.multilingual.map((site, index) => (
							<motion.div
								key={site.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
							>
								<SiteCard
									site={site}
									isFavorited={favorites.includes(site.id)}
									onFavorite={handleFavorite}
								/>
							</motion.div>
						))}
					</div>
				</motion.div>
			</section>

			{/* More Stories */}
			<section className="relative px-4 py-20">
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/80 dark:via-gray-900/80 to-transparent" />
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					className="relative max-w-6xl mx-auto"
				>
					<div className="flex flex-col items-center gap-4 mb-12 text-center">
						<div className="p-4 rounded-full bg-[#ffd700]/10">
							<BookOpen className="w-10 h-10 text-[#ffd700]" />
						</div>
						<h2 className="text-3xl font-bold">More Magical Stories</h2>
						<p className="text-gray-600 dark:text-gray-300 max-w-2xl">
							Dive into our collection of enchanting stories that will captivate
							young minds and inspire their love for reading.
						</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{categories.other.map((site, index) => (
							<motion.div
								key={site.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
							>
								<SiteCard
									site={site}
									isFavorited={favorites.includes(site.id)}
									onFavorite={handleFavorite}
								/>
							</motion.div>
						))}
					</div>
				</motion.div>
			</section>
		</div>
	);
}
