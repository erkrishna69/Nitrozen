"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CursorTracker() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Randomly create ripples when moving
      if (Math.random() > 0.85) {
        const id = Date.now() + Math.random();
        setRipples(prev => [...prev.slice(-8), { id, x: e.clientX, y: e.clientY }]);
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== id));
        }, 800);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden">
      {/* Liquid Ripples Following Mouse */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 0.5, scale: 0, x: ripple.x, y: ripple.y }}
            animate={{ opacity: 0, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[var(--color-brand-blue)]/20"
            style={{ 
              boxShadow: "0 0 15px rgba(0, 229, 255, 0.1)",
              background: "radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)",
              filter: "blur(2px)"
            }}
          />
        ))}
      </AnimatePresence>

      {/* SVG Filter for a more liquid feel */}
      <svg className="hidden">
        <defs>
          <filter id="water-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
