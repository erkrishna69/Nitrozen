"use client";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { motion } from "framer-motion";
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  CreditCard, 
  Zap, 
  Ban,
  ShieldAlert,
  RefreshCcw,
  MessageSquare,
  Clock,
  ArrowRight
} from "lucide-react";

const terms = [
  {
    id: "acceptance",
    icon: FileText,
    title: "1. Acceptance of Terms",
    content: "By inviting Nitrozen to a Discord server or using our website and services, you agree to comply with these Terms of Service. If you do not agree with these terms, you must discontinue use of the service.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "conduct",
    icon: AlertTriangle,
    title: "2. Acceptable Use",
    content: "You agree not to:",
    items: [
      "Use the bot in violation of Discord’s Terms of Service or Community Guidelines",
      "Stream or distribute copyrighted material without appropriate rights or authorization",
      "Spam commands, abuse rate limits, or intentionally disrupt service stability",
      "Attempt to exploit, reverse engineer, bypass security systems, or damage the bot infrastructure",
      "Use the service for malicious, automated, or abusive activities"
    ],
    color: "from-red-500 to-rose-500"
  },
  {
    id: "premium",
    icon: CreditCard,
    title: "3. Premium Subscriptions",
    content: "Premium subscriptions may include recurring billing depending on the selected plan. Premium benefits are linked to the purchasing Discord account and may be transferable between servers according to the platform’s premium system rules.",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "service",
    icon: Zap,
    title: "4. Service Availability",
    content: "We aim to provide reliable and stable service; however, uninterrupted availability is not guaranteed. Services may occasionally be unavailable due to maintenance, updates, third-party outages, or technical issues.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: "termination",
    icon: Ban,
    title: "5. Termination",
    content: "We reserve the right to suspend or blacklist any user or server that violates these Terms, Discord policies, or engages in malicious or abusive behavior.",
    color: "from-indigo-500 to-blue-500"
  },
  {
    id: "liability",
    icon: ShieldAlert,
    title: "6. Limitation of Liability",
    content: "Nitrozen and its operators are not responsible for any indirect, incidental, or consequential damages resulting from the use or inability to use the service.",
    color: "from-slate-500 to-slate-400"
  },
  {
    id: "changes",
    icon: RefreshCcw,
    title: "7. Changes to These Terms",
    content: "These Terms may be updated periodically. Continued use of the service after changes constitutes acceptance of the revised Terms.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: "contact",
    icon: MessageSquare,
    title: "8. Contact",
    content: "For support or legal inquiries, please contact us through the official support server.",
    color: "from-blue-600 to-indigo-600",
    hasButton: true
  }
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#08080f] text-slate-300">
      <Navbar />
      
      <main className="relative pt-32 pb-20 overflow-hidden">
        {/* Cinematic Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 -right-1/4 w-[600px] h-[600px] bg-purple-500/10 blur-[150px] rounded-full animate-pulse-glow" />
          <div className="absolute bottom-1/3 -left-1/4 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-brand-purple)]" />
              <span className="text-[10px] font-semibold text-slate-400 tracking-[0.2em] uppercase">User Agreement</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight-premium text-balance"
            >
              Terms of <span className="text-gradient-purple neon-text-purple">Service</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed tracking-premium text-pretty"
            >
              Please read these terms carefully before using our services. By using Nitrozen, you agree to be bound by these conditions.
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

          {/* Terms Cards */}
          <div className="grid grid-cols-1 gap-8">
            {terms.map((term, idx) => (
              <motion.section
                key={term.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative"
              >
                <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden">
                  {/* Hover Glow Orb */}
                  <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${term.color} blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                  
                  <div className="flex flex-col md:flex-row gap-8 relative z-10">
                    {/* Icon Column */}
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                        <term.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="flex-grow">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight-premium">
                        {term.title}
                      </h2>
                      
                      <p className="text-slate-400 text-lg leading-relaxed mb-6 tracking-premium">
                        {term.content}
                      </p>

                      {term.items && (
                        <ul className="space-y-4 mt-8">
                          {term.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-300 group/item">
                              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-purple)] mt-2 group-hover/item:scale-150 transition-transform flex-shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {term.hasButton && (
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

          {/* Legal Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 text-center text-slate-500"
          >
            <p className="text-xs uppercase tracking-[0.2em] max-w-lg mx-auto leading-loose">
              Nitrozen Official is not affiliated with Discord Inc. Use of our services is subject to Discord's official terms and community guidelines.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
