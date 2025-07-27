'use client';

import { useState } from 'react';
import { Product } from '../types/product';
import ProductCard from './ProductCard';
import FormInput from './FormInput';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on the search query across multiple fields
  const filteredProducts = products.filter(product => {
    const query = searchQuery.toLowerCase();
    // Check against all relevant text fields
    return (
      product.name.toLowerCase().includes(query) ||
      product.manufacturer.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.subCategory.toLowerCase().includes(query) ||
      (product.modelNumber && product.modelNumber.toLowerCase().includes(query))
    );
  });

  return (
    <div>
      {/* Search Input Field */}
      <div className="mb-8 max-w-xl mx-auto">
        <FormInput
          id="search"
          type="text"
          placeholder="Search for kits, paints, brands, categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Display filtered products or a "not found" message */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No products match your search.</p>
      )}
    </div>
  );
}