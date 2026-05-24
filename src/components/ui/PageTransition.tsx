"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

// Context to trigger transition from anywhere
const TransitionContext = createContext({
  startTransition: (href: string) => {},
  startInviteRedirect: (url: string) => {},
  isTransitioning: false,
  isInviting: false,
});

export const usePageTransition = () => useContext(TransitionContext);

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const startTransition = (href: string) => {
    if (href === pathname) return;
    setPendingHref(href);
    setIsTransitioning(true);
  };

  const startInviteRedirect = (url: string) => {
    setPendingUrl(url);
    setIsInviting(true);
    setTimeout(() => {
      window.open(url, "_blank");
      setIsInviting(false);
      setPendingUrl(null);
    }, 2500); // Cinematic delay
  };

  useEffect(() => {
    // When route changes, end transition
    setIsTransitioning(false);
    setPendingHref(null);
  }, [pathname]);

  const onAnimationComplete = () => {
    if (pendingHref) {
      router.push(pendingHref);
    }
  };

  return (
    <TransitionContext.Provider value={{ startTransition, startInviteRedirect, isTransitioning, isInviting }}>
      {children}
      <AnimatePresence mode="wait">
        {(isTransitioning || isInviting) && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] pointer-events-none"
          >
            {/* SVG Metaball Filter Definition */}
            <svg className="hidden">
              <defs>
                <filter id="metaball">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                    result="goo"
                  />
                  <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
              </defs>
            </svg>

            {/* Liquid Blobs Container */}
            <div 
              className="absolute inset-0 w-full h-full flex items-end justify-center overflow-hidden"
              style={{ filter: "url(#metaball)" }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: "120%", scale: 1 }}
                  animate={{ 
                    y: "-20%", 
                    scale: [1, 1.5, 2, 2.5],
                    x: `${(i - 3.5) * 15}vw` 
                  }}
                  transition={{
                    duration: 1.2,
                    ease: [0.76, 0, 0.24, 1],
                    delay: i * 0.05,
                  }}
                  onAnimationComplete={!isInviting && i === 7 ? onAnimationComplete : undefined}
                  className="absolute w-[30vw] h-[30vw] rounded-full bg-gradient-to-t from-[var(--color-brand-blue)] via-[var(--color-brand-purple)] to-[var(--color-brand-blue)] shadow-[0_0_80px_rgba(0,229,255,0.4)]"
                />
              ))}
              
              {/* Main Liquid Base */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                className="absolute inset-0 bg-gradient-to-b from-[var(--color-brand-black)] via-[var(--color-brand-dark)] to-[var(--color-brand-blue)]"
              />
            </div>

            {/* Cinematic Content Reveal during full coverage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="text-center">
                <motion.div
                  animate={{ 
                    scale: [0.9, 1.1, 1],
                    opacity: [0, 1, 0.8],
                    filter: ["blur(10px)", "blur(0px)", "blur(0px)"]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-white font-black text-6xl tracking-[0.2em] uppercase mb-4"
                  style={{ textShadow: "0 0 30px rgba(0, 229, 255, 0.8)" }}
                >
                  {isInviting ? "Inviting Bot" : "Nitrozen"}
                </motion.div>
                {isInviting && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-[var(--color-brand-blue)] font-medium tracking-widest uppercase text-sm"
                  >
                    Preparing your premium experience...
                  </motion.p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
