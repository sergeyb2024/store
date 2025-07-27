'use client';

import { useContext } from 'react';
import { CartItem } from '../types/product';
import { CartContext } from './Header';
import Link from 'next/link';

export default function CartSummary() {
  const { cart, setCart } = useContext(CartContext);

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev: CartItem[]) =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCart((prev: CartItem[]) => prev.filter(item => item.productId !== productId));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Cart Summary</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.productId} className="flex justify-between items-center mb-2">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">${item.price?.toFixed(2)} x {item.quantity}</p>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateQuantity(item.productId, parseInt(e.target.value, 10))
                  }
                  className="w-16 p-1 rounded border text-black"
                />
                <button
                  className="ml-2 text-red-600 hover:text-red-800"
                  onClick={() => removeItem(item.productId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="border-t mt-4 pt-4">
            <p className="font-bold text-lg">Subtotal: ${subtotal.toFixed(2)}</p>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Apply Coupon Code"
                    className="p-2 rounded border w-full mb-2 text-black"
                />
                <button className="w-full p-2 bg-blue-600 rounded text-white hover:bg-blue-700">Apply Coupon</button>
            </div>
            <Link href="/checkout" className="block w-full p-2 bg-green-600 rounded text-white mt-2 text-center hover:bg-green-700">
                Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}