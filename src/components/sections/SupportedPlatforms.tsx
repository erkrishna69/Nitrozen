"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import Image from "next/image";

const platforms = [
  { 
    name: "Spotify", 
    logo: "/assets/spotify.png", 
    color: "group-hover:shadow-[0_0_20px_rgba(29,185,84,0.4)]" 
  },
  { 
    name: "YouTube", 
    logo: "/assets/youtube.png", 
    color: "group-hover:shadow-[0_0_20px_rgba(255,0,0,0.4)]" 
  },
  { 
    name: "Apple Music", 
    logo: "/assets/apple.png", 
    color: "group-hover:shadow-[0_0_20px_rgba(250,36,60,0.4)]" 
  },
  { 
    name: "Gaana", 
    logo: "/assets/gaana.png", 
    color: "group-hover:shadow-[0_0_20px_rgba(231,44,51,0.4)]" 
  },
  { 
    name: "Jio Saavn", 
    logo: "/assets/jio.png", 
    color: "group-hover:shadow-[0_0_20px_rgba(0,177,178,0.4)]" 
  },
  { 
    name: "SoundCloud", 
    logo: "/assets/soundcloud.png", 
    color: "group-hover:shadow-[0_0_20px_rgba(255,85,0,0.4)]" 
  },
  { 
    name: "Deezer", 
    logo: "/assets/deezer.png", 
    color: "group-hover:shadow-[0_0_20px_rgba(255,0,0,0.4)]" 
  },
  { 
    name: "And Many More", 
    logo: null,
    icon: Globe, 
    color: "group-hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]" 
  },
];

export default function SupportedPlatforms() {
  return (
    <section className="py-24 relative overflow-hidden bg-[var(--color-brand-black)]">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-brand-blue)]/5 blur-[120px] rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6"
          >
            Universal <span className="neon-text-blue text-[var(--color-brand-blue)]">Compatibility</span>
          </motion.h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Nitrozen supports playlists and tracks from all your favorite streaming platforms. Seamless playback, no matter the source.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {platforms.map((platform, idx) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              whileHover={{ 
                y: -12, 
                backgroundColor: "rgba(255,255,255,0.12)",
                borderColor: "rgba(255,255,255,0.2)"
              }}
              className={`relative glass-card p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center group border border-white/10 backdrop-blur-2xl transition-all duration-500 overflow-hidden ${platform.color}`}
            >
              {/* Animated Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating Decorative Blobs */}
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/5 blur-2xl rounded-full group-hover:bg-white/10 transition-colors"></div>

              <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                {/* Logo Backdrop Glow */}
                <div className="absolute inset-0 bg-white/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                
                {platform.logo ? (
                  <div className="relative w-14 h-14 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Image 
                      src={platform.logo} 
                      alt={platform.name}
                      fill
                      sizes="56px"
                      className="object-contain relative z-10"
                    />
                  </div>
                ) : platform.icon ? (
                  <div className="p-5 rounded-3xl bg-white/5 text-[var(--color-brand-blue)] relative z-10 group-hover:scale-110 transition-transform shadow-inner">
                    <platform.icon className="w-10 h-10" />
                  </div>
                ) : null}
              </div>
              
              <h3 className="text-white font-black tracking-tight text-xl relative z-10 group-hover:text-[var(--color-brand-blue)] transition-colors">
                {platform.name}
              </h3>
              
              {/* Bottom Decorative Line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-brand-blue)] to-transparent group-hover:w-full transition-all duration-700"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
