import Link from 'next/link';
import { Product } from '../../../types/product';
import { deleteProduct } from '../../../actions';
import ProductForm from '../../../components/admin/ProductForm';

// Function to fetch all products from your API
async function getProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default async function AdminProductsListPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      {/* Add new product form */}
      <div className="mb-8">
        <ProductForm onSubmit={() => {
            // This would typically involve a server action to add/update a product
        }} />
      </div>
      
      {/* Table of existing products */}
      <div className="bg-white p-6 rounded-lg shadow">
          <table className="w-full text-left">
              <thead>
                  <tr>
                      <th className="p-2 border-b">Name</th>
                      <th className="p-2 border-b">Manufacturer</th>
                      <th className="p-2 border-b">Category</th>
                      <th className="p-2 border-b">Stock</th>
                      <th className="p-2 border-b">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {products.map(product => (
                      <tr key={product.productId}>
                          <td className="p-2 border-b">{product.name}</td>
                          <td className="p-2 border-b">{product.manufacturer}</td>
                          <td className="p-2 border-b">{product.category}</td>
                          <td className="p-2 border-b">{product.quantityInStock}</td>
                          <td className="p-2 border-b">
                              <Link href={`/admin/products/${product.productId}`} className="text-blue-600 hover:underline">
                                  Edit
                              </Link>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
}