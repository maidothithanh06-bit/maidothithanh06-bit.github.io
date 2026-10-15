import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, OrderRecord, GoogleSheetsConfig, CategoryType } from '../types';
import { PRODUCTS } from '../data/products';
import {
  getStoredSheetsConfig,
  saveSheetsConfig,
  getStoredOrders,
  saveOrderToStorage,
  submitOrderToGoogleSheets,
} from '../services/googleSheetsService';

export type PageView =
  | 'home'
  | 'products'
  | 'badminton'
  | 'tennis'
  | 'running'
  | 'product-detail'
  | 'checkout'
  | 'order-success'
  | 'flowchart'
  | 'about'
  | 'guide-sheets';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ShopContextType {
  // Navigation
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, selectedSize: number, quantity?: number) => boolean;
  updateCartQuantity: (itemId: string, newQty: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartItemCount: number;
  cartSubtotal: number;
  shippingFee: number;
  cartFinalTotal: number;

  // Quick Buy shortcut
  buyNow: (product: Product, selectedSize: number, quantity?: number) => void;

  // Orders
  orders: OrderRecord[];
  latestOrder: OrderRecord | null;
  submitOrder: (order: OrderRecord) => Promise<{ success: boolean; message: string; isSimulated?: boolean }>;

  // Sheets Config
  sheetsConfig: GoogleSheetsConfig;
  updateSheetsConfig: (newConfig: Partial<GoogleSheetsConfig>) => void;

  // Search & Filters for Products page
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: CategoryType;
  setActiveCategory: (cat: CategoryType) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'newest') => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  resetFilters: () => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'error' | 'info', title: string, description?: string) => void;
  removeToast: (id: string) => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'pithy_cart_items';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart State with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Sheets Config & Orders
  const [sheetsConfig, setSheetsConfig] = useState<GoogleSheetsConfig>(getStoredSheetsConfig);
  const [orders, setOrders] = useState<OrderRecord[]>(getStoredOrders);
  const [latestOrder, setLatestOrder] = useState<OrderRecord | null>(() => {
    const stored = getStoredOrders();
    return stored.length > 0 ? stored[0] : null;
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000]);

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, description?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, selectedSize: number, quantity: number = 1): boolean => {
    if (!selectedSize) {
      addToast('error', 'Chưa chọn kích cỡ!', 'Vui lòng chọn size giày trước khi thêm vào giỏ hàng.');
      return false;
    }

    const itemInstanceId = `${product.id}-size-${selectedSize}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === itemInstanceId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: itemInstanceId,
            product,
            selectedSize,
            quantity,
          },
        ];
      }
    });

    addToast(
      'success',
      'Đã thêm vào giỏ hàng!',
      `${product.name} (Size ${selectedSize}) x ${quantity}`
    );
    return true;
  };

  const buyNow = (product: Product, selectedSize: number, quantity: number = 1) => {
    const success = addToCart(product, selectedSize, quantity);
    if (success) {
      setIsCartOpen(false);
      setCurrentPage('checkout');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateCartQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    addToast('info', 'Đã xóa sản phẩm', 'Sản phẩm đã được gỡ khỏi giỏ hàng.');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  // Free shipping policy for demo, clearly displayed in UI as requested
  const shippingFee = cartSubtotal > 0 ? 0 : 0;
  const cartFinalTotal = cartSubtotal + shippingFee;

  // Order submission
  const submitOrder = async (order: OrderRecord) => {
    const result = await submitOrderToGoogleSheets(order, sheetsConfig);
    setLatestOrder(order);
    setOrders((prev) => [order, ...prev.filter((o) => o.orderCode !== order.orderCode)]);

    if (result.success) {
      clearCart();
      setCurrentPage('order-success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return result;
  };

  const updateSheetsConfig = (newConfig: Partial<GoogleSheetsConfig>) => {
    setSheetsConfig((prev) => {
      const merged = { ...prev, ...newConfig };
      saveSheetsConfig(merged);
      return merged;
    });
    addToast('success', 'Đã cập nhật cấu hình', 'Thiết lập Google Sheets đã được lưu vào trình duyệt.');
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setSortBy('featured');
    setPriceRange([0, 3000000]);
  };

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProduct,
        openProductDetail,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartItemCount,
        cartSubtotal,
        shippingFee,
        cartFinalTotal,
        buyNow,
        orders,
        latestOrder,
        submitOrder,
        sheetsConfig,
        updateSheetsConfig,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        sortBy,
        setSortBy,
        priceRange,
        setPriceRange,
        resetFilters,
        toasts,
        addToast,
        removeToast,
        quickViewProduct,
        setQuickViewProduct,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
