"use client";
import { useEffect, useState } from "react";
import HeroBanner from "./_components/HeroBanner";
import { storySites } from "./_components/StorySitesSection";
import SiteCard from "./_components/SiteCard";
import { BookOpen, Sparkles, Globe, Headphones } from "lucide-react";
import Image from "next/image";

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
		<div className="space-y-16">
			<HeroBanner />

			{/* Featured Site */}
			{featured && (
				<section className="max-w-4xl mx-auto px-4">
					<div className="flex flex-col md:flex-row items-center bg-gradient-to-br from-[#ffd700]/30 via-[#b8c1ec]/30 to-[#6c63ff]/20 rounded-3xl shadow-lg p-8 pt-16 md:p-12 border-2 border-[#ffd700] relative overflow-hidden">
						<div className="absolute top-0 right-0 p-2 md:p-3 bg-[#ffd700] rounded-bl-2xl text-sm font-bold text-[#232946]">
							Featured Pick ✨
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
				</section>
			)}

			{/* Interactive Stories */}
			<section className="px-4">
				<div className="max-w-6xl mx-auto">
					<div className="flex items-center gap-3 mb-6">
						<Sparkles className="w-8 h-8 text-[#ffd700]" />
						<h2 className="text-2xl font-bold">Interactive Adventures</h2>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{categories.interactive.map((site) => (
							<SiteCard
								key={site.id}
								site={site}
								isFavorited={favorites.includes(site.id)}
								onFavorite={handleFavorite}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Audio Stories */}
			<section className="px-4 bg-gradient-to-b from-transparent via-gray-50/50 dark:via-gray-900/50 to-transparent py-16">
				<div className="max-w-6xl mx-auto">
					<div className="flex items-center gap-3 mb-6">
						<Headphones className="w-8 h-8 text-[#ffd700]" />
						<h2 className="text-2xl font-bold">Listen & Learn</h2>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{categories.audio.map((site) => (
							<SiteCard
								key={site.id}
								site={site}
								isFavorited={favorites.includes(site.id)}
								onFavorite={handleFavorite}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Multilingual Stories */}
			<section className="px-4">
				<div className="max-w-6xl mx-auto">
					<div className="flex items-center gap-3 mb-6">
						<Globe className="w-8 h-8 text-[#ffd700]" />
						<h2 className="text-2xl font-bold">Stories in Many Languages</h2>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{categories.multilingual.map((site) => (
							<SiteCard
								key={site.id}
								site={site}
								isFavorited={favorites.includes(site.id)}
								onFavorite={handleFavorite}
							/>
						))}
					</div>
				</div>
			</section>

			{/* More Stories */}
			<section className="px-4 bg-gradient-to-b from-transparent via-gray-50/50 dark:via-gray-900/50 to-transparent py-16">
				<div className="max-w-6xl mx-auto">
					<div className="flex items-center gap-3 mb-6">
						<BookOpen className="w-8 h-8 text-[#ffd700]" />
						<h2 className="text-2xl font-bold">More Magical Stories</h2>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{categories.other.map((site) => (
							<SiteCard
								key={site.id}
								site={site}
								isFavorited={favorites.includes(site.id)}
								onFavorite={handleFavorite}
							/>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
