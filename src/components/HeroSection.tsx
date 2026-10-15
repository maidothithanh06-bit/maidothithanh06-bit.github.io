import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const HeroSection: React.FC = () => {
  const { setCurrentPage, openProductDetail, setActiveCategory } = useShop();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // PITHY Velocity X flagship shoe for hero
  const heroProduct = PRODUCTS.find((p) => p.code === 'PTH-RUN-01') || PRODUCTS[0];

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const handleScrollDown = () => {
    const target = document.getElementById('featured-categories');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 bg-[#0B0B0D]"
    >
      {/* Background radial ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[800px] h-[550px] sm:h-[800px] bg-[#C6FF3D]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-[#25262A]/60 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Speed Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-10 w-48 h-[1px] bg-gradient-to-r from-transparent to-[#C6FF3D]" />
        <div className="absolute bottom-1/3 right-10 w-64 h-[1px] bg-gradient-to-l from-transparent to-[#C6FF3D]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Tag badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#25262A]/80 border border-[#C6FF3D]/40 text-[#C6FF3D] text-xs font-semibold tracking-wider uppercase mb-6"
            >
              <Zap className="w-3.5 h-3.5 text-[#C6FF3D] animate-pulse" />
              <span>BỘ SƯU TẬP NĂNG ĐỘNG 2026</span>
            </motion.div>

            {/* Giant Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-7xl xl:text-8xl font-black font-heading tracking-tight text-[#F7F7F5] uppercase leading-[0.92]"
            >
              MOVE BEYOND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6FF3D] via-[#e2ff87] to-white">
                LIMITS.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 text-base sm:text-lg text-[#858585] max-w-xl font-body leading-relaxed"
            >
              Khám phá thế hệ giày thể thao dành cho những chuyển động không giới hạn.
              Hiệu suất vượt trội trên sân cầu lông, tennis và đường chạy marathon.
              Phong cách thiết kế tinh giản, bứt phá mọi rào cản.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => {
                  setCurrentPage('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-[#C6FF3D] text-[#0B0B0D] font-bold text-sm tracking-wider uppercase rounded-xl flex items-center gap-3 hover:bg-[#d6ff66] transition-all duration-200 transform hover:-translate-y-0.5 glow-volt-hover font-display"
              >
                <span>KHÁM PHÁ BỘ SƯU TẬP</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => openProductDetail(heroProduct)}
                className="px-8 py-4 bg-[#25262A] text-[#F7F7F5] font-semibold text-sm tracking-wider uppercase rounded-xl border border-white/10 hover:border-[#C6FF3D]/50 hover:bg-[#2e2f34] transition-all duration-200 font-display flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#C6FF3D]" />
                <span>MUA SẮM NGAY</span>
              </button>
            </motion.div>

            {/* Trust points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg"
            >
              <div>
                <div className="font-heading text-2xl text-[#F7F7F5]">100%</div>
                <div className="text-xs text-[#858585]">Chất liệu cao cấp</div>
              </div>
              <div>
                <div className="font-heading text-2xl text-[#C6FF3D]">3 CHUYÊN MÔN</div>
                <div className="text-xs text-[#858585]">Cầu lông • Tennis • Run</div>
              </div>
              <div>
                <div className="font-heading text-2xl text-[#F7F7F5]">FREE SHIP</div>
                <div className="text-xs text-[#858585]">Toàn quốc 0đ</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Shoe Showcase with dynamic mouse parallax */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-[480px] aspect-square flex items-center justify-center"
            >
              {/* Geometric neon ring */}
              <div className="absolute inset-4 rounded-full border border-[#C6FF3D]/20 animate-spin" style={{ animationDuration: '40s' }} />
              <div className="absolute inset-12 rounded-full border border-dashed border-white/10" />

              {/* Shoe Image with Tilt and glow */}
              <motion.div
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x * 20}deg) rotateX(${-mousePos.y * 20}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className="relative z-10 w-full h-full flex items-center justify-center cursor-pointer group"
                onClick={() => openProductDetail(heroProduct)}
              >
                <img
                  src={heroProduct.images[0]}
                  alt={heroProduct.name}
                  className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] filter group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                />

                {/* Floating Product Tag */}
                <div className="absolute -bottom-2 right-4 glass-panel px-4 py-2.5 rounded-xl border border-white/10 flex items-center gap-3">
                  <div>
                    <span className="text-[10px] text-[#C6FF3D] uppercase tracking-wider font-semibold block">Flagship Model</span>
                    <span className="text-xs font-bold text-white block">{heroProduct.name}</span>
                  </div>
                  <span className="text-xs font-black text-[#C6FF3D] bg-[#0B0B0D] px-2 py-1 rounded">
                    1.790.000₫
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={handleScrollDown}
        aria-label="Cuộn xuống để xem danh mục"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 hover:text-[#C6FF3D] transition-colors focus:outline-none"
      >
        <span className="text-[10px] uppercase tracking-widest font-mono">SCROLL</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#C6FF3D]" />
      </button>
    </section>
  );
};
