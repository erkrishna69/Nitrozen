"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Trophy, Star, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Voting() {
  const [stats, setStats] = useState({ rating: 4.9, reviews: 1200 });
  const [loading, setLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRedirecting(true);
    setTimeout(() => {
      window.open("https://top.gg/bot/1417772882477449226/vote", "_blank");
      setIsRedirecting(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats').catch(() => null);
        if (res && res.ok) {
          const data = await res.json();
          if (data.topggStats) {
            setStats({
              rating: data.topggStats.rating || 4.9,
              reviews: data.topggStats.reviews || 1200
            });
          }
        }
      } catch (err) {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-brand-black)]/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 20 }}
              className="text-center"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-[var(--color-brand-blue)]/20 blur-3xl rounded-full animate-pulse"></div>
                <Loader2 className="w-16 h-16 text-[var(--color-brand-blue)] animate-spin relative z-10 mx-auto" />
              </div>
              <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">Redirecting to Top.gg</h3>
              <p className="text-gray-400 font-medium">Preparing your voting perks...</p>
              
              <div className="mt-8 flex gap-1 justify-center">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[var(--color-brand-blue)]"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-[var(--color-brand-blue)]/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 md:p-12 text-center border-[var(--color-brand-blue)]/20 shadow-[0_0_50px_rgba(0,229,255,0.1)] relative overflow-hidden group"
        >
          {/* Animated border line */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-brand-blue)] to-transparent opacity-50"></div>
          
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-purple)] rounded-full p-0.5 mb-8 shadow-[0_0_30px_rgba(0,229,255,0.4)]">
            <div className="w-full h-full bg-[var(--color-brand-dark)] rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-[var(--color-brand-blue)]" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Support <span className="neon-text-blue text-[var(--color-brand-blue)]">Nitrozen</span>
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Vote for us on Top.gg and help the community grow. Voters receive exclusive perks including priority AI generation and premium audio filters for 12 hours!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={handleVote}
              className="relative group/btn px-8 py-4 rounded-xl bg-white text-[var(--color-brand-black)] font-bold text-lg overflow-hidden w-full sm:w-auto flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Vote on Top.gg <ArrowUpRight className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
            </button>
            
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={`w-5 h-5 ${i <= Math.round(stats.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} />
                ))}
              </div>
              <span className="text-sm font-medium ml-2">
                {loading ? (
                  <span className="inline-block w-12 h-4 bg-white/10 rounded animate-pulse"></span>
                ) : (
                  `${stats.rating}/5 (${stats.reviews >= 1000 ? (stats.reviews / 1000).toFixed(1) + 'k' : stats.reviews} Reviews)`
                )}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
