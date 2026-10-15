import React, { useState } from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

export const FeaturedProducts: React.FC = () => {
  const { setCurrentPage, setActiveCategory } = useShop();
  const [filterTab, setFilterTab] = useState<'all' | 'badminton' | 'tennis' | 'running'>('all');

  // Select top featured items
  const featured = PRODUCTS.filter((p) => {
    if (filterTab === 'all') return p.isBestSeller || p.isNew;
    return p.category === filterTab;
  }).slice(0, 8);

  return (
    <section className="py-24 bg-[#0E0E12] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-[#C6FF3D] uppercase mb-2">
              <Flame className="w-4 h-4 text-[#C6FF3D]" />
              <span>SẢN PHẨM NỔI BẬT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-[#F7F7F5] uppercase">
              ĐƯỢC YÊU THÍCH NHẤT
            </h2>
          </div>

          {/* Quick Category filter buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'badminton', label: 'Cầu lông' },
              { id: 'tennis', label: 'Tennis' },
              { id: 'running', label: 'Chạy bộ' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  filterTab === tab.id
                    ? 'bg-[#C6FF3D] text-[#0B0B0D]'
                    : 'bg-[#25262A] text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid (At least 6 items as requested) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>

        {/* Bottom CTA to View All Products */}
        <div className="mt-14 text-center">
          <button
            onClick={() => {
              setActiveCategory('all');
              setCurrentPage('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl border border-[#C6FF3D] text-[#C6FF3D] hover:bg-[#C6FF3D] hover:text-[#0B0B0D] font-display font-bold text-xs uppercase tracking-widest transition-all duration-300"
          >
            <span>XEM TẤT CẢ 12+ SẢN PHẨM PITHY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
