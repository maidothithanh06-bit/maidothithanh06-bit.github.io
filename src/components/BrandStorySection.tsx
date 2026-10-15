import React from 'react';
import { motion } from 'motion/react';
import { Award, Compass, Lightbulb } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  const values = [
    {
      num: '01',
      title: 'PERFORMANCE',
      sub: 'Hiệu Suất Vượt Trội',
      description:
        'Chúng tôi tin rằng giày thể thao trước hết phải là một công cụ bảo vệ cơ thể và nâng cao thành tích. Mọi góc cạnh, độ dốc gót (heel-to-toe drop) và vân đế đều được tinh chỉnh dựa trên phản hồi của các vận động viên hàng đầu.',
      icon: Award,
    },
    {
      num: '02',
      title: 'STYLE',
      sub: 'Phong Cách Khác Biệt',
      description:
        'PITHY xóa nhòa ranh giới giữa giày kỹ thuật thể thao và thời trang cao cấp. Với bảng màu tối giản đen than, trắng ngà cùng điểm nhấn xanh Volt, đôi giày mang lại vẻ tự tin tuyệt đối từ sân tập ra phố.',
      icon: Compass,
    },
    {
      num: '03',
      title: 'INNOVATION',
      sub: 'Không Ngừng Đổi Mới',
      description:
        'Từ màng dệt AtomKnit liền mạch đến tấm trợ lực sợi Carbon 3K, PITHY không ngừng ứng dụng các vật liệu hàng không vũ trụ nhằm tối đa hóa độ đàn hồi và giảm tải áp lực xương khớp.',
      icon: Lightbulb,
    },
  ];

  return (
    <section className="py-24 bg-[#0B0B0D] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C6FF3D] font-mono font-bold">
            CÂU CHUYỆN THƯƠNG HIỆU
          </span>
          <h2 className="text-4xl sm:text-6xl font-black font-heading text-[#F7F7F5] uppercase mt-2">
            EVERY STEP TELLS A STORY.
          </h2>
          <p className="mt-4 text-base text-[#858585] font-body leading-relaxed">
            "PITHY không chỉ tạo nên những đôi giày. Chúng tôi đồng hành cùng từng chuyển động,
            từng giới hạn được phá vỡ và từng bước tiến về phía trước."
          </p>
        </div>

        {/* 3 Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, index) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative rounded-2xl bg-[#141417] border border-white/10 p-8 flex flex-col justify-between hover:border-[#C6FF3D]/50 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading text-4xl text-[#C6FF3D] group-hover:scale-110 transition-transform">
                      {v.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#25262A] flex items-center justify-center text-white/80 group-hover:text-[#C6FF3D] group-hover:bg-[#0B0B0D] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-heading text-2xl text-[#F7F7F5] uppercase tracking-wide">
                    {v.title}
                  </h3>
                  <div className="text-xs font-mono text-[#C6FF3D] font-semibold mt-0.5 mb-4">
                    {v.sub}
                  </div>

                  <p className="text-sm text-[#858585] font-body leading-relaxed">
                    {v.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>PITHY PHILOSOPHY</span>
                  <span>THE ART OF MOVEMENT</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
