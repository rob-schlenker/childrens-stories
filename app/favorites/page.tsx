"use client";
import { useEffect, useState } from "react";
import { storySites } from "../_components/StorySitesSection";
import SiteCard from "../_components/SiteCard";

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

	if (!loading && favoriteSites.length === 0) {
		return <p>You have no favorite sites yet.</p>;
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
			{favoriteSites.map((site) => (
				<SiteCard
					key={site.id}
					site={site}
					isFavorited={favorites.includes(site.id)}
					onFavorite={handleFavorite}
				/>
			))}
		</div>
	);
}
