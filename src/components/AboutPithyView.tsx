import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Award, ShieldCheck, Heart, ArrowRight, Zap, Target, Users } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AboutPithyView: React.FC = () => {
  const { setCurrentPage } = useShop();

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F7F7F5] pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero Banner */}
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C6FF3D] font-mono font-bold">
            THƯƠNG HIỆU & TRIẾT LÝ THIẾT KẾ
          </span>
          <h1 className="text-4xl sm:text-7xl font-black font-heading text-white uppercase tracking-tight">
            VỀ CHÚNG TÔI — PITHY
          </h1>
          <p className="text-lg sm:text-xl text-[#C6FF3D] font-mono font-bold">
            THE ART OF MOVEMENT
          </p>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#858585] leading-relaxed font-body">
            "PITHY không chỉ tạo nên những đôi giày. Chúng tôi đồng hành cùng từng chuyển động,
            từng giới hạn được phá vỡ và từng bước tiến về phía trước."
          </p>
        </div>

        {/* Brand Narrative Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-8 sm:p-12 rounded-3xl bg-[#141417] border border-white/10">
          <div>
            <span className="text-xs font-mono font-bold text-[#C6FF3D] uppercase tracking-wider block mb-2">
              SỨ MỆNH CỦA PITHY
            </span>
            <h2 className="font-heading text-3xl font-black text-white uppercase mb-4">
              KẾT NỐI CÔNG NGHỆ & TỐC ĐỘ
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#858585] leading-relaxed">
              <p>
                Được thành lập với khát khao mang đến những sản phẩm giày thể thao có chất lượng tương đương
                các thương hiệu hàng đầu thế giới (Nike, Adidas, On Running), PITHY tập trung vào 3 môn vận động
                có tốc độ và tần suất chuyển hướng cao nhất: Cầu lông, Tennis và Chạy bộ.
              </p>
              <p>
                Website PITHY được phát triển như một dự án chuẩn mực cho môn Thương mại Điện tử,
                kết hợp giữa trải nghiệm thị giác đột phá theo phong cách Awwwards và quy trình mua sắm,
                xác thực đơn hàng liền mạch với Google Sheets.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#25262A] flex items-center justify-center p-6 border border-white/5">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85"
              alt="PITHY Sports Shoe"
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>

        {/* 3 Sports Disciplines */}
        <div>
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold text-[#C6FF3D] uppercase tracking-widest">
              BA MÔN THỂ THAO TRỌNG TÂM
            </span>
            <h3 className="font-heading text-3xl font-black text-white uppercase mt-1">
              CHUYÊN MÔN HÓA ĐẾN TỪNG CHI TIẾT
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#141417] border border-white/5 space-y-3">
              <span className="text-2xl font-heading text-[#C6FF3D]">01</span>
              <h4 className="font-heading text-xl text-white uppercase">Cầu Lông (Badminton)</h4>
              <p className="text-xs text-[#858585] leading-relaxed">
                Đặc thù nhảy đập (smash) và di chuyển bước chân nhanh đòi hỏi đế bám sân đa hướng Radial Grip
                và đĩa Carbon chống lật cổ chân tuyệt đối.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141417] border border-white/5 space-y-3">
              <span className="text-2xl font-heading text-[#C6FF3D]">02</span>
              <h4 className="font-heading text-xl text-white uppercase">Tennis (Quần Vợt)</h4>
              <p className="text-xs text-[#858585] leading-relaxed">
                Mặt sân cứng mài mòn cao yêu cầu vật liệu cao su đúc nguyên khối gia cường hạt gốm
                và khung đỡ hai bên má chân bảo vệ khi trượt cứu bóng.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141417] border border-white/5 space-y-3">
              <span className="text-2xl font-heading text-[#C6FF3D]">03</span>
              <h4 className="font-heading text-xl text-white uppercase">Chạy Bộ (Running)</h4>
              <p className="text-xs text-[#858585] leading-relaxed">
                Đĩa đệm uốn cong Carbon Fiber Plate và bọt PEBA Nitro hoàn trả 88% năng lượng,
                giúp người chạy duy trì guồng chân (cadence) ổn định ở mọi cự ly.
              </p>
            </div>
          </div>
        </div>

        {/* Academic Project Credits for Professor */}
        <div className="p-8 rounded-3xl bg-[#0B0B0D] border-2 border-[#C6FF3D]/30 space-y-4">
          <div className="flex items-center gap-3 text-[#C6FF3D]">
            <Award className="w-6 h-6" />
            <h3 className="font-heading text-xl text-white uppercase tracking-wider">
              BÁO CÁO MÔN HỌC THƯƠNG MẠI ĐIỆN TỬ
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#858585] leading-relaxed">
            Dự án được xây dựng đáp ứng toàn bộ các tiêu chí chấm điểm chuyên ngành:
            Thiết kế nhận diện thương hiệu độc lập (PITHY), kiến trúc thông tin chuẩn e-commerce,
            giỏ hàng bền vững với LocalStorage, kiểm thử tính hợp lệ dữ liệu biểu mẫu thanh toán,
            lưu trữ tự động vào Google Sheets thông qua Google Apps Script Web App và tài liệu lưu đồ quy trình nghiệp vụ BPMN.
          </p>
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setCurrentPage('flowchart')}
              className="px-5 py-2.5 rounded-xl bg-[#25262A] hover:bg-white/15 text-white text-xs font-bold uppercase transition-colors"
            >
              Xem Lưu Đồ Nghiệp Vụ (Flowchart)
            </button>
            <button
              onClick={() => setCurrentPage('products')}
              className="px-5 py-2.5 rounded-xl bg-[#C6FF3D] text-[#0B0B0D] text-xs font-black uppercase transition-colors glow-volt-sm"
            >
              Xem Toàn Bộ Sản Phẩm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
