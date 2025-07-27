'use client';

import Link from 'next/link';
// Add `useContext` to the import list here
import { createContext, useState, ReactNode, useContext } from 'react'; 
import { CartItem } from '../types/product';

// Create a context for the shopping cart
export const CartContext = createContext({
  cart: [] as CartItem[],
  setCart: (cart: CartItem[] | ((prev: CartItem[]) => CartItem[])) => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default function Header() {
  const { cart } = useContext(CartContext);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Hobby Shop
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/admin">Admin</Link></li>
            <li>
              <Link href="/checkout" className="relative">
                Cart 
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-4 bg-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}