import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ArrowRight } from 'lucide-react';

interface IntroSplashProps {
  onComplete: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 600);
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onComplete, 400);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0B0D] text-[#F7F7F5] overflow-hidden select-none"
        >
          {/* Subtle kinetic velocity grid lines */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C6FF3D] to-transparent animate-pulse" />
            <div className="absolute top-2/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#F7F7F5] to-transparent" />
            <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C6FF3D] to-transparent animate-pulse delay-300" />
            <div className="absolute left-1/3 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#25262A] to-transparent" />
            <div className="absolute left-2/3 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#25262A] to-transparent" />
          </div>

          {/* Central Logo & Brand Stinger */}
          <div className="relative z-10 flex flex-col items-center px-4 text-center">
            {/* Speed icon emblem */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-16 h-16 mb-5 rounded-2xl bg-[#25262A] border border-[#C6FF3D]/40 flex items-center justify-center glow-volt"
            >
              <div className="relative flex items-center justify-center">
                <span className="text-3xl font-black italic tracking-tighter text-[#C6FF3D]">P</span>
                <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-[#C6FF3D] animate-ping" />
              </div>
            </motion.div>

            {/* PITHY Typography */}
            <motion.h1
              initial={{ letterSpacing: '0.4em', opacity: 0, y: 15 }}
              animate={{ letterSpacing: '0.18em', opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl font-black font-heading tracking-widest text-[#F7F7F5]"
            >
              PITHY
            </motion.h1>

            {/* Slogan */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-3 flex items-center gap-3 text-xs sm:text-sm tracking-[0.3em] font-medium text-[#C6FF3D] uppercase"
            >
              <span className="w-6 h-[1px] bg-[#C6FF3D]/50" />
              THE ART OF MOVEMENT
              <span className="w-6 h-[1px] bg-[#C6FF3D]/50" />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-4 text-xs max-w-xs text-[#858585]"
            >
              Thương hiệu giày thể thao hiệu suất cao
            </motion.p>
          </div>

          {/* Quick Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1 }}
            onClick={handleSkip}
            className="absolute bottom-8 right-8 flex items-center gap-2 text-xs uppercase tracking-widest text-[#858585] hover:text-[#C6FF3D] transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-[#C6FF3D]/40"
          >
            <span>Khám phá ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
