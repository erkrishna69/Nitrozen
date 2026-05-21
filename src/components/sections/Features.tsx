"use client";

import { motion } from "framer-motion";
import { Brain, Layers, Activity, FastForward, Mic2, ShieldCheck, Sparkles, Filter, Infinity } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "AI Music Recommendations",
    description: "Our proprietary AI engine analyzes your listening history to generate the perfect queue.",
    icon: Brain,
    color: "from-blue-500/20 to-transparent",
    iconColor: "text-blue-400"
  },
  {
    title: "Smart Playmix",
    description: "Instantly create dynamic, endless radios based on a single track or artist.",
    icon: Sparkles,
    color: "from-purple-500/20 to-transparent",
    iconColor: "text-purple-400"
  },
  {
    title: "Multi-Node Streaming",
    description: "Load balancing across 4+ enterprise-grade Lavalink nodes for zero buffering.",
    icon: Layers,
    color: "from-green-500/20 to-transparent",
    iconColor: "text-green-400"
  },
  {
    title: "Ultra Low Latency",
    description: "Optimized connection pooling ensures immediate playback when you hit play.",
    icon: FastForward,
    color: "from-pink-500/20 to-transparent",
    iconColor: "text-pink-400"
  },
  {
    title: "Audio Filters",
    description: "Bassboost, Nightcore, 8D, Tremolo, and completely custom EQ settings.",
    icon: Filter,
    color: "from-yellow-500/20 to-transparent",
    iconColor: "text-yellow-400"
  },
  {
    title: "24/7 Mode",
    description: "Nitrozen stays in your voice channel permanently. Never stops the party.",
    icon: Infinity,
    color: "from-[var(--color-brand-blue)]/20 to-transparent",
    iconColor: "text-[var(--color-brand-blue)]"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4"
          >
            Built for <span className="neon-text-blue text-[var(--color-brand-blue)]">Performance</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Everything you need to manage your server's audio experience, packed into a sleek, lightning-fast bot.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Link key={i} href="/features" className="block outline-none focus:outline-none">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card rounded-3xl p-8 group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,229,255,0.2)] transition-all duration-300 relative overflow-hidden h-full border border-white/5 hover:border-[var(--color-brand-blue)]/30 cursor-pointer"
              >
                {/* Hover Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 relative`}>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl blur group-hover:blur-md transition-all"></div>
                  <feature.icon className="w-7 h-7 text-white relative z-10" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-[var(--color-brand-blue)] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Top right corner decorative accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
