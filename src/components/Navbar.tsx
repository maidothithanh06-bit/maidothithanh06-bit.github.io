import React, { useState, useEffect } from 'react';
import { useShop, PageView } from '../context/ShopContext';
import { ShoppingBag, Search, Menu, X, Database, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenSheetsGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSheetsGuide }) => {
  const {
    currentPage,
    setCurrentPage,
    cartItemCount,
    setIsCartOpen,
    sheetsConfig,
    searchQuery,
    setSearchQuery,
    setActiveCategory,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: PageView, category?: 'badminton' | 'tennis' | 'running') => {
    setCurrentPage(page);
    if (category) {
      setActiveCategory(category);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Trang chủ', page: 'home' as PageView },
    { label: 'Sản phẩm', page: 'products' as PageView },
    { label: 'Cầu lông', page: 'badminton' as PageView, category: 'badminton' as const },
    { label: 'Tennis', page: 'tennis' as PageView, category: 'tennis' as const },
    { label: 'Chạy bộ', page: 'running' as PageView, category: 'running' as const },
    { label: 'Lưu đồ đặt hàng', page: 'flowchart' as PageView },
    { label: 'Về chúng tôi', page: 'about' as PageView },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0B0D]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#25262A] border border-[#C6FF3D]/50 flex items-center justify-center glow-volt-sm group-hover:scale-105 transition-transform duration-200">
              <span className="font-heading text-2xl text-[#C6FF3D] italic">P</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-black tracking-wider text-[#F7F7F5] group-hover:text-[#C6FF3D] transition-colors leading-none">
                PITHY
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#858585] uppercase font-semibold mt-1">
                The Art of Movement
              </span>
            </div>
          </button>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((item) => {
              const isActive =
                currentPage === item.page ||
                (item.page === 'badminton' && currentPage === 'badminton') ||
                (item.page === 'tennis' && currentPage === 'tennis') ||
                (item.page === 'running' && currentPage === 'running');

              return (
                <button
                  key={item.label}
                  onClick={() => navigateTo(item.page, item.category)}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-all relative rounded-md ${
                    isActive
                      ? 'text-[#C6FF3D]'
                      : 'text-[#F7F7F5]/80 hover:text-[#F7F7F5] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#C6FF3D]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Google Sheets Status Pill */}
            <button
              onClick={onOpenSheetsGuide}
              title="Cấu hình Google Sheets & Xem hướng dẫn nộp bài"
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors bg-[#25262A]/60 border-white/10 hover:border-[#C6FF3D]/50 text-white/90"
            >
              <Database className="w-3 h-3 text-[#C6FF3D]" />
              <span className="truncate max-w-[110px]">
                {sheetsConfig.webhookUrl ? 'Sheets: Đã nối' : 'Sheets: Demo'}
              </span>
              <span
                className={`w-2 h-2 rounded-full ${
                  sheetsConfig.webhookUrl ? 'bg-[#C6FF3D] animate-pulse' : 'bg-amber-400'
                }`}
              />
            </button>

            {/* Search Trigger */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Tìm kiếm sản phẩm"
                className="p-2 text-white/80 hover:text-[#C6FF3D] hover:bg-white/5 rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-72 sm:w-80 p-2 bg-[#18181B] border border-white/10 rounded-xl shadow-2xl z-50"
                  >
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Tìm kiếm mẫu giày, mã PTH..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setSearchOpen(false);
                            navigateTo('products');
                          }
                        }}
                        autoFocus
                        className="w-full bg-[#0B0B0D] text-sm text-white px-3.5 py-2 pl-9 rounded-lg border border-white/10 focus:border-[#C6FF3D] focus:outline-none"
                      />
                      <Search className="w-4 h-4 text-white/40 absolute left-3 top-2.5" />
                    </div>
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchOpen(false);
                          navigateTo('products');
                        }}
                        className="mt-2 w-full text-center text-xs py-1.5 bg-[#C6FF3D] text-[#0B0B0D] font-bold rounded-md hover:bg-[#b0f516] transition-colors"
                      >
                        Xem kết quả tìm kiếm
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Button with Count Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Mở giỏ hàng"
              className="relative p-2 text-white/90 hover:text-[#C6FF3D] hover:bg-white/5 rounded-full transition-colors group flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartItemCount > 0 && (
                <motion.span
                  key={cartItemCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#C6FF3D] text-[#0B0B0D] text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Mở danh mục điều hướng"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0B0B0D]/98 border-b border-white/10 px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigateTo(item.page, item.category)}
                  className={`text-left text-sm uppercase tracking-wider py-2 font-semibold flex items-center justify-between border-b border-white/5 ${
                    currentPage === item.page ? 'text-[#C6FF3D]' : 'text-white/80'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-white/30" />
                </button>
              ))}

              <div className="pt-3 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSheetsGuide();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#25262A] text-xs font-semibold text-white/90 border border-white/10"
                >
                  <span className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#C6FF3D]" />
                    Kết nối Google Sheets
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded ${
                      sheetsConfig.webhookUrl ? 'bg-[#C6FF3D]/20 text-[#C6FF3D]' : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {sheetsConfig.webhookUrl ? 'Đã nối' : 'Chế độ Demo'}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
