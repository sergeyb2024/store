'use client';
import { useState, useEffect } from 'react';
import ProductForm from '../../../../components/admin/ProductForm';
import { Product } from '../../../../types/product';
import { revalidatePath } from 'next/cache';

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('/api/products', { cache: 'no-store' });
  return res.json();
}

async function deleteProduct(productId: string) {
  'use server';
  const fs = require('fs').promises;
  const path = require('path');
  const filePath = path.join(process.cwd(), 'data/products.json');
  const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
  data.modelKits = data.modelKits?.filter((p: Product) => p.productId !== productId) || [];
  data.paintsAndSupplies = data.paintsAndSupplies?.filter((p: Product) => p.productId !== productId) || [];
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  revalidatePath('/admin/products');
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
      <button
        className="bg-blue-600 text-white p-2 rounded mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : 'Add Product'}
      </button>
      {showForm && <ProductForm onSubmit={() => setShowForm(false)} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.productId} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.manufacturer} - {product.scale}</p>
            <p className="text-sm">{product.category} / {product.subCategory}</p>
            <p className="text-green-600">${product.price?.toFixed(2)}</p>
            <p>In Stock: {product.quantityInStock}</p>
            <form action={deleteProduct.bind(null, product.productId)}>
              <button className="mt-2 bg-red-600 text-white p-2 rounded">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}