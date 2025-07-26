'use client';
import Link from 'next/link';
import { useContext } from 'react';
import { Product, CartItem } from '../types/product';
import { CartContext } from './Header';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { setCart } = useContext(CartContext);

  const addToCart = () => {
    if (product.quantityInStock > 0) {
      setCart((prev: CartItem[]) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <img src={product.imageURL} alt={product.name} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.manufacturer} - {product.scale}</p>
      <p className="text-sm">{product.description}</p>
      <p className="text-green-600 font-bold">${product.price?.toFixed(2)}</p>
      <p className={product.quantityInStock > 0 ? 'text-green-500' : 'text-red-500'}>
        {product.quantityInStock > 0 ? `In Stock: ${product.quantityInStock}` : 'Out of Stock'}
      </p>
      <button
        className={`mt-2 p-2 rounded ${product.quantityInStock > 0 ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white cursor-not-allowed'}`}
        onClick={addToCart}
        disabled={product.quantityInStock === 0}
      >
        Add to Cart
      </button>
      <Link href={`/product/${product.productId}`} className="ml-2 text-blue-600">
        View Details
      </Link>
    </div>
  );
}