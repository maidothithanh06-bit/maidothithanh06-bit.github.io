export type CategoryType = 'all' | 'badminton' | 'tennis' | 'running';

export interface Product {
  id: string;
  code: string;
  name: string;
  category: 'badminton' | 'tennis' | 'running';
  categoryNameVi: string;
  price: number;
  originalPrice?: number;
  description: string;
  tagline: string;
  features: string[];
  colors: { name: string; hex: string }[];
  sizes: number[];
  stock: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  images: string[];
  specs: {
    weight: string;
    drop: string;
    upper: string;
    sole: string;
    cushioning: string;
  };
}

export interface CartItem {
  id: string; // unique item instance id: productId-size
  product: Product;
  selectedSize: number;
  quantity: number;
}

export interface OrderFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  paymentMethod: 'cod' | 'banking';
}

export interface OrderItemRecord {
  productId: string;
  productCode: string;
  productName: string;
  category: string;
  size: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderRecord {
  orderCode: string;
  createdAt: string;
  customer: OrderFormData;
  items: OrderItemRecord[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  finalTotal: number;
  paymentMethod: 'cod' | 'banking';
  status: 'Chờ xác nhận' | 'Đang xử lý' | 'Đã xác nhận';
  syncedToGoogleSheets: boolean;
  sheetsResponse?: string;
}

export interface GoogleSheetsConfig {
  webhookUrl: string;
  autoSync: boolean;
  useFallbackSimulation: boolean;
  lastSyncStatus: 'idle' | 'success' | 'failed' | 'simulated';
  lastSyncMessage?: string;
}
