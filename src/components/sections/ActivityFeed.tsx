"use client";

import { motion } from "framer-motion";
import { Music, Bot, Sparkles, LogIn, Globe } from "lucide-react";
import { useEffect, useState } from "react";

const activities = [
  { icon: Music, text: "User123 played Starboy in Chill Hub", color: "text-pink-400" },
  { icon: Bot, text: "AI generated a night playlist for Server7", color: "text-purple-400" },
  { icon: Sparkles, text: "Nitrozen enabled 24/7 mode in Lofi Cafe", color: "text-blue-400" },
  { icon: LogIn, text: "Nitrozen joined The Hangout", color: "text-green-400" },
  { icon: Music, text: "xX_Gamer_Xx queued 15 tracks", color: "text-pink-400" },
  { icon: Bot, text: "Smart Playmix activated in Study VC", color: "text-purple-400" },
];

export default function ActivityFeed() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 15000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  // Real data mapping
  const realActivities = stats?.recentCommands?.map((cmd: any) => ({
    icon: Music,
    text: `${cmd.user} used /${cmd.command}`,
    color: "text-[var(--color-brand-blue)]"
  })) || [];

  // Fallback if no recent commands
  const displayActivities = realActivities.length > 0 ? realActivities : [
    { icon: Sparkles, text: `Active in ${stats?.totalServers || "1k+"} servers`, color: "text-blue-400" },
    { icon: Music, text: `${stats?.songsPlayed || "8k+"} songs played`, color: "text-pink-400" },
    { icon: Bot, text: `${stats?.voiceConnections || "0"} live voice sessions`, color: "text-purple-400" },
    { icon: Globe, text: "Serving high-quality audio worldwide", color: "text-green-400" },
  ];

  return (
    <div className="w-full border-y border-white/5 bg-black/40 backdrop-blur-sm py-5 overflow-hidden relative flex group">
      {/* Fade Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--color-brand-black)] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--color-brand-black)] to-transparent z-10"></div>
      
      <motion.div 
        animate={{ x: [0, -1500] }} 
        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
        className="flex whitespace-nowrap gap-12 px-8"
      >
        {/* Triple array for extra long seamless loop */}
        {[...displayActivities, ...displayActivities, ...displayActivities, ...displayActivities].map((item, i) => (
          <div key={i} className="flex items-center gap-4 glass-card px-6 py-2.5 rounded-full border-white/10 hover:border-[var(--color-brand-blue)]/30 transition-colors cursor-default">
            <item.icon className={`w-5 h-5 ${item.color} group-hover:animate-pulse`} />
            <span className="text-sm md:text-base font-medium text-gray-200 tracking-tight">{item.text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
