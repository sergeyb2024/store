import { Product } from '../../../../types/product';
import ProductForm from '../../../../components/admin/ProductForm';
import { updateProduct, deleteProduct } from '../../../../actions'; // Import server actions
import Link from 'next/link';

async function getProduct(productId: string): Promise<Product | null> {
    const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
    if (!res.ok) return null;
    const products: Product[] = await res.json();
    return products.find(p => p.productId === productId) || null;
}

interface ProductEditPageProps {
    params: { productId: string; };
}

export default async function ProductEditPage({ params }: ProductEditPageProps) {
    const product = await getProduct(params.productId);

    if (!product) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl text-red-600">Product not found</h1>
                <Link href="/admin/products" className="text-blue-600 hover:underline mt-4 inline-block">&larr; Back to all products</Link>
            </div>
        );
    }
    
    // Bind the productId to the update action
    const updateProductAction = updateProduct.bind(null, product.productId);

    return (
        <main className="container mx-auto p-4">
            <Link href="/admin/products" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Back to all products</Link>
            
            <ProductForm formAction={updateProductAction} productData={product} isEditing={true} />

            <div className="mt-8 border-t pt-4 border-red-300">
                <h2 className="text-xl font-semibold text-red-700">Danger Zone</h2>
                <form action={deleteProduct.bind(null, product.productId)}>
                    <button type="submit" className="mt-2 bg-red-600 text-white p-2 rounded hover:bg-red-700">Delete This Product</button>
                </form>
            </div>
        </main>
    );
}