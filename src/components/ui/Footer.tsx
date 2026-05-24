"use client";

import Image from "next/image";
import Link from "next/link";
import { usePageTransition } from "./PageTransition";

export default function Footer() {
  const { startTransition } = usePageTransition();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") || href.startsWith("http")) return;
    e.preventDefault();
    startTransition(href);
  };

  return (
    <footer className="relative border-t border-[var(--color-brand-border)] bg-[var(--color-brand-dark)] overflow-hidden mt-20">
      {/* Glow Divider */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-brand-blue)]/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px shadow-[0_0_20px_2px_rgba(0,229,255,0.7)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link 
              href="/" 
              onClick={(e) => handleNavClick(e, "/")}
              className="inline-flex items-center gap-3 mb-6 group"
            >
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/assets/icon.png"
                  alt="Nitrozen Official Logo"
                  fill
                  sizes="40px"
                  className="object-contain drop-shadow-[0_0_8px_rgba(0,229,255,0.5)] group-hover:drop-shadow-[0_0_14px_rgba(0,229,255,0.8)] transition-all"
                />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Nitrozen <span className="text-[var(--color-brand-blue)]">Official</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
              The next-generation AI music experience for Discord. Smart playlists, seamless playback, and ultra-low latency.
            </p>
            <div className="flex gap-4">
              <Link href="https://discord.gg/rFpvjVm6SU" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue)]/10 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/features" 
                  onClick={(e) => handleNavClick(e, "/features")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li><Link href="/features#commands" className="text-gray-400 hover:text-white transition-colors">Commands</Link></li>
              <li><Link href="https://discord.com/oauth2/authorize?client_id=1417772882477449226&permissions=368438745&scope=bot+applications.commands" className="text-[var(--color-brand-blue)] hover:text-white transition-colors">Premium</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/privacy" 
                  onClick={(e) => handleNavClick(e, "/privacy")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  onClick={(e) => handleNavClick(e, "/terms")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/refund" 
                  onClick={(e) => handleNavClick(e, "/refund")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Nitrozen Official. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
