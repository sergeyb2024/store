'use client';
import { useState, useEffect } from 'react';
import OrderCard from '../../../../components/admin/OrderCard';
import { Order } from '../../../../types/product';

async function fetchOrders(): Promise<Order[]> {
  // Mock API call (replace with real API or file read)
  return [
    {
      orderId: 'ORD001',
      date: '2025-07-20',
      status: 'Pending',
      total: 89.99,
      customerId: 'USR001',
      items: [{ productId: 'TAMIYA_24372', name: 'Porsche 962C', quantity: 1, price: 89.99 }],
    },
    {
      orderId: 'ORD002',
      date: '2025-07-21',
      status: 'Shipped',
      total: 45.50,
      customerId: 'USR002',
      items: [{ productId: 'VALLEJO_70.950', name: 'Model Color - Black', quantity: 2, price: 22.75 }],
    },
  ];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  const updateOrderStatus = async (orderId: string, status: string) => {
    // Mock update (replace with server action)
    setOrders(orders.map(o => o.orderId === orderId ? { ...o, status } : o));
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <OrderCard key={order.orderId} order={order} updateStatus={updateOrderStatus} />
        ))}
      </div>
    </main>
  );
}