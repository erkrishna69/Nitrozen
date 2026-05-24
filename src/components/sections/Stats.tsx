"use client";

import { motion } from "framer-motion";
import { Server, Users, Music, Activity, Cpu, Zap, Headphones, Clock, Terminal, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePageTransition } from "../ui/PageTransition";

// Helper to format large numbers
const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

export default function Stats() {
  const [mounted, setMounted] = useState(false);
  const { startTransition } = usePageTransition();
  const [stats, setStats] = useState({
    totalServers: 0,
    activeUsers: 0,
    mainServerMembers: 0,
    songsPlayed: 0,
    nodesOnline: 0,
    voiceConnections: 0,
    commandsRun: 0,
    liveSessions: 0,
    uptime: "0.00",
    latencies: { bot: 0, db: 0, api: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Fetch real data from the bot API
    const fetchStats = async () => {
      try {
        const fetchStart = Date.now();
        const res = await fetch(`/api/stats`).catch(() => null);
        if (res && res.ok) {
          const data = await res.json();
          // Calculate website latency
          data.latencies.website = Date.now() - fetchStart;
          setStats(data);
        }
      } catch (err) {
        // Silently ignore to avoid dev overlay
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // Poll every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const statsData = [
    { label: "Total Servers", value: stats.totalServers, icon: Server, color: "text-blue-400" },
    { label: "Active Users", value: stats.activeUsers, icon: Users, color: "text-purple-400" },
    { label: "Songs Played", value: stats.songsPlayed, icon: Music, color: "text-pink-400" },
    { label: "Main Server", value: stats.mainServerMembers, icon: Users, color: "text-green-400", suffix: " Members" },
    { label: "Voice Connections", value: stats.voiceConnections, icon: Headphones, color: "text-indigo-400" },
    { label: "Commands Run", value: stats.commandsRun, icon: Terminal, color: "text-yellow-400" },
    { label: "Bot Latency", value: stats.latencies?.bot || 0, icon: Activity, color: "text-red-400", suffix: "ms" },
    { label: "DB Latency", value: stats.latencies?.db || 0, icon: Zap, color: "text-orange-400", suffix: "ms" },
  ];

  return (
    <section id="stats" className="py-24 relative overflow-hidden bg-[var(--color-brand-black)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-gray-300 tracking-widest uppercase">Live Network</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight"
          >
            Powering thousands of <br />
            <span className="neon-text-purple text-[var(--color-brand-purple)]">communities</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.1,
                type: "spring",
                bounce: 0.4
              }}
              className="glass-card p-8 rounded-[2rem] flex flex-col items-center text-center group hover:bg-white/5 transition-colors relative overflow-hidden"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className={`inline-flex p-4 rounded-2xl bg-white/5 mb-4 group-hover:scale-110 transition-transform ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>

              <h3 className="text-4xl font-black text-white mb-2 tracking-tighter">
                {loading ? (
                  <span className="inline-block w-16 h-8 bg-white/10 rounded animate-pulse"></span>
                ) : (
                  <>
                    {typeof stat.value === "string" ? stat.value : formatNumber(stat.value)}
                    {stat.suffix && <span className="text-xl text-gray-500">{stat.suffix}</span>}
                  </>
                )}
              </h3>

              <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link 
            href="/stats"
            onClick={(e) => {
              e.preventDefault();
              startTransition("/stats");
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[var(--color-brand-blue)]/50 transition-all text-white font-bold group"
          >
            View Detailed Analytics
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
