import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CallToAction: React.FC = () => {
  const { setCurrentPage, setActiveCategory } = useShop();

  return (
    <section className="py-28 bg-[#0B0B0D] relative overflow-hidden border-t border-white/10">
      {/* Background glow and geometric lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C6FF3D]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs uppercase tracking-[0.35em] text-[#C6FF3D] font-mono font-bold">
            SẴN SÀNG BỨT PHÁ GIỚI HẠN?
          </span>

          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black font-heading text-[#F7F7F5] uppercase mt-4 tracking-tight leading-[0.9]">
            YOUR NEXT MOVE <br />
            <span className="text-[#C6FF3D]">STARTS HERE.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#858585] max-w-xl mx-auto font-body">
            Gia nhập cộng đồng những người đam mê chuyển động cùng PITHY.
            Miễn phí giao hàng toàn quốc và hỗ trợ đổi size linh hoạt trong 7 ngày.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setActiveCategory('all');
                setCurrentPage('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-10 py-5 rounded-2xl bg-[#C6FF3D] text-[#0B0B0D] font-heading text-lg font-black uppercase tracking-wider hover:bg-[#d6ff66] transition-all glow-volt-hover flex items-center gap-3 transform hover:-translate-y-1"
            >
              <span>KHÁM PHÁ PITHY</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
