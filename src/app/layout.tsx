import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CursorTracker from "@/components/ui/CursorTracker";

const inter = Inter({
  variable: "--font-inter",
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
      className={`${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-brand-black)] text-gray-200">
        {/* Glowing cursor ring – CursorTracker drives its position */}
        <div className="cursor-ring" id="cursor" />
        <CursorTracker />
        <main className="flex-1 flex flex-col relative">
          {children}
        </main>
      </body>
    </html>
  );
}
