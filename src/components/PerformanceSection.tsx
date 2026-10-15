import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Feather, Zap, Target, Layers, ShieldCheck, Cpu } from 'lucide-react';

export const PerformanceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      id: 'lightweight',
      code: 'LIGHTWEIGHT',
      title: 'Trọng Lượng Nhẹ',
      description: 'Cấu trúc dệt siêu mỏng kết hợp đĩa Carbon nguyên khối giúp tối giản từng gam trọng lượng thừa, cho bạn cảm giác thanh thoát như đang bay trên sân đấu.',
      icon: Feather,
      stat: '198g',
      statLabel: 'Trọng lượng kỷ lục',
    },
    {
      id: 'responsive',
      code: 'RESPONSIVE',
      title: 'Phản Hồi Linh Hoạt',
      description: 'Hạt đệm bọt PEBA Nitro hoàn trả đến 88% năng lượng nén mỗi bước chạm, chuyển hóa phản lực tiếp đất thành lực đẩy bứt tốc về phía trước.',
      icon: Zap,
      stat: '88%',
      statLabel: 'Hồi phục động năng',
    },
    {
      id: 'precision-fit',
      code: 'PRECISION FIT',
      title: 'Ôm Chân Chính Xác',
      description: 'Phom giày Ergonomic nghiên cứu theo dữ liệu nhân trắc học bàn chân người châu Á, khóa chặt gót và mu bàn chân ngăn phồng rộp và trơn trượt.',
      icon: Target,
      stat: '360°',
      statLabel: 'Khóa gót bảo vệ',
    },
  ];

  return (
    <section className="py-24 bg-[#0B0B0D] relative overflow-hidden border-t border-white/5">
      {/* Background radial accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#C6FF3D]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Macro Shoe Image with Tech Overlays */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#16171B] p-4 sm:p-8 aspect-square flex items-center justify-center">
              {/* Geometric Grid overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#25262A_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85"
                alt="PITHY Technology Engineering"
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-700"
              />

              {/* Floating tech badge */}
              <div className="absolute top-6 left-6 glass-panel px-3.5 py-2 rounded-xl flex items-center gap-2 border border-white/10 z-20">
                <Cpu className="w-4 h-4 text-[#C6FF3D]" />
                <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
                  PITHY LAB ENGINEERING
                </span>
              </div>

              {/* Live Stat callout */}
              <div className="absolute bottom-6 right-6 glass-panel px-4 py-3 rounded-2xl flex items-center gap-3 border border-[#C6FF3D]/30 z-20">
                <div className="font-heading text-2xl text-[#C6FF3D]">
                  {pillars[activeTab].stat}
                </div>
                <div className="text-[11px] text-[#858585] uppercase tracking-wider">
                  {pillars[activeTab].statLabel}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & 3 Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#C6FF3D] font-mono font-bold">
              CÔNG NGHỆ CHUYỂN ĐỘNG
            </span>

            <h2 className="text-4xl sm:text-6xl font-black font-heading text-[#F7F7F5] mt-2 uppercase tracking-wide leading-none">
              DESIGNED TO <br />
              <span className="text-[#C6FF3D]">MOVE YOU.</span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#858585] leading-relaxed font-body">
              Từng đường nét được thiết kế để mang lại cảm giác thoải mái, khả năng kiểm soát
              và hiệu suất vận động tốt hơn. Không chỉ là thời trang, đó là khoa học cơ sinh học (Biomechanics).
            </p>

            {/* 3 Pillars List */}
            <div className="mt-8 space-y-4">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                const isSelected = activeTab === idx;

                return (
                  <motion.div
                    key={pillar.id}
                    onClick={() => setActiveTab(idx)}
                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-[#18181D] border-[#C6FF3D] shadow-lg'
                        : 'bg-[#121215] border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#C6FF3D] text-[#0B0B0D]'
                            : 'bg-[#25262A] text-white/70'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-heading text-lg text-[#F7F7F5] uppercase tracking-wide">
                            {pillar.code} — {pillar.title}
                          </h4>
                          <span className="font-mono text-xs text-[#C6FF3D] font-bold">
                            0{idx + 1}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#858585] mt-1 font-body leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
