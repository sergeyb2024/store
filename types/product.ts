export interface Product {
    productId: string;
    name: string;
    manufacturer: string;
    modelNumber: string;
    category: string;
    subCategory: string;
    scale?: string | null; // Can be string or null
    description: string;
    imageURL: string;
    quantityInStock: number;
    price?: number; // Added price as optional for cart functionality
    sellers: {}; // Added sellers property
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