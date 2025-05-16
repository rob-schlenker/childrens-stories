"use client";
import { useState, useRef, useEffect } from "react";
import { storySites } from "./StorySitesSection";
import { Search } from "lucide-react";

export default function NavSearchBar({
	hideLinksOnExpand = false,
}: { hideLinksOnExpand?: boolean } = {}) {
	const [search, setSearch] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const searchButtonRef = useRef<HTMLButtonElement>(null);

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
		if (expanded && inputRef.current) {
			inputRef.current.focus();
		}
	}, [expanded]);

	return (
		<div className="relative flex items-center">
			{/* Hide nav items when search is expanded (desktop only) */}
			{!expanded && !hideLinksOnExpand && (
				<>
					<a
						href="/"
						className="ml-4 hover:underline font-medium hidden sm:inline"
					>
						Home
					</a>
					<a
						href="/favorites"
						className="ml-4 hover:underline font-medium hidden sm:inline"
					>
						Favorites
					</a>
				</>
			)}
			<button
				ref={searchButtonRef}
				type="button"
				aria-label="Open search"
				className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
					expanded ? "bg-gray-200 dark:bg-gray-700" : ""
				}`}
				onClick={() => setExpanded((prev) => !prev)}
			>
				<Search className="w-5 h-5" />
			</button>
			<form
				className={`relative transition-all duration-200 overflow-visible ${
					expanded ? "w-[150px] sm:w-56 opacity-100 ml-4" : "w-0 opacity-0"
				} flex-shrink-0`}
				onSubmit={(e) => e.preventDefault()}
				autoComplete="off"
			>
				<input
					ref={inputRef}
					type="text"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						setShowDropdown(true);
					}}
					placeholder="Search sites..."
					className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
				{showDropdown && search.trim() && (
					<div
						ref={dropdownRef}
						className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg max-h-60 overflow-y-auto z-30 w-[150px] sm:w-auto"
					>
						{filteredSites.length === 0 ? (
							<div className="p-4 text-gray-500 text-center">No results</div>
						) : (
							filteredSites.map((site) => (
								<a
									key={site.id}
									href={site.url}
									target="_blank"
									rel="noopener noreferrer"
									className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer"
									onClick={() => {
										setShowDropdown(false);
										setExpanded(false);
										setSearch("");
									}}
								>
									<span className="font-semibold">{site.name}</span>
									<span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
										{site.description}
									</span>
								</a>
							))
						)}
					</div>
				)}
			</form>
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
				className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ${
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
				<div className="flex flex-col items-start mt-16 gap-6 px-6">
					<a
						href="/"
						className="text-lg font-bold hover:underline"
						onClick={() => setOpen(false)}
					>
						Home
					</a>
					<a
						href="/favorites"
						className="text-lg font-bold hover:underline"
						onClick={() => setOpen(false)}
					>
						Favorites
					</a>
					<NavSearchBar />
				</div>
			</nav>
		</>
	);
}
