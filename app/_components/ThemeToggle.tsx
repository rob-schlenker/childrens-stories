"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		// Show a placeholder with the same size to prevent layout shift
		return (
			<div className="w-[62px] h-[32px] bg-gray-200/30 dark:bg-gray-700/30 rounded-full" />
		);
	}

	const isLight = theme === "light";

	return (
		<div className="relative">
			<motion.button
				className="w-[62px] h-[32px] bg-gray-200/30 dark:bg-gray-700/30 rounded-full relative cursor-pointer overflow-hidden"
				onClick={() => setTheme(isLight ? "dark" : "light")}
				aria-label="Toggle theme"
				whileHover={{
					rotate: [-1, 1, -1],
					transition: { repeat: 3, duration: 0.3 },
				}}
			>
				{/* Background track */}
				<div className="absolute inset-0 flex items-center px-1">
					<div className="flex-1 h-full flex justify-between items-center px-2">
						<Sun className="w-3.5 h-3.5 text-gray-400/40" />
						<Moon className="w-3.5 h-3.5 text-gray-400/40" />
					</div>
				</div>

				{/* Sliding handle with active icon */}
				<motion.div
					layout
					className="absolute top-[4px] left-[4px] w-[24px] h-[24px] bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center"
					animate={{
						x: isLight ? 0 : 30,
					}}
					transition={{
						type: "spring",
						stiffness: 500,
						damping: 30,
						mass: 0.8,
					}}
					initial={false}
				>
					<AnimatePresence mode="wait" initial={false}>
						<motion.div
							key={theme}
							initial={{ scale: 0.5, rotate: -30, opacity: 0 }}
							animate={{
								scale: 1,
								rotate: 0,
								opacity: 1,
							}}
							exit={{
								scale: 0.5,
								rotate: 30,
								opacity: 0,
							}}
							transition={{
								duration: 0.2,
								ease: "easeInOut",
							}}
						>
							{isLight ? (
								<Sun className="w-4 h-4 text-yellow-500" />
							) : (
								<Moon className="w-4 h-4 text-blue-400" />
							)}
						</motion.div>
					</AnimatePresence>
				</motion.div>
			</motion.button>
		</div>
	);
}
