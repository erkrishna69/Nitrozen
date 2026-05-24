"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, ArrowUpRight } from "lucide-react";
import { usePageTransition } from "../ui/PageTransition";

export default function FAQ() {
  const [openIndex, setOpenOpenIndex] = useState<number | null>(null);
  const { startInviteRedirect } = usePageTransition();

  const handleInviteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const href = "https://discord.com/oauth2/authorize?client_id=1417772882477449226&permissions=368438745&scope=bot+applications.commands";
    startInviteRedirect(href);
  };

  const faqs = [
    {
      question: "How do I invite Nitrozen to my server?",
      answer: (
        <span>
          You can invite Nitrozen by clicking the{" "}
          <button 
            onClick={handleInviteClick}
            className="text-[var(--color-brand-blue)] font-bold hover:underline inline-flex items-center gap-1 group"
          >
            'Invite Bot' button
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>{" "}
          on our homepage. Make sure you have 'Manage Server' permissions in the target server.
        </span>
      )
    },
    {
      question: "Which music platforms are supported?",
      answer: "Nitrozen supports a wide range of platforms including Spotify, YouTube, Apple Music, Gaana, Jio Saavn, SoundCloud, and more. You can simply paste a link or search for a song name."
    },
    {
      question: "Is Nitrozen free to use?",
      answer: "Yes! Nitrozen offers a powerful set of free features for everyone. We also have a Premium tier for users who want extra perks like 24/7 playback, higher audio quality, and priority support."
    },
    {
      question: "How can I get support if the bot is down?",
      answer: "You can join our official Discord community to get real-time updates and support from our staff. Check the 'Community' section on our website for the link."
    },
    {
      question: "Does it support playlists from Jio Saavn and Gaana?",
      answer: "Absolutely! Nitrozen is optimized for Indian music platforms, allowing you to play your favorite playlists from Jio Saavn and Gaana seamlessly."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[var(--color-brand-black)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <HelpCircle className="w-4 h-4 text-[var(--color-brand-blue)]" />
            <span className="text-xs font-bold text-gray-300 tracking-widest uppercase">Support Center</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4"
          >
            Got <span className="neon-text-purple text-[var(--color-brand-purple)]">Questions?</span>
          </motion.h2>
          <p className="text-gray-400 text-lg">Everything you need to know about Nitrozen.</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: idx * 0.1,
                type: "spring",
                bounce: 0.3
              }}
              className="glass-card rounded-[2rem] overflow-hidden border-white/5 group hover:border-[var(--color-brand-blue)]/20 transition-all duration-500"
            >
              <button
                onClick={() => setOpenOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 flex items-center justify-between text-left transition-colors hover:bg-white/5"
              >
                <span className="text-lg font-bold text-white pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-[var(--color-brand-blue)]' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
