import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatVND } from '../utils/formatters';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    openProductDetail,
    buyNow,
  } = useShop();

  const product = quickViewProduct;
  const [selectedSize, setSelectedSize] = useState<number | null>(
    product ? product.sizes[0] || null : null
  );
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, qty);
    setQuickViewProduct(null);
  };

  const handleBuyNow = () => {
    if (!selectedSize) return;
    setQuickViewProduct(null);
    buyNow(product, selectedSize, qty);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-[#141417] text-[#F7F7F5] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
      >
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Image */}
          <div className="aspect-square rounded-2xl bg-[#1b1c22] p-4 flex items-center justify-center border border-white/5">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain filter drop-shadow-lg"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold uppercase text-[#C6FF3D]">
              {product.categoryNameVi} • {product.code}
            </span>
            <h3 className="font-heading text-2xl font-black text-white uppercase mt-0.5">
              {product.name}
            </h3>

            <div className="mt-2 flex items-baseline gap-3">
              <span className="font-heading text-2xl font-black text-white">
                {formatVND(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#858585] line-through">
                  {formatVND(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-[#858585] mt-2 line-clamp-2">
              {product.description}
            </p>

            {/* Size Choice */}
            <div className="mt-4">
              <span className="text-xs font-semibold text-white/80 block mb-1.5">
                Chọn size giày:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all ${
                      selectedSize === sz
                        ? 'bg-[#C6FF3D] text-[#0B0B0D]'
                        : 'bg-[#25262A] text-white hover:bg-white/20'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25262A] text-white hover:bg-[#303137] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-white/10"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C6FF3D]" />
                  <span>Thêm giỏ</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#C6FF3D] text-[#0B0B0D] hover:bg-[#d6ff66] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 glow-volt-sm"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Mua ngay</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setQuickViewProduct(null);
                  openProductDetail(product);
                }}
                className="text-[11px] text-[#858585] hover:text-[#C6FF3D] transition-colors text-center py-1 underline"
              >
                Xem đầy đủ chi tiết thông số kỹ thuật →
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
