'use client';
import Link from 'next/link';
import { useState, useContext, createContext } from 'react';
import { CartItem } from '../types/product';

// Define and export CartContext
export const CartContext = createContext<{
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}>({ cart: [], setCart: () => {} });

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};

export default function Header() {
  const { cart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-blue-600 text-white p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Hobby Shop
        </Link>
        <nav className="space-x-4">
          <Link href="/categories" className="hover:underline">
            Categories
          </Link>
          <Link href="/account" className="hover:underline">
            Account
          </Link>
          <Link href="/cart" className="hover:underline">
            Cart ({cartItemCount})
          </Link>
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>
        </nav>
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 rounded text-black"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        />
      </div>
    </header>
  );
}