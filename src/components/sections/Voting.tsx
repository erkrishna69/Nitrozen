"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Trophy, Star } from "lucide-react";

export default function Voting() {
  return (
    <section className="py-24 relative overflow-hidden">
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
            <button className="relative group/btn px-8 py-4 rounded-xl bg-white text-[var(--color-brand-black)] font-bold text-lg overflow-hidden w-full sm:w-auto flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                Vote on Top.gg <ArrowUpRight className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
            </button>
            
            <div className="flex items-center gap-2 text-gray-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <span className="text-sm font-medium ml-2">4.9/5 (1.2k Reviews)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
