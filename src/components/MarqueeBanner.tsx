import React from 'react';

export const MarqueeBanner: React.FC = () => {
  const items = [
    'PITHY',
    'MOVE WITH PURPOSE',
    'PERFORMANCE',
    'PRECISION',
    'FREEDOM',
    'THE ART OF MOVEMENT',
    'AERODYNAMICS',
    'UNSTOPPABLE',
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#C6FF3D] text-[#0B0B0D] py-3 select-none border-y border-[#0B0B0D]">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {[...items, ...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center mx-5">
            <span className="font-heading text-xl sm:text-2xl font-black uppercase tracking-wider">
              {text}
            </span>
            <span className="inline-block w-2.5 h-2.5 mx-5 bg-[#0B0B0D] rotate-45" />
          </div>
        ))}
      </div>
    </div>
  );
};
