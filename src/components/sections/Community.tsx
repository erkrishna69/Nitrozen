"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Define the shape of a recent command for TS safety
type RecentCommand = {
  user: string;
  avatar: string;
  command: string;
  time: number;
};

type StatsState = {
  mainServerMembers: number;
  recentCommands: RecentCommand[];
};

export default function Community() {
  const [stats, setStats] = useState<StatsState>({
    mainServerMembers: 0,
    recentCommands: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || `${window.location.protocol}//${window.location.hostname}:3001/api`;
        const res = await fetch(`${apiBase}/stats`).catch(() => null);
        if (res && res.ok) {
          const data = await res.json();
          setStats({
            mainServerMembers: data.mainServerMembers,
            recentCommands: data.recentCommands || []
          });
        }
      } catch (e) {
        // ignore errors
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return null;

  return (
    <section id="community" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
              Join the <span className="neon-text-blue text-[var(--color-brand-blue)]">Community</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
              Get 24/7 support, share your AI-generated playlists, and connect with thousands of other music enthusiasts in our official Discord server.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center text-[var(--color-brand-blue)]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold">{stats.mainServerMembers ? `${stats.mainServerMembers}+ Members` : 'Loading...'}</h4>
                  <p className="text-sm text-gray-400">Active and growing daily</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Dedicated Support</h4>
                  <p className="text-sm text-gray-400">Fast response times from staff</p>
                </div>
              </div>
            </div>

            <Link href="https://discord.gg/rFpvjVm6SU" target="_blank" className="inline-flex px-8 py-4 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-lg transition-colors items-center gap-2 shadow-[0_0_20px_rgba(88,101,242,0.4)]">
              <MessageSquare className="w-5 h-5" />
              Join Official Discord <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Fake Discord UI */}
            <div className="glass-card rounded-xl border-white/10 overflow-hidden shadow-2xl">
              <div className="bg-black/60 px-4 py-3 border-b border-white/5 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                <div className="font-bold text-gray-300 text-sm flex items-center gap-2">
                  <span className="text-gray-500">#</span> general-chat
                </div>
              </div>

              <div className="p-6 space-y-6 bg-[var(--color-brand-dark)]/50 min-h-[300px]">
                {/* Render recent commands */}
                {stats.recentCommands.length === 0 && (
                  <p className="text-gray-400 text-sm">No recent commands.</p>
                )}
                {stats.recentCommands.map((cmd, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <img src={cmd.avatar} alt={cmd.user} className="w-10 h-10 rounded-full" />
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-white font-medium text-sm">{cmd.user}</span>
                        <span className="text-xs text-gray-500">{new Date(cmd.time).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-gray-300 text-sm mt-1">Executed <code className="bg-gray-800 px-1 rounded">{cmd.command}</code></p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-black/40 border-t border-white/5">
                <div className="w-full bg-white/5 rounded-lg h-10 px-4 flex items-center text-sm text-gray-500">
                  Message #general-chat...
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -right-6 -top-6 w-12 h-12 rounded-xl bg-purple-500/20 backdrop-blur-md border border-purple-500/30 flex items-center justify-center animate-bounce" style={{ animationDuration: '3s' }}>
              <span className="text-xl">🚀</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
