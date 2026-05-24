"use client";

import { motion } from "framer-motion";
import { Brain, Layers, Activity, FastForward, Mic2, ShieldCheck, Sparkles, Filter, Infinity, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePageTransition } from "../ui/PageTransition";

const features = [
  // ... (keeping existing features)
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
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[var(--color-brand-blue)]" />
            <span className="text-xs font-bold text-gray-300 tracking-widest uppercase">Premium Capabilities</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6"
          >
            Built for <span className="neon-text-blue text-[var(--color-brand-blue)]">Performance</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Everything you need to manage your server's audio experience, packed into a sleek, lightning-fast bot.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Link 
              key={i} 
              href="/features" 
              onClick={(e) => handleFeatureClick(e, "/features")}
              className="block outline-none focus:outline-none"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: i * 0.1, 
                  duration: 0.8, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="glass-card rounded-[2.5rem] p-10 group hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,229,255,0.25)] transition-all duration-500 relative overflow-hidden h-full border border-white/10 hover:border-[var(--color-brand-blue)]/40 cursor-pointer backdrop-blur-xl"
              >
                {/* Dynamic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating Glow Orb */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${feature.color} blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>

                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative overflow-hidden group-hover:scale-110 transition-transform duration-500`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                  <feature.icon className="w-8 h-8 text-white relative z-10" />
                </div>
                
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-[var(--color-brand-blue)] transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 text-base leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-brand-blue)] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Explore Feature <ArrowRight className="w-4 h-4" />
                </div>

                {/* Corner Accent */}
                <div className="absolute bottom-0 right-0 w-12 h-1 bg-gradient-to-r from-transparent to-[var(--color-brand-blue)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
