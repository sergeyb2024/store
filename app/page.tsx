import productsData from '../data/products.json';
import { Product } from '../types/product';
import ProductList from '../components/ProductList'; // This is the correct import

interface Database {
  modelKits?: Product[];
  paintsAndSupplies?: Product[];
}

// This function runs on the server to fetch all products
async function getProducts(): Promise<Product[]> {
  const data: Database = productsData;
  const products: Product[] = [
    ...(data.modelKits || []),
    ...(data.paintsAndSupplies || []),
  ].map(product => ({
    ...product,
    // Assign a random price for cart functionality
    price: product.price || Number((Math.random() * 50 + 10).toFixed(2)),
  }));
  return products;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="container mx-auto p-4">
      <div className="bg-blue-200 p-6 mb-6 rounded text-center">
        <h2 className="text-2xl font-bold">Welcome to the Hobby Shop!</h2>
        <p>Explore our wide range of model kits, paints, and supplies.</p>
      </div>

      {/* The home page should use the ProductList to show and search products */}
      <ProductList products={products} />
    </main>
  );
}