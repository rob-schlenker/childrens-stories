import "./globals.css";
import { Inter, Great_Vibes } from "next/font/google";
import ThemeToggle from "./_components/ThemeToggle";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import TwinklingStarBackground from "./_components/TwinklingStarBackground";
import NavSearchBar, { HamburgerNav } from "./_components/NavSearchBar";
import Footer from "./_components/Footer";
import { Search } from "lucide-react";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });

export const metadata = {
	title: "Starlit Library",
	description: "Read and favorite free children's stories.",
};

interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} flex flex-col min-h-screen`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{/* Header */}
					<div className="fixed w-full z-20 bg-gray-100 dark:bg-gray-900 p-4">
						<div className="relative flex items-center justify-between max-w-5xl mx-auto">
							{/* Left: Logo */}
							<div className="flex items-center min-w-[120px]">
								<a href="/" aria-label="Home">
									<Image
										src="/starlit-library-logo-removebg-preview.png"
										alt="Starlit Library Logo"
										width={40}
										height={40}
										className="object-contain"
										priority
									/>
								</a>
								<span
									className={`ml-3 text-2xl text-[#232946] dark:text-white hidden sm:inline ${greatVibes.className}`}
								>
									Starlit Library
								</span>
							</div>

							{/* Center: Nav (hidden on mobile) */}
							<nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-6 items-center hidden sm:flex">
								{/* <a href="/" className="hover:underline">
									Home
								</a>
								<a href="/favorites" className="hover:underline">
									Favorites
								</a> */}
								<NavSearchBar />
							</nav>

							{/* Hamburger menu for mobile */}
							<div className="sm:hidden flex items-center">
								<HamburgerNav />
								<ThemeToggle />
							</div>

							{/* Right: Theme Toggle */}
							<div className="items-center min-w-[40px] justify-end  hidden sm:flex">
								<ThemeToggle />
							</div>
						</div>
					</div>

					<div className="h-[68px]" aria-hidden="true" />

					{/* Main Content */}
					<main className="flex-grow max-w-6xl w-full mx-auto p-4 relative z-10">
						{children}
					</main>

					{/* Footer */}
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
