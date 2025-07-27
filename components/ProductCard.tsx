'use client';

import { Product } from '../types/product';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from './Header';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { setCart } = useContext(CartContext);
  const [arrivalDate, setArrivalDate] = useState('');

  // Calculate the estimated arrival date on the client-side
  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14); // Add 14 days for 2-week estimate
    setArrivalDate(date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }));
  }, []);

  const addToCart = () => {
    setCart(prev => {
      const existingItem = prev.find(item => item.productId === product.productId);
      if (existingItem) {
        return prev.map(item =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const isOutOfStock = product.quantityInStock === 0;

  return (
    <div className="border rounded-lg p-4 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow">
      <div>
        <div className="relative w-full h-48 mb-4">
            <Image
                src={product.imageURL || '/placeholder.png'}
                alt={product.name}
                fill
                style={{ objectFit: 'contain' }}
                className="rounded"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
        <h2 className="text-lg font-bold truncate" title={product.name}>{product.name}</h2>
        <p className="text-gray-600">{product.manufacturer}</p>
        {product.scale && <p className="text-sm text-gray-500">Scale: {product.scale}</p>}
        <p className="text-lg font-semibold mt-2">${product.price?.toFixed(2) || 'Price not available'}</p>
        
        {/* New conditional message for out-of-stock items */}
        {isOutOfStock && (
            <div className="mt-2 text-sm text-orange-600">
                <p className="font-semibold">Out of Stock</p>
                <p>Available to order. Expected arrival by ~{arrivalDate}.</p>
            </div>
        )}
      </div>

      {/* The button is no longer disabled and shows different text */}
      <button
        onClick={addToCart}
        className={`mt-4 w-full self-center py-2 px-4 rounded text-white ${
            isOutOfStock 
                ? 'bg-orange-500 hover:bg-orange-600' 
                : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isOutOfStock ? 'Order Now' : 'Add to Cart'}
      </button>
    </div>
  );
}