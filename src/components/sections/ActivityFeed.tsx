"use client";

import { motion } from "framer-motion";
import { Music, Bot, Sparkles, LogIn } from "lucide-react";
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full border-y border-white/5 bg-black/50 py-4 overflow-hidden relative flex">
      {/* Fade Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--color-brand-black)] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--color-brand-black)] to-transparent z-10"></div>
      
      <motion.div 
        animate={{ x: [0, -1000] }} 
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        className="flex whitespace-nowrap gap-8 px-4"
      >
        {/* Double array for seamless loop */}
        {[...activities, ...activities, ...activities].map((item, i) => (
          <div key={i} className="flex items-center gap-3 glass-card px-4 py-2 rounded-full border-white/5">
            <item.icon className={`w-4 h-4 ${item.color}`} />
            <span className="text-sm text-gray-300">{item.text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
