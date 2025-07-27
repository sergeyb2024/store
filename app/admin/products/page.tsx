import Link from 'next/link';
import { Product } from '../../../types/product';
import ProductForm from '../../../components/admin/ProductForm';
import { addProduct } from '../../../actions'; // Import the server action

async function getProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
  if (!res.ok) {
    // Return an empty array or throw an error to avoid crashing the page
    console.error('Failed to fetch products');
    return [];
  }
  return res.json();
}

export default async function AdminProductsListPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      <div className="mb-8">
        {/*
          FIX: The 'addProduct' server action is now passed directly
          to the 'formAction' prop, which is what the component expects.
        */}
        <ProductForm formAction={addProduct} isEditing={false} />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Existing Products</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-2 border-b">Name</th>
              <th className="p-2 border-b">Manufacturer</th>
              <th className="p-2 border-b">Stock</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.productId}>
                <td className="p-2 border-b">{product.name}</td>
                <td className="p-2 border-b">{product.manufacturer}</td>
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