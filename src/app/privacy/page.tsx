"use client";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Database, 
  Eye, 
  Lock, 
  Trash2, 
  MessageSquare, 
  Sparkles,
  Clock,
  ArrowRight
} from "lucide-react";

const sections = [
  {
    id: "collection",
    icon: Database,
    title: "1. Information We Collect",
    content: "We only collect the minimum data required to operate the Discord bot and its core features. This may include:",
    items: [
      "Discord Server (Guild) IDs",
      "Discord User IDs",
      "Voice Channel IDs",
      "Message content used to execute bot commands",
      "Music queue, playlist, and playback session data",
      "Premium subscription status and voting information",
      "Basic server configuration settings"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "usage",
    icon: Eye,
    title: "2. How We Use Your Data",
    content: "Collected data is used exclusively for:",
    items: [
      "Providing music playback functionality",
      "Processing bot commands and interactions",
      "Managing queues, playlists, and autoplay systems",
      "Maintaining server-specific settings",
      "Improving playback reliability and overall performance",
      "Displaying anonymized aggregate statistics"
    ],
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "sharing",
    icon: ShieldCheck,
    title: "3. Data Sharing",
    content: "We do not sell, rent, or share user data with third parties. Your data remains strictly within our infrastructure for operational purposes only.",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "security",
    icon: Lock,
    title: "4. Data Storage and Security",
    content: "Reasonable security measures are used to protect stored information. Only operationally necessary data is retained, and unnecessary data is periodically removed through automated cleanup routines.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: "removal",
    icon: Trash2,
    title: "5. Data Removal Requests",
    content: "Server administrators or users may request removal of stored server-related or user-related data by contacting us through the official support server. We process these requests manually within 48-72 hours.",
    color: "from-red-500 to-rose-500"
  },
  {
    id: "contact",
    icon: MessageSquare,
    title: "6. Contact",
    content: "For support, questions, or data-related requests, please join our official support server and open a ticket with our administration team.",
    color: "from-indigo-500 to-blue-500",
    hasButton: true
  }
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#08080f] text-slate-300">
      <Navbar />
      
      <main className="relative pt-32 pb-20 overflow-hidden">
        {/* Cinematic Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full animate-pulse-glow" />
          <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-500/10 blur-[150px] rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-brand-blue)]" />
              <span className="text-[10px] font-semibold text-slate-400 tracking-[0.2em] uppercase">Legal Transparency</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight-premium text-balance"
            >
              Privacy <span className="text-gradient-blue neon-text-blue">Policy</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed tracking-premium text-pretty"
            >
              Your privacy and data security matter to us. We believe in being 100% transparent about how we handle your information.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex items-center justify-center gap-2 text-slate-500"
            >
              <Clock className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-widest">Last Updated: 5/25/2026</span>
            </motion.div>
          </div>

          {/* Policy Cards */}
          <div className="grid grid-cols-1 gap-8">
            {sections.map((section, idx) => (
              <motion.section
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative"
              >
                <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden">
                  {/* Hover Glow Orb */}
                  <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${section.color} blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                  
                  <div className="flex flex-col md:flex-row gap-8 relative z-10">
                    {/* Icon Column */}
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                        <section.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="flex-grow">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight-premium">
                        {section.title}
                      </h2>
                      
                      <p className="text-slate-400 text-lg leading-relaxed mb-6 tracking-premium">
                        {section.content}
                      </p>

                      {section.items && (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-slate-300 group/item">
                              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-blue)] group-hover/item:scale-150 transition-transform" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.hasButton && (
                        <motion.div 
                          className="mt-10"
                          whileHover={{ x: 5 }}
                        >
                          <a 
                            href="https://discord.gg/rFpvjVm6SU" 
                            target="_blank"
                            className="inline-flex items-center gap-2 text-[var(--color-brand-blue)] font-bold uppercase text-xs tracking-[0.2em] group/btn"
                          >
                            Join Support Server
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </a>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.section>
            ))}
          </div>

          {/* Bottom Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 p-12 rounded-[3rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight-premium">Still have questions?</h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
              If anything is unclear about our privacy practices, our team is happy to help explain how your data is handled.
            </p>
            <a 
              href="https://discord.gg/rFpvjVm6SU"
              target="_blank"
              className="px-8 py-4 rounded-xl bg-white text-black font-semibold text-sm hover:scale-105 transition-all tracking-premium inline-block"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
