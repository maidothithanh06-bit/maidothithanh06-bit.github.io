import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatVND } from '../utils/formatters';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    shippingFee,
    cartFinalTotal,
    setCurrentPage,
    clearCart,
  } = useShop();

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#101014] text-[#F7F7F5] border-l border-white/10 flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#25262A] text-[#C6FF3D] flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-black text-white uppercase tracking-wider">
                      GIỎ HÀNG CỦA BẠN
                    </h3>
                    <span className="text-xs text-[#858585]">
                      {cart.length > 0 ? `${cart.length} mẫu mã đã chọn` : 'Chưa có sản phẩm'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Đóng giỏ hàng"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[#1c1d22] flex items-center justify-center text-white/30 mb-4">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h4 className="font-heading text-xl text-white uppercase">Giỏ hàng đang trống</h4>
                    <p className="text-xs text-[#858585] mt-1 max-w-xs">
                      Hãy khám phá các dòng giày Cầu lông, Tennis và Chạy bộ PITHY để bắt đầu chuyển động!
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setCurrentPage('products');
                      }}
                      className="mt-6 px-6 py-2.5 rounded-xl bg-[#C6FF3D] text-[#0B0B0D] font-bold text-xs uppercase tracking-wider hover:bg-[#d5ff6a] transition-colors"
                    >
                      Xem sản phẩm ngay
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between text-xs text-[#858585] pb-2 border-b border-white/5">
                      <span>Sản phẩm & Kích cỡ</span>
                      <button
                        onClick={clearCart}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        Xóa tất cả
                      </button>
                    </div>

                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-[#18181D] border border-white/5 flex gap-4 items-center"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-16 object-contain rounded-lg bg-[#25262A] p-1.5 shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] font-mono text-[#C6FF3D] bg-[#0B0B0D] px-2 py-0.5 rounded font-bold">
                              Size {item.selectedSize}
                            </span>
                            <span className="text-[11px] text-[#858585]">
                              {formatVND(item.product.price)}
                            </span>
                          </div>

                          {/* Quantity control */}
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center border border-white/10 rounded-lg bg-[#0B0B0D]">
                              <button
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:text-[#C6FF3D] transition-colors"
                                aria-label="Giảm số lượng"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-mono font-bold text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:text-[#C6FF3D] transition-colors"
                                aria-label="Tăng số lượng"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-xs font-bold font-mono text-white ml-auto">
                              {formatVND(item.product.price * item.quantity)}
                            </span>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-white/40 hover:text-red-400 p-1 transition-colors"
                              title="Xóa khỏi giỏ"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Drawer Footer with Totals */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-[#0B0B0D] space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#858585]">
                    <span>Tạm tính hàng hóa:</span>
                    <span className="font-mono text-white font-semibold">{formatVND(cartSubtotal)}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#858585]">
                    <span className="flex items-center gap-1.5">
                      <span>Phí vận chuyển toàn quốc:</span>
                      <span className="text-[10px] bg-[#C6FF3D]/20 text-[#C6FF3D] px-1.5 py-0.2 rounded font-bold">
                        FREE
                      </span>
                    </span>
                    <span className="font-mono text-[#C6FF3D] font-bold">0 VNĐ</span>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-white font-bold block">
                        Tổng thanh toán:
                      </span>
                      <span className="text-[10px] text-[#858585]">Đã bao gồm VAT</span>
                    </div>
                    <span className="font-heading text-2xl font-black text-[#C6FF3D]">
                      {formatVND(cartFinalTotal)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={handleCheckout}
                      className="w-full py-4 rounded-xl bg-[#C6FF3D] text-[#0B0B0D] font-heading text-sm font-black uppercase tracking-wider hover:bg-[#d5ff6a] transition-all flex items-center justify-center gap-2 glow-volt-sm"
                    >
                      <span>TIẾN HÀNH ĐẶT HÀNG</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-2.5 text-center text-xs text-[#858585] hover:text-white uppercase font-bold tracking-wider transition-colors"
                    >
                      Tiếp tục chọn thêm giày
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
