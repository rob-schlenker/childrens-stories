"use client";
import React from "react";

// Store persistent stars outside the component
let persistentStars: Array<{
	id: number;
	top: number;
	left: number;
	size: number;
	delay: number;
}> | null = null;

// Number of stars
const STAR_COUNT = 60;

export default function TwinklingStarBackground() {
	const [stars, setStars] = React.useState<
		Array<{
			id: number;
			top: number;
			left: number;
			size: number;
			delay: number;
		}>
	>(persistentStars || []);

	React.useEffect(() => {
		if (!persistentStars) {
			persistentStars = Array.from({ length: STAR_COUNT }).map((_, i) => ({
				id: i,
				top: Math.random() * 100, // percent
				left: Math.random() * 100, // percent
				size: 1 + Math.random() * 2, // px
				delay: Math.random() * 3, // seconds
			}));
		}
		setStars(persistentStars);
	}, []);

	return (
		<div
			aria-hidden
			className="fixed inset-0 z-0 pointer-events-none"
			style={{
				background: "linear-gradient(180deg, #232946 0%, #3e4a89 100%)",
			}}
		>
			{stars.map((star) => (
				<span
					key={star.id}
					className="absolute rounded-full bg-white opacity-80 twinkle"
					style={{
						top: `${star.top}%`,
						left: `${star.left}%`,
						width: `${star.size}px`,
						height: `${star.size}px`,
						animationDelay: `${star.delay}s`,
						boxShadow: `0 0 6px 2px #fff8, 0 0 12px 4px #6c63ff44`,
					}}
				/>
			))}
			<style jsx global>{`
				.twinkle {
					animation: twinkle 2.5s infinite alternate;
				}
				@keyframes twinkle {
					0% {
						opacity: 0.7;
					}
					50% {
						opacity: 1;
					}
					100% {
						opacity: 0.5;
					}
				}
			`}</style>
		</div>
	);
}
