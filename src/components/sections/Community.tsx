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
        const res = await fetch(`/api/stats`).catch(() => null);
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
        <div className="flex flex-col items-center text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
              Join the <span className="neon-text-blue text-[var(--color-brand-blue)]">Community</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Get 24/7 support, share your AI-generated playlists, and connect with thousands of other music enthusiasts in our official Discord server.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-brand-blue)]/10 flex items-center justify-center text-[var(--color-brand-blue)]">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h4 className="text-white text-xl font-bold">
                    {loading ? (
                      <span className="inline-block w-24 h-6 bg-white/10 rounded animate-pulse"></span>
                    ) : (
                      `${stats.mainServerMembers || '1k'}+ Members`
                    )}
                  </h4>
                  <p className="text-sm text-gray-400">Active and growing daily</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h4 className="text-white text-xl font-bold">Dedicated Support</h4>
                  <p className="text-sm text-gray-400">Fast response times from staff</p>
                </div>
              </div>
            </div>

            <Link href="https://discord.gg/rFpvjVm6SU" target="_blank" className="inline-flex px-10 py-5 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-xl transition-all items-center gap-3 shadow-[0_0_30px_rgba(88,101,242,0.4)] hover:scale-105 active:scale-95">
              <MessageSquare className="w-6 h-6" />
              Join Official Discord <ArrowRight className="w-6 h-6 ml-1" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
