"use client";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { motion } from "framer-motion";
import { 
  RotateCcw, 
  RefreshCw, 
  AlertCircle, 
  HelpCircle, 
  Clock,
  ArrowRight,
  ShieldX,
  RefreshCcw,
  Sparkles
} from "lucide-react";

const policies = [
  {
    id: "eligibility",
    icon: RotateCcw,
    title: "1. Refund Eligibility",
    content: "We offer a 7-day refund window for first-time premium purchases. To request a refund, users must contact support within 7 days of the original transaction date.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "renewals",
    icon: RefreshCw,
    title: "2. Subscription Renewals",
    content: "For recurring subscription renewals, refund requests must be submitted within 48 hours of the renewal charge. Requests made after this period may be denied. If a renewal refund is denied, premium access will remain active until the end of the current billing cycle.",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "non-refundable",
    icon: ShieldX,
    title: "3. Non-Refundable Situations",
    content: "Refunds may be denied under the following circumstances:",
    items: [
      "Violation of our Terms of Service or Discord’s Terms of Service",
      "Abuse of the refund system or repeated refund claims",
      "Chargebacks or fraudulent payment activity",
      "Service interruptions caused by Discord outages or third-party providers",
      "Failure to cancel a subscription before extended usage after renewal"
    ],
    color: "from-red-500 to-rose-500"
  },
  {
    id: "process",
    icon: HelpCircle,
    title: "4. Refund Request Process",
    content: "To request a refund, users must contact the official support server and provide:",
    items: [
      "Discord User ID",
      "Transaction or payment reference ID",
      "Purchase details relevant to the request"
    ],
    color: "from-indigo-500 to-blue-500",
    hasButton: true
  },
  {
    id: "time",
    icon: Clock,
    title: "5. Processing Time",
    content: "Approved refunds may take several business days to appear depending on the payment provider or banking system.",
    color: "from-slate-500 to-slate-400"
  },
  {
    id: "changes",
    icon: RefreshCcw,
    title: "6. Policy Changes",
    content: "We reserve the right to modify this Refund Policy at any time. Continued use of premium services after updates constitutes acceptance of the revised policy.",
    color: "from-emerald-500 to-teal-500"
  }
];

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#08080f] text-slate-300">
      <Navbar />
      
      <main className="relative pt-32 pb-20 overflow-hidden">
        {/* Cinematic Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full animate-pulse-glow" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[var(--color-brand-blue)]" />
              <span className="text-[10px] font-semibold text-slate-400 tracking-[0.2em] uppercase">Billing Transparency</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight-premium text-balance"
            >
              Refund <span className="text-gradient-blue neon-text-blue">Policy</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed tracking-premium text-pretty"
            >
              We believe in fair and transparent billing. If you're not satisfied, we're here to make it right.
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
            {policies.map((policy, idx) => (
              <motion.section
                key={policy.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative"
              >
                <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden">
                  <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${policy.color} blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                  
                  <div className="flex flex-col md:flex-row gap-8 relative z-10">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                        <policy.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight-premium">
                        {policy.title}
                      </h2>
                      
                      <p className="text-slate-400 text-lg leading-relaxed mb-6 tracking-premium">
                        {policy.content}
                      </p>

                      {policy.items && (
                        <ul className="space-y-4 mt-8">
                          {policy.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-300 group/item">
                              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-blue)] mt-2 group-hover/item:scale-150 transition-transform flex-shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {policy.hasButton && (
                        <motion.div className="mt-10" whileHover={{ x: 5 }}>
                          <a 
                            href="https://discord.gg/rFpvjVm6SU" 
                            target="_blank"
                            className="inline-flex items-center gap-2 text-[var(--color-brand-blue)] font-bold uppercase text-xs tracking-[0.2em] group/btn"
                          >
                            Open Support Ticket
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
