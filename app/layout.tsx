import "./globals.css";
import { Inter } from "next/font/google";
import ThemeToggle from "./_components/ThemeToggle";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Children's Stories",
  description: "Read and favorite free children's stories.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <nav className="flex gap-4">
            <a href="/" className="hover:underline">Home</a>
            <a href="/favorites" className="hover:underline">Favorites</a>
          </nav>
            <header className="flex items-center justify-between p-4 border-b">
            <h1 className="text-2xl font-bold">Children's Stories</h1>
            <ThemeToggle />
          </header>
        <main className="max-w-3xl mx-auto p-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}