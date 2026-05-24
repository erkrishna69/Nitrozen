"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Terminal, Bot, Users, Activity, Sparkles, Music, Play, Disc } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePageTransition } from "../ui/PageTransition";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [liveData, setLiveData] = useState<any>(null);
  const { startInviteRedirect, startTransition } = usePageTransition();
  const containerRef = useRef(null);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleInviteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = "https://discord.com/oauth2/authorize?client_id=1417772882477449226&permissions=368438745&scope=bot+applications.commands";
    startInviteRedirect(href);
  };

  const handleStatsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition("/stats");
  };

  useEffect(() => {
    setMounted(true);
    const fetchLive = () => {
      fetch(`/api/stats`)
        .then(res => res.json())
        .then(data => setLiveData(data))
        .catch(() => { });
    };
    fetchLive();
    const interval = setInterval(fetchLive, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const serverCount = liveData?.totalServers || "87";

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-32"
    >
      {/* --- LUXURY RAVE BACKGROUND --- */}
      
      {/* 1. Radial Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-teal-500/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full"></div>
      </div>

      {/* 2. Floating Music Notes (Particles) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "110%", 
              opacity: 0,
              rotate: 0
            }}
            animate={{ 
              y: "-10%",
              opacity: [0, 0.3, 0],
              rotate: 360
            }}
            transition={{ 
              duration: Math.random() * 15 + 15, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 20
            }}
            className="absolute"
          >
            <Music className="w-4 h-4 text-gray-500/30" />
          </motion.div>
        ))}
      </div>

      {/* 3. Audio Waveform Background */}
      <div className="absolute bottom-0 inset-x-0 h-64 z-0 opacity-20 flex items-end justify-center gap-1 px-4">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              height: [20, Math.random() * 150 + 40, 20]
            }}
            transition={{ 
              duration: 0.5 + Math.random() * 0.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1 md:w-2 bg-gradient-to-t from-[var(--color-brand-blue)] to-transparent rounded-t-full"
          />
        ))}
      </div>

      {/* 4. Decorative 3D elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[20%] left-[5%] opacity-10 hidden lg:block"
        >
          <Disc className="w-64 h-64 text-white animate-spin-slow" />
        </motion.div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          style={{ opacity }}
          className="flex flex-col items-center text-center"
        >
          {/* Main Title with Cinematic Word Entrance */}
          <div className="mb-10 overflow-hidden">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight uppercase">
              <motion.span 
                initial={{ x: -100, opacity: 0, rotate: -5 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                AI-POWERED
              </motion.span>
              <motion.span 
                initial={{ x: 100, opacity: 0, rotate: 5 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-magenta-500"
                style={{ 
                  backgroundImage: "linear-gradient(to right, #00E5FF, #B535F6, #FF2E93)",
                  WebkitBackgroundClip: "text"
                }}
              >
                MUSIC
              </motion.span>
              <motion.span 
                initial={{ y: 50, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                FOR DISCORD
              </motion.span>
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed font-medium tracking-wide uppercase"
          >
            Transform your server vibe with ultra-low latency playback, smart AI playmixes, and crystal clear 24/7 audio quality.
          </motion.p>

          {/* CTA Buttons - Luxury Refined */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-8 justify-center w-full sm:w-auto items-center mb-24"
          >
            <Link 
              href="https://discord.com/oauth2/authorize?client_id=1417772882477449226&permissions=368438745&scope=bot+applications.commands" 
              onClick={handleInviteClick}
              target="_blank" 
              className="relative px-12 py-5 rounded-2xl bg-white text-black font-black text-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              INVITE BOT
            </Link>

            <Link 
              href="/stats" 
              onClick={handleStatsClick}
              className="group px-12 py-5 rounded-2xl border border-white/10 glass-card text-white font-black text-xl hover:bg-white/5 transition-all flex items-center gap-3"
            >
              <span className="text-[var(--color-brand-blue)] group-hover:animate-pulse">{">"}</span>
              LIVE STATS
            </Link>
          </motion.div>

          {/* Stats Row - Luxury Refined */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-12 border-t border-white/5 pt-12 w-full"
          >
            <div className="text-center px-4">
              <p className="text-4xl font-black text-white mb-1">{serverCount}</p>
              <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Trusted Servers</span>
            </div>
            
            <div className="w-px h-8 bg-white/5 hidden md:block"></div>

            <div className="text-center px-4">
              <p className="text-4xl font-black text-white mb-1">99.9%</p>
              <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Uptime Ratio</span>
            </div>

            <div className="w-px h-8 bg-white/5 hidden md:block"></div>

            <div className="text-center px-4">
              <p className="text-4xl font-black text-white mb-1">HI-FI</p>
              <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Audio Quality</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
