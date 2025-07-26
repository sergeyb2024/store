'use client';
import { useContext } from 'react';
import { CartItem } from '../types/product';
import { CartContext } from './Header';

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
            <div key={item.productId} className="flex justify-between mb-2">
              <div>
                <p>{item.name}</p>
                <p className="text-sm text-gray-600">${item.price?.toFixed(2)} x {item.quantity}</p>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateQuantity(item.productId, parseInt(e.target.value))
                  }
                  className="w-16 p-1 rounded text-black"
                />
                <button
                  className="ml-2 text-red-600"
                  onClick={() => removeItem(item.productId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <p className="font-bold mt-4">Subtotal: ${subtotal.toFixed(2)}</p>
          <input
            type="text"
            placeholder="Apply Coupon Code"
            className="p-2 rounded w-full mb-2 text-black"
          />
          <button className="p-2 bg-blue-600 rounded text-white">Apply Coupon</button>
          <Link href="/checkout">
            <a className="block p-2 bg-green-600 rounded text-white mt-2 text-center">Proceed to Checkout</a>
          </Link>
        </>
      )}
    </div>
  );
}