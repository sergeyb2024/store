'use client';
import { useState, useContext } from 'react';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/product';
import { CartContext } from '../components/Header';

interface Database {
  modelKits?: Product[];
  paintsAndSupplies?: Product[];
}

const data: Database = productsData;

export default function Home() {
  const { cart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('default');

  const products: Product[] = [
    ...(data.modelKits || []),
    ...(data.paintsAndSupplies || []),
  ].map(product => ({
    ...product,
    price: Number((Math.random() * 50 + 10).toFixed(2)),
  }));

  const filteredProducts = products
    .filter(product => 
      (categoryFilter === 'All' || product.category === categoryFilter) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'price-low') return (a.price || 0) - (b.price || 0);
      if (sortOption === 'price-high') return (b.price || 0) - (a.price || 0);
      return 0;
    });

  return (
    <main className="container mx-auto p-4">
      <div className="bg-blue-200 p-6 mb-6 rounded text-center">
        <h2 className="text-2xl font-bold">Welcome to Hobby Shop!</h2>
        <p>Explore our wide range of model kits and supplies.</p>
      </div>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 rounded text-black"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        />
        <select
          className="p-2 rounded"
          value={categoryFilter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Kit">Model Kits</option>
          <option value="Paint">Paints</option>
          <option value="Supply">Supplies</option>
        </select>
        <select
          className="p-2 rounded"
          value={sortOption}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortOption(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
      {products.length === 0 ? (
        <p className="text-center text-red-500">No products available. Please check the product database.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}