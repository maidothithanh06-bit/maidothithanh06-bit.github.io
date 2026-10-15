import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Eye, Zap, Check } from 'lucide-react';
import { Product } from '../types';
import { formatVND } from '../utils/formatters';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { openProductDetail, setQuickViewProduct, addToCart } = useShop();
  const [selectedQuickSize, setSelectedQuickSize] = useState<number>(product.sizes[0] || 40);
  const [showQuickSize, setShowQuickSize] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent trigger if clicking action buttons
    if ((e.target as HTMLElement).closest('.card-action-btn')) {
      return;
    }
    openProductDetail(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!showQuickSize) {
      setShowQuickSize(true);
    } else {
      addToCart(product, selectedQuickSize, 1);
      setShowQuickSize(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={handleCardClick}
      className="group relative rounded-2xl bg-[#141417] border border-white/10 hover:border-[#C6FF3D]/70 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1.5"
    >
      {/* Top Badges */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-1.5">
          {product.isBestSeller && (
            <span className="bg-[#C6FF3D] text-[#0B0B0D] text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
              BESTSELLER
            </span>
          )}
          {product.isNew && (
            <span className="bg-white text-[#0B0B0D] text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
              NEW
            </span>
          )}
        </div>
        <span className="text-[10px] font-mono text-white/60 bg-black/50 backdrop-blur px-2 py-0.5 rounded">
          {product.code}
        </span>
      </div>

      {/* Product Image Stage */}
      <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#1c1d22] to-[#121215] flex items-center justify-center p-6 overflow-hidden">
        {/* Glow circle on hover */}
        <div className="absolute w-40 h-40 bg-[#C6FF3D]/10 rounded-full blur-2xl group-hover:bg-[#C6FF3D]/25 transition-all duration-500 pointer-events-none" />

        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="relative z-10 w-full h-full object-contain filter drop-shadow-md group-hover:scale-108 group-hover:-rotate-2 transition-transform duration-500 ease-out"
        />

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          title="Xem nhanh thông số"
          aria-label="Xem nhanh sản phẩm"
          className="card-action-btn absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#0B0B0D]/80 backdrop-blur border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#C6FF3D] hover:text-[#0B0B0D] hover:border-transparent z-20"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#C6FF3D] font-semibold">
            {product.categoryNameVi}
          </span>
          <h3 className="font-heading text-lg font-bold text-[#F7F7F5] group-hover:text-[#C6FF3D] transition-colors mt-0.5 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-[#858585] mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Sizes inline preview */}
        <div className="mt-3.5 pt-3 border-t border-white/5">
          {showQuickSize ? (
            <div className="card-action-btn flex flex-col gap-2 py-1">
              <span className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">Chọn kích cỡ:</span>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedQuickSize(size);
                    }}
                    className={`w-7 h-7 text-xs font-bold rounded flex items-center justify-center transition-colors ${
                      selectedQuickSize === size
                        ? 'bg-[#C6FF3D] text-[#0B0B0D]'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[11px] text-[#858585]">
              <span>Sizes:</span>
              <span className="font-mono text-white/70">
                {product.sizes.slice(0, 4).join(', ')}{product.sizes.length > 4 ? '...' : ''}
              </span>
            </div>
          )}

          {/* Pricing & Add to Cart button */}
          <div className="mt-3 flex items-center justify-between">
            <div>
              <div className="font-heading text-lg sm:text-xl font-black text-[#F7F7F5]">
                {formatVND(product.price)}
              </div>
              {product.originalPrice && (
                <div className="text-[11px] text-[#858585] line-through -mt-1">
                  {formatVND(product.originalPrice)}
                </div>
              )}
            </div>

            <button
              onClick={handleQuickAdd}
              type="button"
              className="card-action-btn px-3 py-2 rounded-xl bg-[#25262A] group-hover:bg-[#C6FF3D] text-[#F7F7F5] group-hover:text-[#0B0B0D] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200"
            >
              {showQuickSize ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Xác nhận</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Thêm</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
