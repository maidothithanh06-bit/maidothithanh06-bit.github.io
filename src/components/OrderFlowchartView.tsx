import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Printer, Info, CheckCircle2, AlertTriangle, ArrowDown, Database, Sparkles, HelpCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderFlowchartView: React.FC = () => {
  const { setCurrentPage } = useShop();
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      type: 'terminal',
      title: 'BẮT ĐẦU',
      description: 'Người dùng bắt đầu hành trình mua sắm trên thiết bị di động hoặc máy tính cá nhân.',
      tech: 'Giao diện tải trong <1.5s, hỗ trợ PWA và responsive đa nền tảng.',
    },
    {
      id: 2,
      type: 'process',
      title: 'Truy cập website PITHY',
      description: 'Hiển thị hoạt cảnh mở đầu sang trọng (Intro Splash), chuyển tiếp mượt vào Trang chủ.',
      tech: 'Framer Motion animation, tải bộ nhớ đệm hình ảnh và danh mục thể thao.',
    },
    {
      id: 3,
      type: 'process',
      title: 'Xem danh sách sản phẩm',
      description: 'Duyệt bộ sưu tập Cầu lông, Tennis, Chạy bộ; lọc theo giá và sắp xếp.',
      tech: 'Bộ lọc trạng thái tức thời Client-side, phân loại danh mục theo CategoryType.',
    },
    {
      id: 4,
      type: 'process',
      title: 'Chọn sản phẩm thể thao',
      description: 'Xem trang chi tiết sản phẩm với ảnh cận cảnh, bảng thông số kỹ thuật và công nghệ.',
      tech: 'Interactive image gallery, render thông số Drop, Upper, Sole, Cushioning.',
    },
    {
      id: 5,
      type: 'process',
      title: 'Chọn kích cỡ (Size) & Số lượng',
      description: 'Bắt buộc chọn cỡ giày chuẩn EU (36 - 44) và số lượng đặt (tối thiểu 1 đôi).',
      tech: 'Hệ thống kiểm tra tồn kho mô phỏng, cảnh báo ngay nếu người dùng chưa chọn size.',
    },
    {
      id: 6,
      type: 'process',
      title: 'Thêm vào giỏ hàng hoặc Mua ngay',
      description: 'Sản phẩm được lưu vào giỏ hàng dạng trượt hoặc chuyển thẳng sang trang Thanh toán.',
      tech: 'Đồng bộ tự động vào LocalStorage; gom nhóm nếu cùng mã + cùng size, tách dòng nếu khác size.',
    },
    {
      id: 7,
      type: 'process',
      title: 'Nhập thông tin khách hàng',
      description: 'Điền họ tên người nhận, số điện thoại, địa chỉ nhận hàng và ghi chú.',
      tech: 'Biểu mẫu OrderFormData kiểm soát trạng thái Real-time React hook.',
    },
    {
      id: 8,
      type: 'process',
      title: 'Chọn phương thức thanh toán',
      description: 'Lựa chọn Thanh toán khi nhận hàng (COD) hoặc Chuyển khoản ngân hàng (VietQR).',
      tech: 'Cung cấp hướng dẫn đồng kiểm hàng trước khi trả tiền mặt hoặc quét mã.',
    },
    {
      id: 9,
      type: 'process',
      title: 'Kiểm tra thông tin đơn hàng',
      description: 'Đối chiếu bảng tóm tắt: từng mặt hàng, kích cỡ, đơn giá, phí vận chuyển 0đ, tổng tiền.',
      tech: 'Tính toán lại tổng tiền từ giỏ hàng thực tế, loại bỏ nguy cơ sai lệch số liệu.',
    },
    {
      id: 10,
      type: 'process',
      title: 'Nhấn "Xác nhận đặt hàng"',
      description: 'Khách hàng hoàn tất biểu mẫu và nhấn nút xác nhận đặt hàng.',
      tech: 'Khóa tạm thời nút submit (isSubmitting = true) ngăn chặn việc gửi đơn trùng lặp (Double Submit).',
    },
    {
      id: 11,
      type: 'decision',
      title: 'Thông tin có hợp lệ không?',
      description: 'Kiểm tra họ tên không trống, số điện thoại đúng chuẩn Việt Nam 10 số, địa chỉ đầy đủ.',
      noBranch: 'Hiển thị thông báo lỗi tiếng Việt dưới từng ô nhập liệu → Yêu cầu khách hàng nhập lại.',
      yesBranch: 'Dữ liệu hợp lệ → Khởi tạo mã đơn hàng duy nhất PTH-YYYYMMDD-XXXXXX và tạo payload.',
      tech: 'Hàm validateVietnamesePhone và chống tấn công Formula Injection (Sanitization).',
    },
    {
      id: 12,
      type: 'decision',
      title: 'Lưu vào Google Sheets thành công?',
      description: 'Gửi yêu cầu POST tới Google Apps Script Web App và xử lý phản hồi HTTP.',
      noBranch: 'Hiển thị lỗi kết nối mạng / chưa cấp quyền → Giữ nguyên thông tin cho khách hàng thử lại.',
      yesBranch: 'Google Apps Script ghi nhận dữ liệu vào các cột A đến O với LockService → Trả về thành công.',
      tech: 'CORS header application/json, LockService.getScriptLock() chống xung đột đồng thời.',
    },
    {
      id: 13,
      type: 'process',
      title: 'Thông báo đặt hàng thành công',
      description: 'Xóa giỏ hàng, hiển thị trang xác nhận với mã đơn hàng, chi tiết biên nhận và pháo hoa.',
      tech: 'Canvas Confetti, chuyển hướng trang OrderSuccessView, lưu lịch sử đơn hàng vào thiết bị.',
    },
    {
      id: 14,
      type: 'terminal',
      title: 'KẾT THÚC',
      description: 'Quy trình hoàn tất. Khách hàng có thể tiếp tục mua sắm hoặc quay về trang chủ.',
      tech: 'Đơn hàng sẵn sàng để nhân viên cửa hàng gọi điện xác nhận và xuất kho.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F7F7F5] pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#C6FF3D] font-mono font-bold">
              BÁO CÁO HỌC PHẦN THƯƠNG MẠI ĐIỆN TỬ
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-heading text-white uppercase mt-1">
              LƯU ĐỒ QUY TRÌNH ĐẶT HÀNG
            </h1>
            <p className="text-xs sm:text-sm text-[#858585] mt-1 max-w-2xl">
              Mô hình hóa toàn bộ quy trình nghiệp vụ từ bước truy cập đến bước lưu trữ dữ liệu
              vào Google Sheets theo chuẩn ký hiệu BPMN / Flowchart quốc tế.
            </p>
          </div>

          <div className="flex items-center gap-3 no-print">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-[#25262A] text-white hover:bg-white/15 transition-colors text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-white/10"
              title="In bản vẽ lưu đồ nộp cho giảng viên"
            >
              <Printer className="w-4 h-4 text-[#C6FF3D]" />
              <span>In Lưu Đồ Nộp Bài</span>
            </button>
            <button
              onClick={() => setCurrentPage('checkout')}
              className="px-4 py-2.5 rounded-xl bg-[#C6FF3D] text-[#0B0B0D] font-bold text-xs uppercase tracking-wider hover:bg-[#d6ff66] transition-colors"
            >
              Thử Nghiệm Thực Tế
            </button>
          </div>
        </div>

        {/* Legend / Shape guide */}
        <div className="p-4 rounded-2xl bg-[#141417] border border-white/10 mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-6 rounded-full bg-[#C6FF3D] text-[#0B0B0D] flex items-center justify-center font-bold text-[10px]">
              START
            </div>
            <div>
              <span className="font-bold text-white block">Hình Bo Tròn / Oval</span>
              <span className="text-[#858585] text-[11px]">Điểm Bắt Đầu & Kết Thúc</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-6 rounded-md bg-[#25262A] border border-white/20 text-white flex items-center justify-center font-bold text-[10px]">
              PROC
            </div>
            <div>
              <span className="font-bold text-white block">Hình Chữ Nhật</span>
              <span className="text-[#858585] text-[11px]">Bước Xử Lý Nghiệp Vụ</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rotate-45 bg-[#1f2937] border border-[#C6FF3D] flex items-center justify-center text-[#C6FF3D] font-bold text-[8px] mx-1">
              ?
            </div>
            <div>
              <span className="font-bold text-white block">Hình Thoi (Diamond)</span>
              <span className="text-[#858585] text-[11px]">Điều Kiện Rẽ Nhánh (Có / Không)</span>
            </div>
          </div>
        </div>

        {/* Flowchart Diagram Stage */}
        <div className="relative py-6 flex flex-col items-center space-y-5">
          {steps.map((step, idx) => {
            const isSelected = selectedNode === step.id;

            if (step.type === 'terminal') {
              return (
                <React.Fragment key={step.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    onClick={() => setSelectedNode(isSelected ? null : step.id)}
                    className={`w-72 sm:w-80 py-4 px-6 rounded-full text-center cursor-pointer transition-all ${
                      step.title === 'BẮT ĐẦU'
                        ? 'bg-[#C6FF3D] text-[#0B0B0D] font-heading text-lg font-black tracking-wider glow-volt-sm'
                        : 'bg-white text-[#0B0B0D] font-heading text-lg font-black tracking-wider'
                    } ${isSelected ? 'ring-4 ring-[#C6FF3D]/50 scale-105' : 'hover:scale-102'}`}
                  >
                    {step.title}
                  </motion.div>
                  {idx < steps.length - 1 && (
                    <div className="flex flex-col items-center my-1 text-[#C6FF3D]">
                      <div className="w-0.5 h-6 bg-[#C6FF3D]/50" />
                      <ArrowDown className="w-4 h-4 -mt-1 text-[#C6FF3D]" />
                    </div>
                  )}
                </React.Fragment>
              );
            }

            if (step.type === 'decision') {
              return (
                <React.Fragment key={step.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full max-w-xl my-2"
                  >
                    {/* The Diamond Container */}
                    <div
                      onClick={() => setSelectedNode(isSelected ? null : step.id)}
                      className={`relative p-6 sm:p-8 rounded-3xl bg-[#1a1b22] border-2 border-[#C6FF3D] text-center cursor-pointer transition-all shadow-xl ${
                        isSelected ? 'ring-4 ring-[#C6FF3D]/30 bg-[#22242e]' : 'hover:border-white'
                      }`}
                    >
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C6FF3D] block mb-1">
                        ĐIỀU KIỆN QUYẾT ĐỊNH (DECISION POINT)
                      </span>
                      <h3 className="font-heading text-xl sm:text-2xl text-white uppercase font-black">
                        {step.title}
                      </h3>
                      <p className="text-xs text-[#858585] mt-1">{step.description}</p>

                      {/* 2 Branches Visual: NO vs YES */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/10 text-left">
                        {/* NO Branch */}
                        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 mb-1 uppercase">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Nếu KHÔNG (Hợp lệ = False):</span>
                          </div>
                          <p className="text-[11px] text-white/80 leading-relaxed">
                            {step.noBranch}
                          </p>
                        </div>

                        {/* YES Branch */}
                        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-[#C6FF3D]/40">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#C6FF3D] mb-1 uppercase">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Nếu CÓ (Hợp lệ = True):</span>
                          </div>
                          <p className="text-[11px] text-white/80 leading-relaxed">
                            {step.yesBranch}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {idx < steps.length - 1 && (
                    <div className="flex flex-col items-center my-1 text-[#C6FF3D]">
                      <div className="w-0.5 h-6 bg-[#C6FF3D]/50" />
                      <ArrowDown className="w-4 h-4 -mt-1 text-[#C6FF3D]" />
                    </div>
                  )}
                </React.Fragment>
              );
            }

            // Normal Process Rectangle
            return (
              <React.Fragment key={step.id}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedNode(isSelected ? null : step.id)}
                  className={`w-full max-w-md p-4 sm:p-5 rounded-2xl bg-[#141417] border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#C6FF3D] bg-[#1d1e24] shadow-lg'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-8 h-8 rounded-lg bg-[#25262A] text-[#C6FF3D] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      0{step.id}
                    </span>
                    <div>
                      <h4 className="font-heading text-base text-white uppercase tracking-wide">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#858585] line-clamp-1">{step.description}</p>
                    </div>
                  </div>

                  <Info className={`w-4 h-4 ${isSelected ? 'text-[#C6FF3D]' : 'text-white/30'} shrink-0`} />
                </motion.div>

                {/* Expanded Technical Detail drawer */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="w-full max-w-md p-4 rounded-xl bg-[#0B0B0D] border border-[#C6FF3D]/40 text-xs text-white/90 space-y-2 -mt-2"
                  >
                    <div>
                      <span className="text-[#C6FF3D] font-bold block uppercase tracking-wider text-[10px]">
                        Mô tả chi tiết:
                      </span>
                      <p className="text-[#858585] mt-0.5">{step.description}</p>
                    </div>
                    <div>
                      <span className="text-[#C6FF3D] font-bold block uppercase tracking-wider text-[10px]">
                        Xử lý kỹ thuật (Tech Implementation):
                      </span>
                      <p className="font-mono text-white/80 text-[11px] mt-0.5">{step.tech}</p>
                    </div>
                  </motion.div>
                )}

                {idx < steps.length - 1 && (
                  <div className="flex flex-col items-center my-1 text-[#C6FF3D]">
                    <div className="w-0.5 h-6 bg-[#C6FF3D]/50" />
                    <ArrowDown className="w-4 h-4 -mt-1 text-[#C6FF3D]" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
