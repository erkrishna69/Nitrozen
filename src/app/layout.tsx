import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import CursorTracker from "@/components/ui/CursorTracker";
import PageTransitionProvider from "@/components/ui/PageTransition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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
      className={`${inter.variable} ${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#08080f] text-slate-300 font-inter selection:bg-[var(--color-brand-blue)]/30 selection:text-white">
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
