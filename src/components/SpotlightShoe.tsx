import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { formatVND } from '../utils/formatters';

export const SpotlightShoe: React.FC = () => {
  const { buyNow, openProductDetail } = useShop();

  // Target product from demo scenario: PITHY Velocity X
  const velocityX = PRODUCTS.find((p) => p.code === 'PTH-RUN-01') || PRODUCTS[0];
  const [selectedSize, setSelectedSize] = useState<number>(42); // Default 42 for the scenario

  const handleInstantBuy = () => {
    buyNow(velocityX, selectedSize, 1);
  };

  return (
    <section className="py-24 bg-[#08080A] relative overflow-hidden border-t border-white/5">
      {/* Background large ghost typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-5 text-center w-full">
        <span className="font-heading text-[18vw] font-black uppercase tracking-tighter text-white block">
          VELOCITY
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-br from-[#18191E] via-[#121317] to-[#0D0D10] border border-white/10 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Neon aura inside card */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#C6FF3D]/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Product Info & Size Selection */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6FF3D]/10 border border-[#C6FF3D]/30 text-[#C6FF3D] text-xs font-mono font-bold uppercase self-start mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SẢN PHẨM TIÊU ĐIỂM • DEMO SPOTLIGHT</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-black font-heading text-[#F7F7F5] uppercase tracking-wide">
                {velocityX.name}
              </h2>

              <p className="mt-3 text-lg text-[#C6FF3D] font-mono font-bold">
                {velocityX.tagline}
              </p>

              <p className="mt-4 text-sm sm:text-base text-[#858585] font-body leading-relaxed">
                Được trang bị đĩa Carbon P-Plate toàn phần kết hợp đệm bọt PEBA Nitro siêu nảy.
                Đây là mẫu giày đã cùng các vận động viên PITHY chinh phục hàng loạt kỷ lục cự ly 10K,
                21K và 42K trong nước.
              </p>

              {/* Specs bullet points */}
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C6FF3D]" />
                  <span>Trọng lượng: {velocityX.specs.weight}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C6FF3D]" />
                  <span>Chất liệu: {velocityX.specs.upper}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C6FF3D]" />
                  <span>Độ êm: {velocityX.specs.cushioning}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C6FF3D]" />
                  <span>Độ dốc gót (Drop): {velocityX.specs.drop}</span>
                </div>
              </div>

              {/* Price & Size Choice */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-heading text-3xl sm:text-4xl font-black text-[#F7F7F5]">
                    {formatVND(velocityX.price)}
                  </span>
                  {velocityX.originalPrice && (
                    <span className="text-sm text-[#858585] line-through">
                      {formatVND(velocityX.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs bg-[#C6FF3D]/20 text-[#C6FF3D] font-bold px-2 py-0.5 rounded">
                    Tiết kiệm {formatVND(velocityX.originalPrice! - velocityX.price)}
                  </span>
                </div>

                {/* Size Picker for fast demo */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      Chọn size (Size chuẩn Châu Á):
                    </span>
                    <span className="text-xs text-[#C6FF3D] font-mono">Đang chọn: Size {selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {velocityX.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`w-10 h-10 rounded-xl font-mono text-sm font-bold transition-all ${
                          selectedSize === sz
                            ? 'bg-[#C6FF3D] text-[#0B0B0D] shadow-lg scale-105'
                            : 'bg-[#25262A] text-white/80 hover:bg-white/15'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Buy Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleInstantBuy}
                    className="flex-1 min-w-[200px] py-4 px-6 rounded-xl bg-[#C6FF3D] text-[#0B0B0D] font-heading text-base uppercase tracking-wider font-bold flex items-center justify-center gap-2 hover:bg-[#d4ff68] transition-all glow-volt-hover"
                  >
                    <span>MUA NGAY SIZE {selectedSize}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => openProductDetail(velocityX)}
                    className="py-4 px-6 rounded-xl bg-[#25262A] text-white font-display text-xs uppercase tracking-wider font-semibold hover:bg-white/15 transition-all"
                  >
                    Xem chi tiết thông số
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Large Shoe Visual */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
                <div className="absolute inset-8 rounded-full border border-dashed border-[#C6FF3D]/30 animate-pulse" />
                <img
                  src={velocityX.images[0]}
                  alt={velocityX.name}
                  className="relative z-10 w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] hover:scale-108 transition-transform duration-500 cursor-pointer"
                  onClick={() => openProductDetail(velocityX)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
