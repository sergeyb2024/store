import AnalyticsChart from '../../../components/AnalyticsChart';
import { Product } from '../../../types/product';
import { Order } from '../../../types/product';

async function getProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
  if (!res.ok) {
    return [];
  }
  return res.json();
}

async function getOrders(): Promise<Order[]> {
    const res = await fetch('http://localhost:3000/api/orders', { cache: 'no-store' });
    if (!res.ok) {
        return [];
    }
    return res.json();
}

export default async function DashboardPage() {
    const products = await getProducts();
    const orders = await getOrders();

    const totalStock = products.reduce((sum, product) => sum + product.quantityInStock, 0);
    const totalOrders = orders.length;
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-3xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Stock</h2>
          <p className="text-3xl font-bold">{totalStock}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Total Sales</h2>
            <p className="text-3xl font-bold">${totalSales.toFixed(2)}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Sales Analytics (Last 12 Months)</h2>
        <AnalyticsChart />
      </div>
    </div>
  );
}