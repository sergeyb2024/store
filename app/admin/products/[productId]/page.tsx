import { Product } from '../../../../types/product';
import ProductForm from '../../../../components/admin/ProductForm';
import { updateProduct, deleteProduct } from '../../../actions'; // Corrected import path
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';

async function getProduct(productId: string): Promise<Product | null> {
    const jsonDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fs.readFile(path.join(jsonDirectory, 'products.json'), 'utf8');
    const products: Product[] = JSON.parse(fileContents);
    const product = products.find(p => p.id === parseInt(productId, 10));
    return product || null;
}


export default async function EditProductPage({ params }: { params: { productId: string } }) {
  const product = await getProduct(params.productId);

  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/admin/products" className="text-blue-500 hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
      <ProductForm product={product} onSave={updateProduct} onDelete={deleteProduct} />
    </div>
  );
}