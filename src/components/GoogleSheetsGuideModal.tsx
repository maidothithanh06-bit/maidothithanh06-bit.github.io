import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  Database,
  Terminal,
  ShieldCheck,
  Send,
  Globe,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SAMPLE_GOOGLE_APPS_SCRIPT_CODE } from '../services/googleSheetsService';

interface GoogleSheetsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleSheetsGuideModal: React.FC<GoogleSheetsGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { sheetsConfig, updateSheetsConfig, addToast } = useShop();

  const [activeTab, setActiveTab] = useState<'config' | 'code' | 'steps' | 'deployment'>('config');
  const [copied, setCopied] = useState(false);
  const [tempUrl, setTempUrl] = useState(sheetsConfig.webhookUrl || '');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ status: 'idle' | 'success' | 'error'; message: string }>({
    status: 'idle',
    message: '',
  });

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(SAMPLE_GOOGLE_APPS_SCRIPT_CODE);
      setCopied(true);
      addToast('success', 'Đã sao chép mã nguồn Apps Script!', 'Bạn có thể dán trực tiếp vào Trình chỉnh sửa Apps Script.');
      setTimeout(() => setCopied(false), 3000);
    } catch {
      addToast('error', 'Không thể sao chép tự động', 'Vui lòng chọn toàn bộ đoạn mã và nhấn Ctrl+C.');
    }
  };

  const handleSaveConfig = () => {
    updateSheetsConfig({
      webhookUrl: tempUrl.trim(),
    });
    setTestResult({ status: 'idle', message: '' });
  };

  const handleTestConnection = async () => {
    if (!tempUrl.trim().startsWith('http')) {
      setTestResult({
        status: 'error',
        message: 'URL không hợp lệ. Vui lòng dán URL có dạng: https://script.google.com/macros/s/.../exec',
      });
      return;
    }

    setIsTesting(true);
    setTestResult({ status: 'idle', message: 'Đang kết nối thử nghiệm...' });

    try {
      // Test GET request or lightweight POST to check endpoint
      const response = await fetch(tempUrl.trim(), {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          action: 'PING_TEST',
          rows: [],
        }),
      });

      setTestResult({
        status: 'success',
        message: '✅ Kết nối Google Apps Script thành công! Máy chủ đã tiếp nhận yêu cầu.',
      });
      addToast('success', 'Kết nối Google Sheets thành công!', 'Hệ thống đã sẵn sàng ghi nhận đơn hàng thật.');
    } catch (e: any) {
      setTestResult({
        status: 'error',
        message: `Kết nối gặp lỗi hoặc bị chặn: ${e.message}. Hãy đảm bảo bạn đã chọn quyền truy cập là "Anyone" (Bất kỳ ai) khi Triển khai Web App.`,
      });
    } finally {
      setIsTesting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-4xl bg-[#141417] text-[#F7F7F5] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0B0B0D]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#25262A] text-[#C6FF3D] flex items-center justify-center border border-[#C6FF3D]/30 glow-volt-sm">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-black text-white uppercase tracking-wider">
                TÍCH HỢP GOOGLE SHEETS & TRIỂN KHAI WEB
              </h3>
              <p className="text-xs text-[#858585]">
                Tài liệu hướng dẫn 9 bước thực hành nộp bài cho Giảng viên môn Thương mại Điện tử
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/5 bg-[#101013] text-xs">
          <button
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2.5 font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'config'
                ? 'text-[#C6FF3D] border-[#C6FF3D]'
                : 'text-white/60 border-transparent hover:text-white'
            }`}
          >
            1. Cấu hình & Kiểm tra URL
          </button>
          <button
            onClick={() => setActiveTab('steps')}
            className={`px-4 py-2.5 font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'steps'
                ? 'text-[#C6FF3D] border-[#C6FF3D]'
                : 'text-white/60 border-transparent hover:text-white'
            }`}
          >
            2. Hướng dẫn 9 Bước chi tiết
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2.5 font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'code'
                ? 'text-[#C6FF3D] border-[#C6FF3D]'
                : 'text-white/60 border-transparent hover:text-white'
            }`}
          >
            3. Mã nguồn Apps Script (Copy)
          </button>
          <button
            onClick={() => setActiveTab('deployment')}
            className={`px-4 py-2.5 font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'deployment'
                ? 'text-[#C6FF3D] border-[#C6FF3D]'
                : 'text-white/60 border-transparent hover:text-white'
            }`}
          >
            4. Đưa Website lên Internet
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: CONFIG & TEST */}
          {activeTab === 'config' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-[#0B0B0D] border border-white/10 space-y-3">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  Dán URL Web App của Google Apps Script tại đây:
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                    value={tempUrl}
                    onChange={(e) => setTempUrl(e.target.value)}
                    className="flex-1 bg-[#141417] text-sm text-white px-4 py-3 rounded-xl border border-white/20 focus:border-[#C6FF3D] focus:outline-none font-mono"
                  />
                  <button
                    onClick={handleSaveConfig}
                    className="px-6 py-3 bg-[#C6FF3D] text-[#0B0B0D] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#d5ff6a] transition-all whitespace-nowrap glow-volt-sm"
                  >
                    Lưu cấu hình
                  </button>
                </div>
                <p className="text-[11px] text-[#858585]">
                  * Lưu ý: URL phải kết thúc bằng chữ <code className="text-[#C6FF3D]">/exec</code> (không phải /edit hoặc /dev).
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleTestConnection}
                  disabled={isTesting || !tempUrl.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#25262A] text-white hover:bg-white/15 transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-white/10 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-[#C6FF3D]" />
                  <span>{isTesting ? 'Đang gửi ping...' : 'Kiểm tra kết nối (Ping Test)'}</span>
                </button>

                <button
                  onClick={() => {
                    setTempUrl('');
                    updateSheetsConfig({ webhookUrl: '' });
                    setTestResult({ status: 'idle', message: '' });
                    addToast('info', 'Đã xóa URL', 'Hệ thống chuyển về chế độ Demo an toàn.');
                  }}
                  className="px-4 py-2.5 text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  Xóa URL / Chuyển sang chế độ Demo
                </button>
              </div>

              {/* Test result feedback */}
              {testResult.message && (
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    testResult.status === 'success'
                      ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                      : testResult.status === 'error'
                      ? 'bg-red-950/50 border-red-500/40 text-red-200'
                      : 'bg-white/5 border-white/10 text-white'
                  }`}
                >
                  {testResult.message}
                </div>
              )}

              {/* Status explanation */}
              <div className="p-4 rounded-2xl bg-[#18181D] border border-white/5 space-y-2 text-xs text-white/80">
                <h5 className="font-bold text-white uppercase flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C6FF3D]" />
                  <span>Cơ chế bảo vệ dữ liệu hai lớp của PITHY:</span>
                </h5>
                <p>
                  1. <strong>Lưu đệm LocalStorage:</strong> Mọi đơn hàng sau khi nhấn đặt đều được lưu trữ an toàn ngay trên trình duyệt, không bao giờ bị mất dữ liệu ngay cả khi mất mạng.
                </p>
                <p>
                  2. <strong>Đồng bộ Google Sheets:</strong> Khi đã cấu hình Webhook URL, hệ thống sẽ đẩy đồng thời từng dòng sản phẩm sang bảng tính Google Sheets của bạn để giảng viên trực tiếp chấm điểm.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: 9 STEPS IN VIETNAMESE */}
          {activeTab === 'steps' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#0B0B0D] border border-white/10 mb-4">
                <h4 className="font-heading text-sm text-[#C6FF3D] uppercase tracking-wider mb-1">
                  Quy Trình 9 Bước Thiết Lập Google Sheets Cho Bài Tập Lớn
                </h4>
                <p className="text-[#858585]">
                  Thực hiện đúng 9 bước dưới đây để kết nối bảng tính thực tế:
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    step: 'Bước 1',
                    title: 'Tạo Google Sheets mới',
                    desc: 'Truy cập sheets.google.com và tạo một Bảng tính trống mới. Đặt tên là "PITHY E-Commerce - Quản lý đơn hàng".',
                  },
                  {
                    step: 'Bước 2',
                    title: 'Mở trình soạn thảo Apps Script',
                    desc: 'Trên thanh menu của Google Sheets, chọn: Tiện ích mở rộng (Extensions) → Apps Script.',
                  },
                  {
                    step: 'Bước 3',
                    title: 'Dán mã nguồn',
                    desc: 'Xóa toàn bộ mã mặc định trong tệp Mã.gs, chuyển sang tab "Mã nguồn Apps Script" ở modal này, nhấn nút "Sao chép toàn bộ mã" và dán vào.',
                  },
                  {
                    step: 'Bước 4',
                    title: 'Lưu dự án Apps Script',
                    desc: 'Nhấn biểu tượng Đĩa mềm (Lưu dự án) hoặc phím Ctrl+S để lưu mã nguồn.',
                  },
                  {
                    step: 'Bước 5',
                    title: 'Triển khai dưới dạng Web App (QUAN TRỌNG NHẤT)',
                    desc: 'Nhấn nút màu xanh: Triển khai (Deploy) → Tùy chọn triển khai mới (New deployment). Chọn loại bánh răng: Ứng dụng web (Web app).',
                  },
                  {
                    step: 'Bước 6',
                    title: 'Cấu hình quyền truy cập công khai',
                    desc: 'Tại mục "Người có quyền truy cập" (Who has access), BẮT BUỘC chọn: "Bất kỳ ai" (Anyone). Nhấn Triển khai (Deploy) và cấp quyền truy cập tài khoản Google của bạn.',
                  },
                  {
                    step: 'Bước 7',
                    title: 'Lấy URL Web App',
                    desc: 'Sao chép đường liên kết tại mục "Ứng dụng web" (URL có đuôi kết thúc bằng /exec).',
                  },
                  {
                    step: 'Bước 8',
                    title: 'Dán URL vào website PITHY',
                    desc: 'Quay lại tab "Cấu hình & Kiểm tra URL" ở modal này, dán URL vào và nhấn "Lưu cấu hình", sau đó nhấn "Kiểm tra kết nối".',
                  },
                  {
                    step: 'Bước 9',
                    title: 'Đặt thử đơn hàng & Đối chiếu kết quả',
                    desc: 'Chọn 1 đôi giày PITHY, nhập thông tin đặt hàng. Sau khi màn hình hiển thị "Đặt hàng thành công", hãy mở tab Google Sheets: Bạn sẽ thấy dòng dữ liệu lập tức xuất hiện đầy đủ 15 cột từ A đến O!',
                  },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#141417] border border-white/5 flex gap-3.5 items-start"
                  >
                    <span className="px-2.5 py-1 rounded bg-[#25262A] text-[#C6FF3D] font-mono font-bold text-[11px] shrink-0">
                      {s.step}
                    </span>
                    <div>
                      <h5 className="font-bold text-white text-xs">{s.title}</h5>
                      <p className="text-[#858585] text-[11px] mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CODE DISPLAY */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#858585]">
                  Mã nguồn Google Apps Script đã cấu hình sẵn 15 cột A-O và LockService:
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-4 py-2 bg-[#C6FF3D] text-[#0B0B0D] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#d5ff6a] transition-all flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'ĐÃ SAO CHÉP MÃ' : 'SAO CHÉP TOÀN BỘ MÃ'}</span>
                </button>
              </div>

              <div className="relative rounded-2xl bg-[#0B0B0D] border border-white/10 p-4 overflow-x-auto max-h-[380px]">
                <pre className="font-mono text-[11px] text-emerald-400/90 leading-relaxed">
                  <code>{SAMPLE_GOOGLE_APPS_SCRIPT_CODE}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: DEPLOYMENT GUIDE */}
          {activeTab === 'deployment' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#0B0B0D] border border-white/10">
                <h4 className="font-heading text-sm text-[#C6FF3D] uppercase tracking-wider mb-1">
                  Hướng Dẫn Đưa Website Lên Internet (Vercel / Netlify)
                </h4>
                <p className="text-[#858585]">
                  Theo yêu cầu của giảng viên, website phải có link công khai để chấm điểm:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#18181D] border border-white/5 space-y-2">
                  <h5 className="font-bold text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#C6FF3D]" />
                    <span>Cách 1: Triển khai nhanh qua Vercel (Khuyên dùng)</span>
                  </h5>
                  <p className="text-[#858585]">
                    1. Đăng ký tài khoản miễn phí tại vercel.com bằng GitHub.<br />
                    2. Đẩy mã nguồn dự án lên một kho GitHub cá nhân.<br />
                    3. Trên giao diện Vercel, chọn "Add New..." → "Project" → Chọn kho PITHY vừa đẩy.<br />
                    4. Giữ nguyên cấu hình Build: <code className="text-white">npm run build</code> và thư mục Output: <code className="text-white">dist</code>.<br />
                    5. Nhấn "Deploy". Sau khoảng 1 phút, bạn sẽ nhận được đường link dạng: <code className="text-[#C6FF3D]">https://pithy-ecommerce.vercel.app</code>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#18181D] border border-white/5 space-y-2">
                  <h5 className="font-bold text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#C6FF3D]" />
                    <span>Cách 2: Triển khai qua Netlify</span>
                  </h5>
                  <p className="text-[#858585]">
                    1. Đăng nhập Netlify (netlify.com).<br />
                    2. Kéo thả thư mục <code className="text-white">dist</code> sau khi chạy <code className="text-white">npm run build</code> vào ô "Deploy manually".<br />
                    3. Netlify sẽ tự động cấp một domain công khai HTTPS hoàn toàn miễn phí.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 bg-[#0B0B0D] flex items-center justify-between">
          <span className="text-[11px] text-[#858585]">
            Hỗ trợ báo cáo môn học Thương Mại Điện Tử • PITHY 2026
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#25262A] text-white hover:bg-white/15 text-xs font-bold uppercase transition-colors"
          >
            Đóng cửa sổ
          </button>
        </div>
      </motion.div>
    </div>
  );
};
