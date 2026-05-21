"use client";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { motion } from "framer-motion";
import { Sparkles, Brain, Cpu, Radio, ShieldCheck, Zap, Globe, AudioWaveform } from "lucide-react";
import Link from "next/link";

const detailedFeatures = [
  {
    id: "smart-ai",
    icon: Brain,
    title: "Smart AI Playmix",
    description: "Our proprietary AI engine acts like a real DJ. It analyzes the vibe of your voice channel, understands your musical preferences based on previous commands, and generates an infinite, uninterrupted radio of recommendations tailored precisely to your server's mood.",
    color: "from-blue-500 to-cyan-500",
    tags: ["Context-Aware", "Infinite Radio", "Personalized"]
  },
  {
    id: "mood-classification",
    icon: Sparkles,
    title: "Real-time Mood Classification",
    description: "Every track requested is analyzed for its sentiment and energy levels. Whether your server is looking for hype gym tracks, late-night lo-fi vibes, or party bangers, Nitrozen seamlessly adapts its upcoming suggestions to maintain the perfect atmosphere.",
    color: "from-purple-500 to-pink-500",
    tags: ["Sentiment Analysis", "Energy Matching", "Dynamic"]
  },
  {
    id: "high-fidelity",
    icon: AudioWaveform,
    title: "High-Fidelity Audio Architecture",
    description: "Powered by dual, enterprise-grade Lavalink KXO nodes and the robust Riffy audio engine. Experience zero buffering, ultra-low latency, and crystal clear 384kbps audio streaming directly into your Discord voice channels.",
    color: "from-green-500 to-emerald-500",
    tags: ["Zero Latency", "384kbps", "Dual Nodes"]
  },
  {
    id: "auto-resume",
    icon: Cpu,
    title: "Persistent Auto-Resume Sessions",
    description: "Never lose a great playlist again. If the bot restarts for an update or encounters a network disruption, Nitrozen will automatically rejoin your voice channel and resume playback at the exact millisecond the song dropped off, keeping your queue completely intact.",
    color: "from-yellow-500 to-orange-500",
    tags: ["State Recovery", "24/7 Availability", "Zero Data Loss"]
  },
  {
    id: "interactive-ui",
    icon: Radio,
    title: "Interactive Component V2 UI",
    description: "Say goodbye to typing long commands. Nitrozen features a premium, entirely interactive button and select-menu interface. Control playback, manage filters, skip tracks, and adjust volume—all through visually stunning, glowing Discord embeds.",
    color: "from-[var(--color-brand-blue)] to-[var(--color-brand-purple)]",
    tags: ["Button Controls", "Select Menus", "Premium Embeds"]
  },
  {
    id: "live-dashboard",
    icon: Globe,
    title: "Live Web Dashboard Integration",
    description: "Your Discord music experience isn't limited to Discord. Nitrozen features a live Web API that securely syncs real-time now-playing data, latencies, and queue details straight to our beautiful web dashboard.",
    color: "from-red-500 to-rose-500",
    tags: ["Web API", "Real-Time Sync", "Transparency"]
  }
];

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      
      <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
        {/* Background Gradients */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-[var(--color-brand-blue)]/10 rounded-full blur-[150px] mix-blend-screen animate-float"></div>
          <div className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-[var(--color-brand-purple)]/10 rounded-full blur-[150px] mix-blend-screen animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-brand-purple)]/10 border border-[var(--color-brand-purple)]/20 text-[var(--color-brand-purple)] text-sm font-semibold mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Complete Feature Arsenal
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6"
            >
              Everything you need to <br />
              <span className="neon-text-blue">own the vibe.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Dive deep into the technology powering the next generation of Discord music bots.
            </motion.p>
          </div>

          {/* Features Layout */}
          <div className="space-y-24">
            {detailedFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Feature Icon Graphic */}
                <div className="w-full lg:w-1/2 flex justify-center">
                  <div className="relative group w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                    <div className={`absolute inset-0 bg-gradient-to-tr ${feature.color} rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse-glow`}></div>
                    <div className="relative glass-card w-full h-full rounded-3xl border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <feature.icon className={`w-32 h-32 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-transform duration-500 group-hover:scale-110`} />
                    </div>
                  </div>
                </div>

                {/* Feature Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {feature.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-300 uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{feature.title}</h2>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Command Modules Section */}
          <div id="commands" className="mt-40 mb-20 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Command <span className="text-[var(--color-brand-blue)]">Modules</span></h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Nitrozen is neatly organized into 6 powerful categories, giving you absolute control over every aspect of your server's audio experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Config", desc: "Set up DJ roles, bind to specific channels, and manage bot settings for your server." },
                { name: "Filters", desc: "Apply real-time audio effects like Bassboost, 8D, Nightcore, Vaporwave, and custom EQs." },
                { name: "Info", desc: "Check bot latencies, node status, active listeners, and get help for commands." },
                { name: "Music", desc: "The core engine. Play, pause, skip, seek, shuffle, and control the volume." },
                { name: "Owner", desc: "Advanced developer utilities for global bans, evaluation, and system restarts." },
                { name: "Playlist", desc: "Create, save, load, and manage your own custom playlists directly in Discord." }
              ].map((module, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card rounded-3xl p-8 border border-white/5 hover:border-[var(--color-brand-blue)]/30 transition-colors group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-[var(--color-brand-blue)] transition-colors">{module.name}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{module.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-32 glass-card rounded-3xl p-12 text-center border border-[var(--color-brand-blue)]/20 shadow-[0_0_50px_rgba(0,229,255,0.1)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-blue)]/10 to-transparent"></div>
            <h3 className="relative z-10 text-3xl md:text-5xl font-black text-white mb-6">Ready to experience <span className="text-[var(--color-brand-blue)]">Nitrozen</span>?</h3>
            <p className="relative z-10 text-gray-400 mb-8 max-w-xl mx-auto">Invite the bot to your server today and start streaming high-fidelity AI-powered music instantly.</p>
            <Link 
              href="https://discord.com/oauth2/authorize?client_id=1417772882477449226&permissions=368438745&scope=bot+applications.commands"
              target="_blank"
              className="relative z-10 inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-brand-blue)] text-[var(--color-brand-black)] font-bold rounded-xl hover:scale-105 transition-transform"
            >
              <Zap className="w-5 h-5" />
              Invite Nitrozen Now
            </Link>
          </motion.div>

        </div>
      </div>

      <Footer />
    </>
  );
}
