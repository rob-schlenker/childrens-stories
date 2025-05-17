"use client";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full py-6 px-4 mt-16 border-t border-gray-200 dark:border-gray-800">
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
				<div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
					<p>© {currentYear} Rob Schlenker. All rights reserved.</p>
					<p className="mt-1">
						Made with <Heart className="w-4 h-4 inline-block text-red-500" />{" "}
						for young readers everywhere
					</p>
				</div>

			</div>
		</footer>
	);
}
