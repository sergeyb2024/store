'use client';
import { Order } from '../../types/product';

interface OrderCardProps {
  order: Order;
  updateStatus: (orderId: string, status: string) => void;
}

export default function OrderCard({ order, updateStatus }: OrderCardProps) {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateStatus(order.orderId, e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Order #{order.orderId}</h2>
      <p className="text-sm text-gray-600">Date: {order.date}</p>
      <p className="text-sm">Customer ID: {order.customerId}</p>
      <p className="text-sm">Total: ${order.total.toFixed(2)}</p>
      <p className="text-sm">Items: {order.items.length}</p>
      <div className="mt-2">
        <label className="text-sm font-semibold">Status:</label>
        <select
          className="ml-2 p-1 rounded"
          value={order.status}
          onChange={handleStatusChange}
        >
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
}
