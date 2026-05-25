"use client";

import { motion } from "framer-motion";
import { Brain, Layers, Activity, FastForward, Mic2, ShieldCheck, Sparkles, Filter, Infinity, ArrowRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePageTransition } from "../ui/PageTransition";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const features: Feature[] = [
  {
    title: "AI Playmix",
    description: "Next-gen AI that understands your vibe and generates perfect recommendations.",
    icon: Brain,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Ultra Low Latency",
    description: "Experience music with zero lag thanks to our optimized global node network.",
    icon: Activity,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Crystal Clear Audio",
    description: "High-fidelity 384kbps audio streaming for the ultimate listening experience.",
    icon: Mic2,
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Smart Filters",
    description: "Apply professional audio filters in real-time with a single click.",
    icon: Filter,
    color: "from-yellow-500 to-orange-500"
  },
  {
    title: "24/7 Playback",
    description: "Your music never stops. Reliable uptime and automatic session resume.",
    icon: Infinity,
    color: "from-red-500 to-rose-500"
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade security protocols to keep your server and data protected.",
    icon: ShieldCheck,
    color: "from-indigo-500 to-blue-500"
  }
];

export default function Features() {
  const { startTransition } = usePageTransition();

  const handleFeatureClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    startTransition(href);
  };

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Cinematic Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[var(--color-brand-blue)]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[var(--color-brand-purple)]/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-brand-blue)]" />
            <span className="text-[10px] font-semibold text-slate-400 tracking-[0.2em] uppercase">Premium Capabilities</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight-premium text-balance mb-6"
          >
            Built for <span className="text-gradient-blue neon-text-blue">Performance</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed tracking-premium text-pretty"
          >
            Everything you need to manage your server's audio experience, packed into a sleek, lightning-fast bot.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <Link 
              key={i} 
              href="/features" 
              onClick={(e) => handleFeatureClick(e, "/features")}
              className="block outline-none focus:outline-none"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.05, 
                  duration: 0.5
                }}
                className="glass-card rounded-[2rem] p-10 group hover:-translate-y-2 hover:border-[var(--color-brand-blue)]/30 transition-all duration-500 relative overflow-hidden h-full backdrop-blur-xl"
              >
                {/* Dynamic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating Glow Orb */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${feature.color} blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative overflow-hidden group-hover:scale-110 transition-transform duration-500`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                  <feature.icon className="w-6 h-6 text-white relative z-10" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight-premium group-hover:text-[var(--color-brand-blue)] transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 text-base leading-relaxed mb-8 group-hover:text-slate-300 transition-colors tracking-premium">
                  {feature.description}
                </p>

                <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--color-brand-blue)] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Explore Feature <ArrowRight className="w-3.5 h-3.5" />
                </div>

                {/* Corner Accent */}
                <div className="absolute bottom-0 right-0 w-12 h-0.5 bg-gradient-to-r from-transparent to-[var(--color-brand-blue)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
