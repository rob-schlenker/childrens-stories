"use client";
import { stories } from "@/lib/stories";
import StoryCard from "./_components/StoryCard";
import { useEffect, useState } from "react";
import HeroBanner from "./_components/HeroBanner";
import StorySitesSection, { storySites } from "./_components/StorySitesSection";
import SiteCard from "./_components/SiteCard";
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

	const featured = storySites.find((site) => site.featured);

	return (
		<div>
			<HeroBanner />
			{/* Featured Site */}
			{featured && (
				<div className="max-w-4xl mx-auto mb-12">
					<div className="flex flex-col md:flex-row items-center bg-gradient-to-br from-[#ffd700]/30 via-[#b8c1ec]/30 to-[#6c63ff]/20 rounded-3xl shadow-lg p-8 md:p-12 border-2 border-[#ffd700]">
						<div className="flex-shrink-0 mb-6 md:mb-0 md:mr-10">
							<Image
								src={featured.logo}
								alt={featured.name + " logo"}
								width={120}
								height={120}
								className="rounded-xl bg-white/80 p-2 object-contain"
							/>
						</div>
						<div>
							<span className="inline-block mb-2 px-3 py-1 rounded-full bg-[#ffd700] text-[#232946] font-bold text-xs uppercase tracking-wider shadow">
								Featured Pick
							</span>
							<h3 className="text-2xl font-bold mb-2 text-[#232946] dark:text-white">
								{featured.name}
							</h3>
							<p className="text-md md:text-lg mb-4 text-gray-800 dark:text-gray-200">
								{featured.description}
							</p>
							<a
								href={featured.url}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block px-6 py-2 rounded-full bg-[#232946] text-[#ffd700] font-bold shadow hover:bg-[#3e4a89] transition"
							>
								Visit Sooper Books
							</a>
						</div>
					</div>
				</div>
			)}
			{/* Grid of Other Sites */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
				{storySites
					.filter((site) => !site.featured)
					.map((site) => (
						<SiteCard
							key={site.id}
							site={site}
							isFavorited={favorites.includes(site.id)}
							onFavorite={handleFavorite}
						/>
					))}
			</div>
		</div>
	);
}
