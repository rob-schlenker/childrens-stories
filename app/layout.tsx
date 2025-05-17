import "./globals.css";
import { Inter, Great_Vibes } from "next/font/google";
import ThemeToggle from "./_components/ThemeToggle";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import NavSearchBar, { HamburgerNav } from "./_components/NavSearchBar";
import Footer from "./_components/Footer";
import Image from "next/image";
import Link from "next/link";

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
						<div className="relative mx-auto max-w-5xl flex items-center justify-between">
							{/* Left: Logo */}
							<div className="flex items-center flex-shrink-0">
								<Link href="/" className="flex items-center" aria-label="Home">
									<Image
										src="/starlit-library-logo-removebg-preview.png"
										alt="Starlit Library Logo"
										width={40}
										height={40}
										className="object-contain"
										priority
									/>
									<span
										className={`ml-3 text-2xl text-[#232946] dark:text-white hidden sm:inline ${greatVibes.className}`}
									>
										Starlit Library
									</span>
								</Link>
							</div>

							{/* Center: Search */}
							<div className="flex-1 flex justify-center px-4 max-w-xl">
								<nav className="hidden sm:block w-full">
									<NavSearchBar />
								</nav>
							</div>

							{/* Right: Mobile menu and theme toggle */}
							<div className="flex items-center gap-4 flex-shrink-0">
								<div className="sm:hidden">
									<HamburgerNav />
								</div>
								<div className="hidden sm:block">
									<ThemeToggle />
								</div>
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
