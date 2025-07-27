'use client';

import { useContext } from 'react';
import { CartContext } from '../../components/Header';
import CartSummary from '../../components/CartSummary';

export default function CheckoutPage() {
  const { cart } = useContext(CartContext);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full p-2 rounded border" />
            <input type="text" placeholder="Address" className="w-full p-2 rounded border" />
            <input type="text" placeholder="City" className="w-full p-2 rounded border" />
            <div className="flex space-x-4">
              <input type="text" placeholder="State" className="w-full p-2 rounded border" />
              <input type="text" placeholder="ZIP Code" className="w-full p-2 rounded border" />
            </div>
            <input type="email" placeholder="Email" className="w-full p-2 rounded border" />
          </form>
          
          <h2 className="text-xl font-semibold my-4">Payment Information</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Card Number" className="w-full p-2 rounded border" />
            <div className="flex space-x-4">
              <input type="text" placeholder="MM/YY" className="w-1/2 p-2 rounded border" />
              <input type="text" placeholder="CVC" className="w-1/2 p-2 rounded border" />
            </div>
          </form>
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
      <div className="mt-8 text-center">
        <button className="bg-green-600 text-white font-bold py-3 px-6 rounded hover:bg-green-700">
          Place Order
        </button>
      </div>
    </main>
  );
}