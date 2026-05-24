import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";
import CursorTracker from "@/components/ui/CursorTracker";
import PageTransitionProvider from "@/components/ui/PageTransition";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nitrozen Official | Premium AI Music Experience for Discord",
  description: "Next-generation Discord music and AI recommendation bot. Smart playlists, ultra-fast playback, and multi-server support.",
  icons: {
    icon: "/assets/icon.png",
    apple: "/assets/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#08080f] text-gray-200 font-outfit">
        <div className="noise-overlay" />
        <div className="scanlines" />
        <PageTransitionProvider>
          {/* Glowing cursor ring – CursorTracker drives its position */}
          <div className="cursor-ring" id="cursor" />
          <CursorTracker />
          <main className="flex-1 flex flex-col relative">
            {children}
          </main>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
