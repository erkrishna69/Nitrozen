"use client";

import { motion } from "framer-motion";
import { Terminal, Bot, Play, Music, Users, ChevronRight, Activity, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function formatDuration(ms: number) {
  if (!ms) return "0:00";
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [liveData, setLiveData] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const fetchLive = () => {
      fetch(`/api/stats`)
        .then(res => {
          if (!res.ok) throw new Error("Failed");
          return res.json();
        })
        .then(data => setLiveData(data))
        .catch(() => { });
    };
    fetchLive();
    const interval = setInterval(fetchLive, 5000); // refresh live activity every 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const nowPlaying = liveData?.liveActivity?.nowPlaying || {
    title: "Starboy (feat. Daft Punk)",
    author: "The Weeknd",
    position: 84000,
    length: 230000,
    isAi: true
  };

  const upcoming = liveData?.liveActivity?.upcoming?.length > 0 ? liveData?.liveActivity?.upcoming : [
    { title: "Blinding Lights", author: "The Weeknd" },
    { title: "I Feel It Coming", author: "The Weeknd" }
  ];

  const serverCount = liveData?.totalServers || "10k+";
  const activeNode = liveData?.liveActivity?.node || "KXO 2.0";

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[var(--color-brand-blue)]/20 rounded-full blur-[120px] mix-blend-screen animate-float"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[var(--color-brand-purple)]/20 rounded-full blur-[150px] mix-blend-screen animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Column: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-blue)]/10 border border-[var(--color-brand-blue)]/20 text-[var(--color-brand-blue)] text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-blue)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-brand-blue)]"></span>
              </span>
              Nitrozen 2.0 is live
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter mb-6">
              AI-Powered <br />
              Music Experience <br />
              <span className="neon-text">for Discord</span>
            </h1>

            <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
              Transform your server's vibe with ultra-low latency playback, smart AI playmixes, and crystal clear 24/7 audio quality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="https://discord.com/oauth2/authorize?client_id=1417772882477449226&permissions=368438745&scope=bot+applications.commands" target="_blank" className="relative group px-8 py-4 rounded-xl bg-[var(--color-brand-blue)] overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative z-10 flex items-center justify-center gap-2 text-[var(--color-brand-black)] font-bold text-lg">
                  <Bot className="w-5 h-5" />
                  Invite Bot
                </span>
              </Link>

              <Link href="#stats" className="px-8 py-4 rounded-xl glass-card text-white font-bold text-lg hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                <Terminal className="w-5 h-5 text-gray-400" />
                Live Stats
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4 text-sm text-gray-500 font-medium mt-6">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Trusted by <strong className="text-white">{serverCount}</strong> Servers</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>99.99% Uptime</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Fake Dashboard UI */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-md"
          >
            {/* Glow Behind Dashboard */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-brand-blue)] to-[var(--color-brand-purple)] rounded-3xl blur-2xl opacity-20"></div>

            <div className="glass-card rounded-3xl p-6 relative border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Live Activity
                </h3>
                <span className="text-xs font-mono text-[var(--color-brand-blue)] bg-[var(--color-brand-blue)]/10 px-2 py-1 rounded">
                  Node: {activeNode}
                </span>
              </div>

              {/* Now Playing Widget */}
              <div className="bg-white/5 rounded-2xl p-4 mb-4 border border-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-lg relative overflow-hidden">
                    {/* Fake Waveform Animation */}
                    <div className="absolute bottom-0 w-full flex items-end justify-center gap-1 p-2 h-full opacity-50">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 bg-[var(--color-brand-blue)] rounded-t-sm"
                          animate={{ height: ["20%", "80%", "40%", "100%", "20%"] }}
                          transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                    <Music className="w-6 h-6 text-white relative z-10" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold truncate max-w-[200px]">{nowPlaying.title}</h4>
                    <p className="text-gray-400 text-sm truncate max-w-[200px]">{nowPlaying.author}</p>
                    {nowPlaying.isAi && (
                      <span className="inline-block mt-1 text-[10px] uppercase tracking-wider font-bold text-[var(--color-brand-purple)] bg-[var(--color-brand-purple)]/10 px-2 py-0.5 rounded">
                        AI Radio
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-purple)]"
                      style={{ width: `${(nowPlaying.position / nowPlaying.length) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 font-mono">
                    <span>{formatDuration(nowPlaying.position)}</span>
                    <span>{formatDuration(nowPlaying.length)}</span>
                  </div>
                </div>
              </div>

              {/* Queue Preview */}
              <div>
                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Up Next</h5>
                <div className="space-y-2">
                  {upcoming.map((track: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600 font-mono text-sm group-hover:text-[var(--color-brand-blue)] transition-colors">0{i + 1}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-200 truncate max-w-[150px]">{track.title}</p>
                          <p className="text-xs text-gray-500 truncate max-w-[150px]">{track.author}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-[var(--color-brand-blue)] transition-colors" />
                    </div>
                  ))}
                  {upcoming.length === 0 && (
                    <div className="text-center p-2 text-sm text-gray-500">Queue is empty</div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
