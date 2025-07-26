import AnalyticsChart from '../../components/AnalyticsChart';
import { Analytics } from '../../types/product';

export default function AdminDashboard() {
  // Mock analytics data
  const analytics: Analytics = {
    totalSales: 12500.75,
    totalOrders: 320,
    conversionRate: 2.8,
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Sales</h2>
          <p className="text-2xl text-green-600">${analytics.totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl text-blue-600">{analytics.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Conversion Rate</h2>
          <p className="text-2xl text-purple-600">{analytics.conversionRate}%</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
        <AnalyticsChart />
      </div>
    </main>
  );
}