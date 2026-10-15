import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ShoppingBag,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Info,
  Ruler,
  Layers,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { formatVND } from '../utils/formatters';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    setCurrentPage,
    addToCart,
    buyNow,
    openProductDetail,
    addToast,
  } = useShop();

  const product = selectedProduct || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(product.sizes[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'sizeGuide' | 'policy'>('specs');

  // Related products in the same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      addToast('error', 'Chưa chọn kích cỡ giày!', 'Vui lòng chọn một cỡ giày trước khi thêm vào giỏ.');
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      addToast('error', 'Chưa chọn kích cỡ giày!', 'Vui lòng chọn một cỡ giày trước khi mua ngay.');
      return;
    }
    setSizeError(false);
    buyNow(product, selectedSize, quantity);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F7F7F5] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back button */}
        <button
          onClick={() => setCurrentPage('products')}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#858585] hover:text-[#C6FF3D] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>QUAY LẠI TẤT CẢ SẢN PHẨM</span>
        </button>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Big Photo */}
            <div className="relative aspect-[4/3] rounded-3xl bg-[#141417] border border-white/10 p-8 sm:p-12 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-radial from-[#C6FF3D]/5 to-transparent pointer-events-none" />

              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
              />

              {/* Badges on photo */}
              <div className="absolute top-6 left-6 flex items-center gap-2 z-20">
                {product.isBestSeller && (
                  <span className="bg-[#C6FF3D] text-[#0B0B0D] text-xs font-black uppercase px-3 py-1 rounded-md tracking-wider">
                    BESTSELLER
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-white text-[#0B0B0D] text-xs font-black uppercase px-3 py-1 rounded-md tracking-wider">
                    NEW 2026
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-24 h-20 rounded-xl bg-[#141417] border p-2 flex items-center justify-center overflow-hidden transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#C6FF3D] glow-volt-sm scale-102'
                      : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Góc nhìn ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Guarantees Box */}
            <div className="mt-6 p-4 rounded-2xl bg-[#121215] border border-white/5 grid grid-cols-3 gap-3 text-center text-xs">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#C6FF3D]" />
                <span className="text-white font-bold">Freeship 0đ</span>
                <span className="text-[10px] text-[#858585]">Giao hàng 2-3 ngày</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-[#C6FF3D]" />
                <span className="text-white font-bold">Đổi Size 7 Ngày</span>
                <span className="text-[10px] text-[#858585]">Hỗ trợ tận nơi</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#C6FF3D]" />
                <span className="text-white font-bold">Chính Hãng 100%</span>
                <span className="text-[10px] text-[#858585]">Bảo hành keo chỉ 6T</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details & Purchase Form */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Category & Code */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#C6FF3D] tracking-widest uppercase">
                {product.categoryNameVi}
              </span>
              <span className="text-xs font-mono text-white/50 bg-[#25262A] px-2.5 py-0.5 rounded">
                MÃ: {product.code}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="font-heading text-3xl sm:text-5xl font-black text-white mt-2 uppercase tracking-wide">
              {product.name}
            </h1>

            {/* Tagline */}
            <p className="text-sm text-[#C6FF3D] font-mono font-semibold mt-1">
              "{product.tagline}"
            </p>

            {/* Price Box */}
            <div className="mt-5 p-4 rounded-2xl bg-[#141417] border border-white/10 flex items-baseline gap-4">
              <span className="font-heading text-3xl sm:text-4xl font-black text-[#F7F7F5]">
                {formatVND(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#858585] line-through">
                  {formatVND(product.originalPrice)}
                </span>
              )}
              <span className="ml-auto text-xs font-bold text-[#C6FF3D] bg-[#0B0B0D] px-2.5 py-1 rounded">
                Có sẵn {product.stock} đôi
              </span>
            </div>

            {/* Color preview */}
            <div className="mt-6">
              <span className="text-xs font-semibold text-white/80 uppercase tracking-wider block mb-2">
                Phối màu:
              </span>
              <div className="flex items-center gap-3">
                {product.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#18181D] border border-white/10 text-xs"
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-white/80">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selector (Mandatory before checkout) */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span>Kích Cỡ Giày (EU Size):</span>
                  <span className="text-red-400">*</span>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('sizeGuide')}
                  className="text-[11px] text-[#C6FF3D] hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-3 h-3" />
                  <span>Bảng quy đổi size</span>
                </button>
              </div>

              {sizeError && (
                <p className="text-xs text-red-400 mb-2 font-semibold animate-pulse">
                  ⚠️ Vui lòng chọn một kích cỡ giày trước khi thêm vào giỏ hoặc đặt hàng.
                </p>
              )}

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => {
                        setSelectedSize(sz);
                        setSizeError(false);
                      }}
                      className={`py-3 rounded-xl font-mono text-sm font-bold transition-all ${
                        isSelected
                          ? 'bg-[#C6FF3D] text-[#0B0B0D] shadow-lg scale-102 ring-2 ring-[#C6FF3D]'
                          : 'bg-[#18181D] text-white/80 border border-white/10 hover:border-white/30'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                Số lượng:
              </span>
              <div className="flex items-center border border-white/10 rounded-xl bg-[#141417]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 text-white/70 hover:text-[#C6FF3D] transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-mono font-bold text-sm text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3.5 py-2 text-white/70 hover:text-[#C6FF3D] transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-[#858585]">
                (Tổng tạm tính: {formatVND(product.price * quantity)})
              </span>
            </div>

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 rounded-2xl bg-[#25262A] text-white font-display text-xs uppercase tracking-widest font-bold border border-white/10 hover:border-[#C6FF3D] hover:bg-[#2d2e33] transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#C6FF3D]" />
                <span>THÊM VÀO GIỎ HÀNG</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 py-4 px-6 rounded-2xl bg-[#C6FF3D] text-[#0B0B0D] font-display text-xs uppercase tracking-widest font-black hover:bg-[#d5ff6a] transition-all flex items-center justify-center gap-2 glow-volt-sm"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>MUA NGAY (GIAO TẬN NƠI)</span>
              </button>
            </div>

            {/* Brief Description */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Mô tả chi tiết:
              </h4>
              <p className="text-xs sm:text-sm text-[#858585] font-body leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Specs, Size Guide, Policies */}
        <div className="mt-20 pt-10 border-t border-white/10">
          <div className="flex items-center gap-4 border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveTab('specs')}
              className={`text-xs font-bold uppercase tracking-wider pb-2 relative transition-colors ${
                activeTab === 'specs' ? 'text-[#C6FF3D]' : 'text-white/60 hover:text-white'
              }`}
            >
              Thông số kỹ thuật & Công nghệ
              {activeTab === 'specs' && (
                <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#C6FF3D]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('sizeGuide')}
              className={`text-xs font-bold uppercase tracking-wider pb-2 relative transition-colors ${
                activeTab === 'sizeGuide' ? 'text-[#C6FF3D]' : 'text-white/60 hover:text-white'
              }`}
            >
              Bảng đo chọn cỡ giày chuẩn
              {activeTab === 'sizeGuide' && (
                <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#C6FF3D]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('policy')}
              className={`text-xs font-bold uppercase tracking-wider pb-2 relative transition-colors ${
                activeTab === 'policy' ? 'text-[#C6FF3D]' : 'text-white/60 hover:text-white'
              }`}
            >
              Chính sách giao nhận & Bảo hành
              {activeTab === 'policy' && (
                <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#C6FF3D]" />
              )}
            </button>
          </div>

          <div className="py-8">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h5 className="font-heading text-lg text-white uppercase">Đặc tính cấu trúc</h5>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-[#858585]">Trọng lượng trung bình:</span>
                      <span className="font-mono text-white font-bold">{product.specs.weight}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-[#858585]">Độ dốc gót (Drop):</span>
                      <span className="font-mono text-white font-bold">{product.specs.drop}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-[#858585]">Chất liệu thân (Upper):</span>
                      <span className="text-white font-bold">{product.specs.upper}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-[#858585]">Công nghệ đế ngoài (Sole):</span>
                      <span className="text-white font-bold">{product.specs.sole}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-[#858585]">Hệ đệm chấn động (Cushioning):</span>
                      <span className="text-white font-bold">{product.specs.cushioning}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-heading text-lg text-white uppercase mb-3">Tính năng nổi bật</h5>
                  <ul className="space-y-2.5">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-[#C6FF3D] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'sizeGuide' && (
              <div className="max-w-2xl space-y-4 text-xs text-white/80">
                <p>
                  Cách đo chuẩn: Đặt bàn chân lên một tờ giấy trắng, dùng bút kẻ viền gót và đầu ngón chân dài nhất,
                  đo khoảng cách tính bằng centimet (cm) và đối chiếu bảng sau:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border border-white/10 rounded-xl overflow-hidden">
                    <thead className="bg-[#18181D] text-[#C6FF3D] font-mono">
                      <tr>
                        <th className="p-3 border-b border-white/10">Chiều dài chân (cm)</th>
                        <th className="p-3 border-b border-white/10">EU Size</th>
                        <th className="p-3 border-b border-white/10">US Men</th>
                        <th className="p-3 border-b border-white/10">Khuyến nghị form chân</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                      <tr><td className="p-3">22.5 - 23.0</td><td className="p-3 font-bold text-white">36</td><td className="p-3">4.5</td><td className="p-3 font-sans">Chân thon gọn</td></tr>
                      <tr><td className="p-3">23.0 - 23.5</td><td className="p-3 font-bold text-white">37</td><td className="p-3">5.0</td><td className="p-3 font-sans">Tiêu chuẩn</td></tr>
                      <tr><td className="p-3">23.5 - 24.0</td><td className="p-3 font-bold text-white">38</td><td className="p-3">6.0</td><td className="p-3 font-sans">Tiêu chuẩn</td></tr>
                      <tr><td className="p-3">24.0 - 24.5</td><td className="p-3 font-bold text-white">39</td><td className="p-3">6.5</td><td className="p-3 font-sans">Tiêu chuẩn</td></tr>
                      <tr><td className="p-3">24.5 - 25.0</td><td className="p-3 font-bold text-white">40</td><td className="p-3">7.5</td><td className="p-3 font-sans">Tiêu chuẩn</td></tr>
                      <tr><td className="p-3">25.0 - 25.5</td><td className="p-3 font-bold text-white">41</td><td className="p-3">8.0</td><td className="p-3 font-sans">Khuyên +0.5 nếu chân bè</td></tr>
                      <tr><td className="p-3">25.5 - 26.0</td><td className="p-3 font-bold text-white">42</td><td className="p-3">9.0</td><td className="p-3 font-sans">Phổ biến nhất</td></tr>
                      <tr><td className="p-3">26.0 - 26.5</td><td className="p-3 font-bold text-white">43</td><td className="p-3">9.5</td><td className="p-3 font-sans">Tiêu chuẩn</td></tr>
                      <tr><td className="p-3">26.5 - 27.0</td><td className="p-3 font-bold text-white">44</td><td className="p-3">10.5</td><td className="p-3 font-sans">Chân to khỏe</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'policy' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-white/80">
                <div className="p-5 rounded-2xl bg-[#141417] border border-white/5">
                  <h6 className="font-heading text-sm text-white uppercase mb-2">Đồng Kiểm Khi Nhận</h6>
                  <p className="text-[#858585] leading-relaxed">
                    Khách hàng được quyền mở hộp kiểm tra đúng mẫu giày, đúng size và tình trạng nguyên vẹn
                    trước khi thanh toán tiền mặt cho shipper.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#141417] border border-white/5">
                  <h6 className="font-heading text-sm text-white uppercase mb-2">Đổi Size Tận Nơi 7 Ngày</h6>
                  <p className="text-[#858585] leading-relaxed">
                    Nếu đi không vừa chân, PITHY hỗ trợ gửi shipper giao size mới đến tận nhà và thu hồi đôi cũ,
                    khách hàng không cần mang ra bưu cục.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#141417] border border-white/5">
                  <h6 className="font-heading text-sm text-white uppercase mb-2">Bảo Hành 6 Tháng</h6>
                  <p className="text-[#858585] leading-relaxed">
                    Bảo hành miễn phí toàn bộ lỗi bung keo, đứt chỉ, gãy tấm đệm gầm trong 6 tháng thi đấu thể thao.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-10 border-t border-white/10">
            <h3 className="font-heading text-2xl text-white uppercase tracking-wider mb-8">
              Mẫu Giày Cùng Bộ Môn {product.categoryNameVi}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
