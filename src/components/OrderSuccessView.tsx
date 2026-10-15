import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Home, ShoppingBag, Printer, Database, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { formatVND, formatDateTimeVi } from '../utils/formatters';

export const OrderSuccessView: React.FC = () => {
  const { latestOrder, setCurrentPage } = useShop();

  useEffect(() => {
    // Elegant athletic volt and white confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C6FF3D', '#FFFFFF', '#25262A'],
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!latestOrder) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] text-white pt-32 pb-20 px-4 text-center">
        <h2 className="font-heading text-2xl uppercase mb-4">Không tìm thấy thông tin đơn hàng</h2>
        <button
          onClick={() => setCurrentPage('home')}
          className="px-6 py-2.5 rounded-xl bg-[#C6FF3D] text-[#0B0B0D] font-bold text-xs uppercase"
        >
          Về trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F7F7F5] pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-[#141417] border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Top celebratory halo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-[#C6FF3D]/15 rounded-full blur-[90px] pointer-events-none" />

          {/* Animated checkmark */}
          <div className="flex flex-col items-center text-center relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-[#C6FF3D]/10 border-2 border-[#C6FF3D] flex items-center justify-center glow-volt mb-5"
            >
              <CheckCircle2 className="w-10 h-10 text-[#C6FF3D]" />
            </motion.div>

            <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#C6FF3D]">
              XÁC NHẬN GIAO DỊCH THÀNH CÔNG
            </span>

            <h1 className="text-3xl sm:text-5xl font-black font-heading text-white uppercase mt-1">
              ĐẶT HÀNG THÀNH CÔNG!
            </h1>

            <p className="text-xs sm:text-sm text-[#858585] mt-2 max-w-md font-body">
              Cảm ơn <strong className="text-white">{latestOrder.customer.fullName}</strong> đã đồng hành cùng PITHY.
              Đơn hàng của bạn đã được ghi nhận vào hệ thống và chuẩn bị đóng gói.
            </p>

            {/* Order Code Callout */}
            <div className="mt-6 px-6 py-3.5 rounded-2xl bg-[#0B0B0D] border border-[#C6FF3D]/40 flex flex-col sm:flex-row items-center gap-3">
              <span className="text-xs text-[#858585] uppercase tracking-wider">MÃ ĐƠN HÀNG:</span>
              <span className="font-mono text-lg sm:text-xl font-black text-[#C6FF3D] tracking-wider select-all">
                {latestOrder.orderCode}
              </span>
            </div>
          </div>

          {/* Order Details Receipt Box */}
          <div className="mt-10 p-6 rounded-2xl bg-[#0B0B0D] border border-white/5 space-y-6">
            {/* Customer metadata grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-white/10 text-xs">
              <div>
                <span className="text-[#858585] block">Người nhận hàng:</span>
                <span className="font-bold text-white text-sm">{latestOrder.customer.fullName}</span>
                <span className="text-[#858585] block mt-1">{latestOrder.customer.phone}</span>
                <span className="text-white/70 block mt-1">{latestOrder.customer.address}</span>
              </div>

              <div className="sm:text-right">
                <span className="text-[#858585] block">Thời gian đặt:</span>
                <span className="font-mono text-white">{formatDateTimeVi(latestOrder.createdAt)}</span>
                <span className="text-[#858585] block mt-2">Phương thức:</span>
                <span className="font-bold text-[#C6FF3D]">
                  {latestOrder.paymentMethod === 'cod'
                    ? 'Thanh toán khi nhận hàng (COD)'
                    : 'Chuyển khoản ngân hàng (VietQR)'}
                </span>
                <span className="text-[#858585] block mt-1">Trạng thái:</span>
                <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[11px]">
                  {latestOrder.status}
                </span>
              </div>
            </div>

            {/* Items Table */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Chi tiết sản phẩm đã chọn ({latestOrder.items.length})
              </h4>
              <div className="space-y-3">
                {latestOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2 border-b border-white/5 text-xs"
                  >
                    <div>
                      <span className="font-bold text-white block">{item.productName}</span>
                      <span className="text-[#858585] text-[11px] font-mono">
                        Mã: {item.productCode} • Size: <strong className="text-[#C6FF3D]">{item.size}</strong> • SL: {item.quantity}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-white text-sm">
                      {formatVND(item.subtotal)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial summary */}
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-[#858585]">
                <span>Tạm tính tiền hàng:</span>
                <span className="font-mono text-white font-semibold">{formatVND(latestOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#858585]">
                <span>Phí vận chuyển toàn quốc:</span>
                <span className="text-[#C6FF3D] font-mono font-bold">0 VNĐ (Freeship)</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-white/10 text-sm font-bold">
                <span className="text-white uppercase tracking-wider">TỔNG CỘNG THANH TOÁN:</span>
                <span className="font-heading text-2xl text-[#C6FF3D]">
                  {formatVND(latestOrder.finalTotal)}
                </span>
              </div>
            </div>

            {/* Google Sheets Sync Indicator */}
            <div className="p-3.5 rounded-xl bg-[#141417] border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#C6FF3D]" />
                <span className="text-white/80">Lưu trữ dữ liệu:</span>
              </div>
              <span className="text-[#C6FF3D] font-mono font-bold">
                {latestOrder.syncedToGoogleSheets ? 'Đã ghi vào Google Sheets' : 'Đã lưu hệ thống Demo'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3 no-print">
            <button
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 min-w-[160px] py-3.5 px-5 rounded-xl bg-[#25262A] text-white hover:bg-white/15 transition-colors font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4 text-[#C6FF3D]" />
              <span>VỀ TRANG CHỦ</span>
            </button>

            <button
              onClick={() => {
                setCurrentPage('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 min-w-[160px] py-3.5 px-5 rounded-xl bg-[#C6FF3D] text-[#0B0B0D] hover:bg-[#d6ff66] transition-colors font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 glow-volt-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>TIẾP TỤC MUA SẮM</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-3.5 px-5 rounded-xl border border-white/10 text-white/80 hover:text-white hover:bg-white/5 transition-colors text-xs font-semibold flex items-center justify-center gap-2"
              title="In hóa đơn đơn hàng để nộp báo cáo môn học"
            >
              <Printer className="w-4 h-4" />
              <span>IN HÓA ĐƠN</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
