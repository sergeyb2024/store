'use client';

import { useState, useEffect } from 'react';
import OrderCard from '../../../../components/OrderCard';

// Define the structure of an Order
interface Order {
    orderId: string;
    customerName: string;
    date: string;
    total: number;
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
    items: {
        productId: string;
        name: string;
        quantity: number;
    }[];
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        // In a real app, you would fetch this from an API endpoint
        // For now, we'll use the data from orders.json
        fetch('/api/orders') // Assuming you create this API route
            .then(res => res.json())
            .then(data => setOrders(data));
    }, []);

    const updateOrderStatus = (orderId: string, status: Order['status']) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.orderId === orderId ? { ...order, status } : order
            )
        );
        // Here you would also make an API call to update the status on the server
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
            <div className="space-y-4">
                {orders.map(order => (
                    <OrderCard
                        key={order.orderId}
                        order={order}
                        onUpdateStatus={updateOrderStatus}
                    />
                ))}
            </div>
        </div>
    );
}