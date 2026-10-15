import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Search, RotateCcw, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { CategoryType } from '../types';
import { formatVND } from '../utils/formatters';

interface ProductsListViewProps {
  initialCategory?: CategoryType;
}

export const ProductsListView: React.FC<ProductsListViewProps> = ({ initialCategory }) => {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    resetFilters,
  } = useShop();

  // If initialCategory is passed (e.g. from nav link), respect it
  const currentCategory = initialCategory || activeCategory;

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (currentCategory !== 'all' && product.category !== currentCategory) {
        return false;
      }
      // Search query filter (name, code, tagline)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCode = product.code.toLowerCase().includes(q);
        const matchesCat = product.categoryNameVi.toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesCat) return false;
      }
      // Price range
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [currentCategory, searchQuery, sortBy, priceRange]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === currentCategory) || CATEGORIES[0];

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F7F7F5] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C6FF3D] font-mono font-bold">
            BỘ SƯU TẬP PITHY 2026
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-heading text-white uppercase mt-2">
            {activeCategoryObj.name}
          </h1>
          <p className="mt-2 text-sm text-[#858585] max-w-xl font-body">
            {activeCategoryObj.description ||
              'Toàn bộ các dòng giày thể thao công nghệ cao phục vụ thi đấu và luyện tập chuyên nghiệp.'}
          </p>
        </div>

        {/* Filters and Controls Bar */}
        <div className="p-5 rounded-2xl bg-[#141417] border border-white/10 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = currentCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as CategoryType)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#C6FF3D] text-[#0B0B0D] shadow-md'
                      : 'bg-[#25262A] text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Search, Sort & Clear */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[200px] flex-1 sm:flex-initial">
              <input
                type="text"
                placeholder="Tìm mẫu giày, mã..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0B0B0D] text-xs text-white px-3.5 py-2 pl-9 rounded-xl border border-white/10 focus:border-[#C6FF3D] focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-2.5" />
            </div>

            {/* Sort Select */}
            <div className="relative flex items-center">
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-[#0B0B0D] text-xs text-white/90 px-3.5 py-2 rounded-xl border border-white/10 focus:border-[#C6FF3D] focus:outline-none appearance-none pr-8 cursor-pointer font-medium"
              >
                <option value="featured">Sắp xếp: Nổi bật nhất</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="newest">Mới ra mắt (New)</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-white/40 absolute right-3 pointer-events-none" />
            </div>

            {/* Price Filter dropdown/selector */}
            <select
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="bg-[#0B0B0D] text-xs text-white/90 px-3 py-2 rounded-xl border border-white/10 focus:border-[#C6FF3D] focus:outline-none cursor-pointer"
            >
              <option value="3000000">Tất cả mức giá</option>
              <option value="1500000">Dưới 1.500.000đ</option>
              <option value="2000000">Dưới 2.000.000đ</option>
            </select>

            {/* Reset Button */}
            {(searchQuery || currentCategory !== 'all' || sortBy !== 'featured' || priceRange[1] < 3000000) && (
              <button
                onClick={resetFilters}
                className="p-2 text-[#858585] hover:text-[#C6FF3D] transition-colors rounded-xl bg-[#25262A] hover:bg-white/10 flex items-center gap-1 text-xs"
                title="Xóa bộ lọc"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Đặt lại</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#858585] mb-6">
          <span>
            Hiển thị <strong className="text-[#C6FF3D] font-mono">{filteredProducts.length}</strong> sản phẩm phù hợp
          </span>
          {searchQuery && (
            <span>
              Từ khóa: "<span className="text-white">{searchQuery}</span>"
            </span>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-[#141417] border border-white/5 p-8">
            <p className="text-base text-white/80 font-bold mb-2">Không tìm thấy sản phẩm phù hợp</p>
            <p className="text-xs text-[#858585] mb-6">Hãy thử thay đổi từ khóa hoặc đặt lại bộ lọc tìm kiếm.</p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-xl bg-[#C6FF3D] text-[#0B0B0D] font-bold text-xs uppercase tracking-wider"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};
