"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePageTransition } from "./PageTransition";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { startTransition, startInviteRedirect } = usePageTransition();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) return;
    if (href.includes("discord.com/oauth2/authorize")) {
      e.preventDefault();
      startInviteRedirect(href);
      return;
    }
    if (href.startsWith("http")) return;
    e.preventDefault();
    startTransition(href);
  };

  const handleInviteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = "https://discord.com/oauth2/authorize?client_id=1417772882477449226&permissions=368438745&scope=bot+applications.commands";
    startInviteRedirect(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "bg-[var(--color-brand-black)]/80 backdrop-blur-xl border-[var(--color-brand-border)] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-2"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            href="/" 
            onClick={(e) => handleNavClick(e, "/")}
            className="flex-shrink-0 flex items-center gap-2 group"
          >
            <div className="relative w-9 h-9">
              <Image
                src="/assets/icon.png"
                alt="Nitrozen Official Logo"
                fill
                priority
                sizes="36px"
                className="object-contain drop-shadow-[0_0_8px_rgba(0,229,255,0.6)] group-hover:drop-shadow-[0_0_14px_rgba(0,229,255,0.9)] transition-all"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Nitrozen <span className="text-[var(--color-brand-blue)]">Official</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/features" 
              onClick={(e) => handleNavClick(e, "/features")}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Features
            </Link>
            <Link 
              href="/stats" 
              onClick={(e) => handleNavClick(e, "/stats")}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Stats
            </Link>
            <Link href="/#community" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Community</Link>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <Terminal className="w-4 h-4" />
                Dashboard
              </Link>
              <Link 
                href="https://discord.com/oauth2/authorize?client_id=1417772882477449226&permissions=368438745&scope=bot+applications.commands" 
                onClick={handleInviteClick}
                target="_blank" 
                className="relative group px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all overflow-hidden"
              >
                <span className="relative z-10 text-sm font-bold text-white group-hover:text-[var(--color-brand-blue)] transition-colors">
                  Invite Bot
                </span>
                <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-[var(--color-brand-blue)]/50 transition-all"></div>
                <div className="absolute inset-0 bg-[var(--color-brand-blue)] opacity-0 group-hover:opacity-10 blur-xl transition-all"></div>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[var(--color-brand-dark)]/95 backdrop-blur-xl border-b border-[var(--color-brand-border)]"
        >
          <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
            <Link 
              href="/features" 
              onClick={(e) => handleNavClick(e, "/features")}
              className="text-gray-300 font-medium py-2"
            >
              Features
            </Link>
            <Link 
              href="/stats" 
              onClick={(e) => handleNavClick(e, "/stats")}
              className="text-gray-300 font-medium py-2"
            >
              Stats
            </Link>
            <Link href="/#community" className="text-gray-300 font-medium py-2">Community</Link>
            <Link href="#" className="text-gray-300 font-medium py-2 flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Dashboard
            </Link>
            <Link 
              href="https://discord.com/oauth2/authorize?client_id=1417772882477449226&permissions=368438745&scope=bot+applications.commands" 
              onClick={handleInviteClick}
              target="_blank" 
              className="w-full text-center bg-[var(--color-brand-blue)]/10 border border-[var(--color-brand-blue)]/50 text-[var(--color-brand-blue)] font-bold py-3 rounded-xl mt-4 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
            >
              Invite Bot
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
