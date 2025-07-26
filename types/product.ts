export interface Product {
  productId: string;
  manufacturer: string;
  modelNumber: string;
  name: string;
  category: string;
  subCategory: string;
  scale: string | null;
  description: string;
  imageURL: string;
  quantityInStock: number;
  sellers: Record<string, any>;
  price?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  orderId: string;
  date: string;
  status: string;
  total: number;
  customerId: string;
  items: CartItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  addresses?: { id: string; address: string }[];
}

export interface Analytics {
  totalSales: number;
  totalOrders: number;
  conversionRate: number;
}