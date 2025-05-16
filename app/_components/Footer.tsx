"use client";
import { Github, Heart, Twitter } from "lucide-react";
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

				<nav className="flex items-center gap-6">
					<Link
						href="/privacy"
						className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
					>
						Privacy Policy
					</Link>
					<Link
						href="/terms"
						className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
					>
						Terms of Use
					</Link>
					<div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
						<a
							href="https://github.com/robschlenker"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
							aria-label="GitHub Profile"
						>
							<Github className="w-5 h-5" />
						</a>
						<a
							href="https://twitter.com/robschlenker"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
							aria-label="Twitter Profile"
						>
							<Twitter className="w-5 h-5" />
						</a>
					</div>
				</nav>
			</div>
		</footer>
	);
}
