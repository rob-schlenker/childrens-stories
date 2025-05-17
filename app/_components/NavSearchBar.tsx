"use client";

import { useState, useRef, useEffect } from "react";
import { storySites } from "./StorySitesSection";
import { Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

export default function NavSearchBar({
	hideLinksOnExpand = false,
}: { hideLinksOnExpand?: boolean } = {}) {
	const [mounted, setMounted] = useState(false);
	const [search, setSearch] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const searchButtonRef = useRef<HTMLButtonElement>(null);

	// Mount effect to handle hydration
	useEffect(() => {
		setMounted(true);
	}, []);

	// Filter sites by name or description
	const filteredSites = search.trim()
		? storySites.filter(
				(site) =>
					site.name.toLowerCase().includes(search.toLowerCase()) ||
					site.description.toLowerCase().includes(search.toLowerCase())
		  )
		: [];

	// Handle outside click to close search and dropdown
	useEffect(() => {
		function handleOutsideClick(e: MouseEvent) {
			const target = e.target as Node;

			// Don't close if clicking within the search components
			if (
				dropdownRef.current?.contains(target) ||
				inputRef.current?.contains(target) ||
				searchButtonRef.current?.contains(target)
			) {
				return;
			}

			setShowDropdown(false);
			setExpanded(false);
		}

		if (expanded || showDropdown) {
			document.addEventListener("mousedown", handleOutsideClick);
		}

		return () => document.removeEventListener("mousedown", handleOutsideClick);
	}, [expanded, showDropdown]);

	// Auto-focus input when expanded
	useEffect(() => {
		if (expanded && inputRef.current && mounted) {
			inputRef.current.focus();
		}
	}, [expanded, mounted]);

	// Return null or a loading state before mounting
	if (!mounted) {
		return (
			<div className="relative flex items-center justify-center gap-2">
				<div className="hidden sm:flex items-center gap-6">
					<span className="font-medium">Loading...</span>
				</div>
				<button
					type="button"
					aria-label="Loading search"
					className="p-2 rounded-full"
					disabled
				>
					<Search className="w-5 h-5" />
				</button>
			</div>
		);
	}

	return (
		<div className="relative flex items-center justify-center gap-2">
			{/* Hide nav items when search is expanded (desktop only) */}
			{!expanded && !hideLinksOnExpand && (
				<div className="hidden sm:flex items-center gap-6">
					<Link href="/" className="font-medium hover:underline">
						Home
					</Link>
					<Link href="/favorites" className="font-medium hover:underline">
						Favorites
					</Link>
				</div>
			)}
			<div className="flex items-center">
				{expanded ? (
					<div
						className="flex items-center"
						style={{ width: expanded ? "300px" : "auto" }}
					>
						<input
							ref={inputRef}
							type="text"
							placeholder="Search story sites..."
							className="w-full p-2 rounded-lg bg-background border text-foreground"
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
								setShowDropdown(true);
							}}
						/>
					</div>
				) : (
					<button
						ref={searchButtonRef}
						type="button"
						onClick={() => setExpanded(true)}
						className="p-2 rounded-full hover:bg-accent"
						aria-label="Search"
					>
						<Search className="w-5 h-5" />
					</button>
				)}

				{/* Search Results Dropdown */}
				{showDropdown && search.trim() && (
					<div
						ref={dropdownRef}
						className="absolute top-full mt-2 w-[300px] max-h-[400px] overflow-y-auto bg-background border rounded-lg shadow-lg z-50"
					>
						{filteredSites.length > 0 ? (
							filteredSites.map((site) => (
								<a
									key={site.name}
									href={site.url}
									className="block p-3 hover:bg-accent border-b last:border-b-0"
								>
									<div className="font-medium">{site.name}</div>
									<div className="text-sm text-muted-foreground">
										{site.description}
									</div>
								</a>
							))
						) : (
							<div className="p-3 text-center text-muted-foreground">
								No results found
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export function HamburgerNav() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<button
				className="sm:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
				aria-label="Open menu"
				onClick={() => setOpen(true)}
			>
				<svg
					width="28"
					height="28"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					viewBox="0 0 24 24"
				>
					<path d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
			{/* Overlay */}
			{open && (
				<div
					className="fixed inset-0 z-40 bg-black/40"
					onClick={() => setOpen(false)}
				/>
			)}
			{/* Slide-in menu */}
			<nav
				className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ${
					open ? "translate-x-0" : "translate-x-full"
				} sm:hidden`}
				aria-label="Mobile menu"
			>
				<button
					className="absolute top-4 right-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
					aria-label="Close menu"
					onClick={() => setOpen(false)}
				>
					<svg
						width="28"
						height="28"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						<path d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
				<div className="flex flex-col mt-16 px-6">
					{/* Search Section */}
					<div className="mb-6">
						<NavSearchBar hideLinksOnExpand />
					</div>
					<div className="h-px bg-gray-200 dark:bg-gray-700 w-full mb-6" />
					{/* Navigation Links */}
					<Link
						href="/"
						className="text-lg font-bold hover:underline py-2"
						onClick={() => setOpen(false)}
					>
						Home
					</Link>
					<Link
						href="/favorites"
						className="text-lg font-bold hover:underline py-2"
						onClick={() => setOpen(false)}
					>
						Favorites
					</Link>
					<div className="h-px bg-gray-200 dark:bg-gray-700 w-full my-6" />
					{/* Theme Toggle Section */}
					<div className="flex items-center gap-3 py-2">
						<span className="text-sm font-medium text-gray-500 dark:text-gray-400">
							Theme
						</span>
						<ThemeToggle />
					</div>
				</div>
			</nav>
		</>
	);
}
