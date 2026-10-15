import React from 'react';
import { useShop } from '../context/ShopContext';
import { Database, ShieldCheck, RefreshCw, Truck, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenSheetsGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSheetsGuide }) => {
  const { setCurrentPage, setActiveCategory } = useShop();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08080A] text-[#858585] border-t border-white/10 pt-16 pb-12 relative">
      {/* 4 Brand Guarantees Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 px-6 rounded-2xl bg-[#121215] border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#25262A] text-[#C6FF3D] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase">Miễn Phí Vận Chuyển</h5>
              <p className="text-[11px] text-[#858585]">Đơn hàng toàn quốc</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#25262A] text-[#C6FF3D] flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase">Đổi Size 7 Ngày</h5>
              <p className="text-[11px] text-[#858585]">Hỗ trợ đổi size tận nơi</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#25262A] text-[#C6FF3D] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase">Bảo Hành 6 Tháng</h5>
              <p className="text-[11px] text-[#858585]">Keo chỉ & lỗi kỹ thuật</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#25262A] text-[#C6FF3D] flex items-center justify-center shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase">Google Sheets Sync</h5>
              <p className="text-[11px] text-[#858585]">Lưu trữ đơn hàng tự động</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* Brand info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#25262A] border border-[#C6FF3D]/50 flex items-center justify-center">
                <span className="font-heading text-2xl text-[#C6FF3D] italic">P</span>
              </div>
              <span className="font-heading text-2xl font-black text-white tracking-wider">
                PITHY
              </span>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-[#858585] leading-relaxed max-w-sm">
              PITHY — THE ART OF MOVEMENT. Dự án thực hành Thương mại Điện tử Đại học xây dựng website
              bán giày thể thao chuyên nghiệp với quy trình đặt hàng và tích hợp Google Sheets tự động.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={onOpenSheetsGuide}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#25262A] border border-white/10 hover:border-[#C6FF3D]/50 text-xs text-white transition-colors"
              >
                <Database className="w-3.5 h-3.5 text-[#C6FF3D]" />
                <span>Thiết lập Google Sheets</span>
              </button>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading text-sm text-white uppercase tracking-wider mb-4">
              Danh Mục Sản Phẩm
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('badminton');
                    setCurrentPage('badminton');
                    scrollToTop();
                  }}
                  className="hover:text-[#C6FF3D] transition-colors"
                >
                  Giày Cầu Lông (AeroStrike, CourtFlash)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('tennis');
                    setCurrentPage('tennis');
                    scrollToTop();
                  }}
                  className="hover:text-[#C6FF3D] transition-colors"
                >
                  Giày Tennis (Baseline Pro, CourtAce)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('running');
                    setCurrentPage('running');
                    scrollToTop();
                  }}
                  className="hover:text-[#C6FF3D] transition-colors"
                >
                  Giày Chạy Bộ (Velocity X, AirFlow)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setCurrentPage('products');
                    scrollToTop();
                  }}
                  className="hover:text-[#C6FF3D] transition-colors"
                >
                  Tất Cả 12 Sản Phẩm
                </button>
              </li>
            </ul>
          </div>

          {/* University Project Navigation */}
          <div>
            <h4 className="font-heading text-sm text-white uppercase tracking-wider mb-4">
              Dự Án & Báo Cáo
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('flowchart');
                    scrollToTop();
                  }}
                  className="hover:text-[#C6FF3D] transition-colors text-white font-semibold"
                >
                  Lưu Đồ Quy Trình Đặt Hàng (Flowchart)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('about');
                    scrollToTop();
                  }}
                  className="hover:text-[#C6FF3D] transition-colors"
                >
                  Giới Thiệu Thương Hiệu PITHY
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSheetsGuide}
                  className="hover:text-[#C6FF3D] transition-colors text-[#C6FF3D]"
                >
                  Mã Google Apps Script & Hướng Dẫn
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('checkout');
                    scrollToTop();
                  }}
                  className="hover:text-[#C6FF3D] transition-colors"
                >
                  Kiểm Thử Biểu Mẫu Đặt Hàng
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Simulation Contact */}
          <div>
            <h4 className="font-heading text-sm text-white uppercase tracking-wider mb-4">
              Thông Tin Thực Hành
            </h4>
            <div className="space-y-2 text-xs text-[#858585]">
              <p>Học phần: Thương Mại Điện Tử</p>
              <p>Đề tài: Hệ Thống Bán Giày Thể Thao PITHY</p>
              <p>Email hỗ trợ: demo.pithy@gmail.com</p>
              <p className="text-[11px] text-white/50 italic">
                * Dữ liệu cửa hàng và sản phẩm phục vụ bài tập môn học và chấm điểm giảng viên.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Scroll To Top */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <div>
            © 2026 PITHY — The Art of Movement. Bản quyền thuộc về Nhóm Dự Án Thương Mại Điện Tử.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#C6FF3D] transition-colors py-1 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/70"
          >
            <span>Lên đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
