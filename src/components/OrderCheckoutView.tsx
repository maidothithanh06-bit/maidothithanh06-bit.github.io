import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  QrCode,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Database,
  Lock,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderFormData, OrderRecord } from '../types';
import {
  formatVND,
  generateOrderCode,
  validateVietnamesePhone,
  validateEmail,
} from '../utils/formatters';

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
  cart?: string;
}

export const OrderCheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    shippingFee,
    cartFinalTotal,
    setCurrentPage,
    submitOrder,
    sheetsConfig,
    addToast,
  } = useShop();

  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
    paymentMethod: 'cod',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên người nhận hàng.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Họ và tên quá ngắn (tối thiểu 2 ký tự).';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại nhận hàng.';
    } else if (!validateVietnamesePhone(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (Cần 10 chữ số, bắt đầu bằng 03, 05, 07, 08, 09).';
    }

    if (formData.email.trim() && !validateEmail(formData.email)) {
      newErrors.email = 'Định dạng email chưa chính xác (ví dụ: email@gmail.com).';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ nhận hàng chi tiết (số nhà, đường, phường/xã, quận/huyện).';
    }

    if (cart.length === 0) {
      newErrors.cart = 'Giỏ hàng của bạn đang trống. Vui lòng chọn sản phẩm trước khi đặt hàng.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field being edited
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!validateForm()) {
      addToast('error', 'Thông tin chưa hợp lệ', 'Vui lòng kiểm tra các lỗi được đánh dấu màu đỏ.');
      return;
    }

    setIsSubmitting(true);

    // Build the robust OrderRecord
    const orderCode = generateOrderCode();
    const orderRecord: OrderRecord = {
      orderCode,
      createdAt: new Date().toISOString(),
      customer: formData,
      items: cart.map((item) => ({
        productId: item.product.id,
        productCode: item.product.code,
        productName: item.product.name,
        category: item.product.categoryNameVi,
        size: item.selectedSize,
        quantity: item.quantity,
        unitPrice: item.product.price,
        subtotal: item.product.price * item.quantity,
      })),
      subtotal: cartSubtotal,
      shippingFee: 0,
      discount: 0,
      finalTotal: cartFinalTotal,
      paymentMethod: formData.paymentMethod,
      status: 'Chờ xác nhận',
      syncedToGoogleSheets: false,
    };

    try {
      const result = await submitOrder(orderRecord);
      if (!result.success) {
        setSubmissionError(result.message);
        addToast('error', 'Gửi đơn hàng thất bại', result.message);
      }
    } catch (err: any) {
      setSubmissionError(err.message || 'Có lỗi xảy ra khi lưu đơn hàng');
      addToast('error', 'Lỗi kết nối', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] text-white pt-32 pb-20 px-4 text-center">
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-[#141417] border border-white/10">
          <AlertCircle className="w-12 h-12 text-[#C6FF3D] mx-auto mb-4" />
          <h2 className="font-heading text-2xl uppercase mb-2">Giỏ hàng của bạn đang trống</h2>
          <p className="text-xs text-[#858585] mb-6">
            Bạn chưa chọn mẫu giày thể thao nào để thanh toán. Vui lòng quay lại danh mục sản phẩm.
          </p>
          <button
            onClick={() => setCurrentPage('products')}
            className="px-6 py-3 rounded-xl bg-[#C6FF3D] text-[#0B0B0D] font-bold text-xs uppercase tracking-wider"
          >
            Khám phá giày PITHY
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F7F7F5] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <button
          onClick={() => setCurrentPage('products')}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#858585] hover:text-[#C6FF3D] transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>QUAY LẠI MUA SẮM</span>
        </button>

        {/* Page Title */}
        <div className="mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C6FF3D] font-mono font-bold">
            QUY TRÌNH THANH TOÁN TIÊU CHUẨN
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-white uppercase mt-1">
            ĐẶT HÀNG & GIAO NHẬN
          </h1>
          <p className="text-xs sm:text-sm text-[#858585] mt-1">
            Vui lòng điền thông tin người nhận. Đơn hàng sẽ được tự động lưu vào hệ thống và đồng bộ Google Sheets.
          </p>
        </div>

        {/* Sheet Connection Status Banner */}
        <div className="mb-8 p-3.5 rounded-2xl bg-[#141417] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Database className="w-4 h-4 text-[#C6FF3D] shrink-0" />
            <span>
              Trạng thái tích hợp:{' '}
              <strong className={sheetsConfig.webhookUrl ? 'text-[#C6FF3D]' : 'text-amber-400'}>
                {sheetsConfig.webhookUrl ? 'Đã liên kết Google Sheets thật' : 'Chế độ Demo / Lưu LocalStorage'}
              </strong>
            </span>
          </div>
          <span className="text-[11px] text-[#858585]">
            Mã định dạng chuẩn: <code className="text-white bg-black/40 px-1.5 py-0.5 rounded">PTH-YYYYMMDD-XXXXXX</code>
          </span>
        </div>

        {submissionError && (
          <div className="mb-8 p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Lưu đơn hàng không thành công:</p>
              <p className="mt-0.5 text-white/80">{submissionError}</p>
              <p className="mt-1 text-[11px] text-white/60">
                Thông tin của bạn vẫn được giữ nguyên. Hãy kiểm tra lại kết nối mạng hoặc thử lại.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: Customer Input Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Box 1: Receiver Details */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#141417] border border-white/10 space-y-5">
                <h3 className="font-heading text-lg text-white uppercase tracking-wider flex items-center gap-2">
                  <span>1. THÔNG TIN KHÁCH HÀNG</span>
                  <span className="text-red-400 text-sm">*</span>
                </h3>

                {/* Full name */}
                <div>
                  <label className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-2">
                    Họ và tên người nhận <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className={`w-full bg-[#0B0B0D] text-sm text-white px-4 py-3 rounded-xl border focus:outline-none transition-colors ${
                      errors.fullName
                        ? 'border-red-500 ring-1 ring-red-500'
                        : 'border-white/15 focus:border-[#C6FF3D]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-medium">
                      <span>⚠️ {errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Phone & Email grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-2">
                      Số điện thoại <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0912 345 678"
                      className={`w-full bg-[#0B0B0D] text-sm text-white px-4 py-3 rounded-xl border focus:outline-none transition-colors ${
                        errors.phone
                          ? 'border-red-500 ring-1 ring-red-500'
                          : 'border-white/15 focus:border-[#C6FF3D]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-400 font-medium">⚠️ {errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-2">
                      Email <span className="text-[#858585] font-normal text-[10px]">(Nhận mã đơn)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="nguyenvanan@gmail.com"
                      className={`w-full bg-[#0B0B0D] text-sm text-white px-4 py-3 rounded-xl border focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-red-500 ring-1 ring-red-500'
                          : 'border-white/15 focus:border-[#C6FF3D]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400 font-medium">⚠️ {errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <label className="block text-xs font-semibold text-white/90 uppercase tracking-wider mb-2">
                    Địa chỉ nhận hàng chi tiết <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    className={`w-full bg-[#0B0B0D] text-sm text-white px-4 py-3 rounded-xl border focus:outline-none transition-colors ${
                      errors.address
                        ? 'border-red-500 ring-1 ring-red-500'
                        : 'border-white/15 focus:border-[#C6FF3D]'
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-400 font-medium">⚠️ {errors.address}</p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                    Ghi chú giao hàng <span className="text-[#858585] text-[10px]">(Không bắt buộc)</span>
                  </label>
                  <textarea
                    rows={2}
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến 15 phút..."
                    className="w-full bg-[#0B0B0D] text-sm text-white px-4 py-2.5 rounded-xl border border-white/15 focus:border-[#C6FF3D] focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Box 2: Payment Methods */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#141417] border border-white/10 space-y-4">
                <h3 className="font-heading text-lg text-white uppercase tracking-wider">
                  2. PHƯƠNG THỨC THANH TOÁN
                </h3>

                <div className="space-y-3">
                  {/* COD */}
                  <label
                    className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'bg-[#181920] border-[#C6FF3D] ring-1 ring-[#C6FF3D]'
                        : 'bg-[#0B0B0D] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="mt-1 text-[#C6FF3D] focus:ring-[#C6FF3D]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#C6FF3D]" />
                        <span className="text-sm font-bold text-white">
                          Thanh toán khi nhận hàng (COD)
                        </span>
                      </div>
                      <p className="text-xs text-[#858585] mt-1">
                        Khách hàng kiểm tra đúng mẫu giày và kích cỡ rồi mới thanh toán tiền mặt cho shipper.
                      </p>
                    </div>
                  </label>

                  {/* Bank Transfer (VietQR Demo) */}
                  <label
                    className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === 'banking'
                        ? 'bg-[#181920] border-[#C6FF3D] ring-1 ring-[#C6FF3D]'
                        : 'bg-[#0B0B0D] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="banking"
                      checked={formData.paymentMethod === 'banking'}
                      onChange={handleInputChange}
                      className="mt-1 text-[#C6FF3D] focus:ring-[#C6FF3D]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-[#C6FF3D]" />
                        <span className="text-sm font-bold text-white">
                          Chuyển khoản ngân hàng (VietQR - Minh họa)
                        </span>
                      </div>
                      <p className="text-xs text-[#858585] mt-1">
                        Quét mã VietQR chuyển khoản nhanh 24/7. Cú pháp chuyển khoản sẽ hiển thị sau khi xác nhận đơn.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 rounded-2xl bg-[#C6FF3D] text-[#0B0B0D] font-heading text-lg font-black uppercase tracking-wider transition-all flex items-center justify-center gap-3 glow-volt ${
                    isSubmitting
                      ? 'opacity-60 cursor-not-allowed'
                      : 'hover:bg-[#d6ff66] transform hover:-translate-y-0.5'
                  }`}
                >
                  <Lock className="w-5 h-5" />
                  <span>
                    {isSubmitting ? 'HỆ THỐNG ĐANG XỬ LÝ & LƯU ĐƠN HÀNG...' : 'XÁC NHẬN ĐẶT HÀNG'}
                  </span>
                </button>
                <p className="text-[11px] text-center text-[#858585] mt-3">
                  Bằng cách nhấn xác nhận, bạn đồng ý với chính sách bán hàng và bảo mật của PITHY.
                </p>
              </div>
            </form>
          </div>

          {/* RIGHT: Order Summary Table */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 p-6 sm:p-8 rounded-3xl bg-[#141417] border border-white/10 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="font-heading text-lg text-white uppercase tracking-wider">
                  TÓM TẮT ĐƠN HÀNG
                </h3>
                <span className="text-xs font-mono text-[#C6FF3D]">
                  {cart.length} mặt hàng
                </span>
              </div>

              {/* Items List Table */}
              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3.5 pb-4 border-b border-white/5"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-14 h-14 object-contain rounded-xl bg-[#25262A] p-1.5 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-[11px] text-[#858585] mt-0.5 flex items-center gap-2">
                        <span className="font-mono text-[#C6FF3D] font-bold">
                          Size: {item.selectedSize}
                        </span>
                        <span>•</span>
                        <span>SL: {item.quantity}</span>
                      </div>
                      <div className="text-[11px] text-[#858585] mt-0.5">
                        Đơn giá: {formatVND(item.product.price)}
                      </div>
                    </div>
                    <div className="text-right shrink-0 font-mono text-xs font-bold text-white">
                      {formatVND(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Calculation breakdown */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex justify-between text-[#858585]">
                  <span>Tổng tiền hàng:</span>
                  <span className="font-mono text-white font-semibold">{formatVND(cartSubtotal)}</span>
                </div>

                <div className="flex justify-between text-[#858585]">
                  <span className="flex items-center gap-1.5">
                    <span>Phí vận chuyển:</span>
                    <span className="text-[10px] bg-[#C6FF3D]/20 text-[#C6FF3D] font-bold px-1.5 rounded">
                      MIỄN PHÍ
                    </span>
                  </span>
                  <span className="font-mono text-[#C6FF3D] font-bold">0 VNĐ</span>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">
                      TỔNG THANH TOÁN:
                    </span>
                    <span className="text-[10px] text-[#858585]">(Đã gồm thuế & freeship)</span>
                  </div>
                  <span className="font-heading text-3xl font-black text-[#C6FF3D]">
                    {formatVND(cartFinalTotal)}
                  </span>
                </div>
              </div>

              {/* Commitments */}
              <div className="p-4 rounded-2xl bg-[#0B0B0D] border border-white/5 space-y-2 text-[11px] text-[#858585]">
                <div className="flex items-center gap-2 text-white">
                  <Truck className="w-3.5 h-3.5 text-[#C6FF3D]" />
                  <span>Giao nhanh từ 2 - 3 ngày làm việc</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C6FF3D]" />
                  <span>Được đồng kiểm hàng trước khi thanh toán</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
