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
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-semibold text-slate-400 tracking-[0.2em] uppercase">Live Network Pulse</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight-premium text-balance"
          >
            Powering thousands of <br />
            <span className="text-gradient-purple neon-text-purple">communities</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statsData.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: i * 0.05
              }}
              className="glass-card p-8 rounded-[2rem] flex flex-col items-center text-center group hover:border-[var(--color-brand-purple)]/30 transition-all duration-500 relative overflow-hidden"
            >
              {/* Subtle Gradient Accent */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>

              <div className={`inline-flex p-3.5 rounded-2xl bg-white/5 mb-6 group-hover:scale-110 transition-transform duration-500 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tabular-nums font-mono tracking-tight">
                {loading ? (
                  <span className="inline-block w-16 h-8 bg-white/10 rounded-lg animate-pulse"></span>
                ) : (
                  <>
                    {typeof stat.value === "string" ? stat.value : formatNumber(stat.value)}
                    {stat.suffix && <span className="text-lg font-normal text-slate-500 ml-1">{stat.suffix}</span>}
                  </>
                )}
              </h3>

              <p className="text-[10px] md:text-xs text-slate-500 font-semibold uppercase tracking-[0.15em]">
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
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[var(--color-brand-blue)]/50 transition-all text-white font-semibold group tracking-premium"
          >
            View Detailed Analytics
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
