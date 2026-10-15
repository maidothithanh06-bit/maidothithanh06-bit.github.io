import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';

export const CategoryShowcase: React.FC = () => {
  const { setCurrentPage, setActiveCategory } = useShop();

  const displayCategories = CATEGORIES.filter((c) => c.id !== 'all');

  const handleSelect = (categoryId: string) => {
    setActiveCategory(categoryId as 'badminton' | 'tennis' | 'running');
    setCurrentPage(categoryId as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="featured-categories" className="py-24 bg-[#0B0B0D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6FF3D] font-bold font-mono">
              DANH MỤC THỂ THAO
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-[#F7F7F5] mt-2 uppercase tracking-wide">
              CHỌN BỘ MÔN CỦA BẠN
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-[#858585] max-w-md">
            Mỗi bộ môn đòi hỏi một cấu trúc hỗ trợ và độ bám khác biệt. PITHY phân tách công nghệ
            chuyên sâu cho từng môn vận động.
          </p>
        </div>

        {/* 3 Large Category Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {displayCategories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => handleSelect(cat.id)}
              className="group relative h-[480px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#C6FF3D]/80 transition-all duration-500 bg-[#141417]"
            >
              {/* Background Product Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out brightness-[0.75] group-hover:brightness-90"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

              {/* Top Tag & Number */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                <span className="text-xs font-mono font-bold text-[#C6FF3D] bg-[#0B0B0D]/80 backdrop-blur px-3 py-1 rounded-full border border-[#C6FF3D]/30">
                  0{index + 1}
                </span>
                <span className="text-xs text-[#858585] font-mono tracking-widest bg-black/40 px-2.5 py-1 rounded-md">
                  {cat.count} SẢN PHẨM
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#C6FF3D] font-semibold">
                  {cat.id.toUpperCase()} SERIES
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#F7F7F5] mt-1 group-hover:text-[#C6FF3D] transition-colors uppercase">
                  {cat.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#F7F7F5]/70 mt-2 font-body line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                {/* Explore button indicator */}
                <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F7F7F5] group-hover:text-[#C6FF3D] transition-colors">
                  <span>Khám phá bộ sưu tập</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#C6FF3D] group-hover:text-[#0B0B0D] flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
