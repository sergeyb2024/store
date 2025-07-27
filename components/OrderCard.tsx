'use client';

interface Order {
    orderId: string;
    customerName: string;
    date: string;
    total: number;
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
    items: {
        productId: string;
        name:string;
        quantity: number;
    }[];
}

interface OrderCardProps {
    order: Order;
    onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

export default function OrderCard({ order, onUpdateStatus }: OrderCardProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold">Order #{order.orderId}</h3>
                    <p className="text-sm text-gray-600">Customer: {order.customerName}</p>
                    <p className="text-sm text-gray-500">Date: {order.date}</p>
                </div>
                <div className="text-right">
                    <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                    <span className={`px-2 py-1 text-sm rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-200 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-200 text-blue-800' :
                        order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-red-200 text-red-800'
                    }`}>
                        {order.status}
                    </span>
                </div>
            </div>
            <div className="mt-4">
                <h4 className="font-semibold">Items:</h4>
                <ul className="list-disc list-inside">
                    {order.items.map(item => (
                        <li key={item.productId}>{item.name} (x{item.quantity})</li>
                    ))}
                </ul>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
                <select 
                    value={order.status} 
                    onChange={(e) => onUpdateStatus(order.orderId, e.target.value as Order['status'])}
                    className="p-2 border rounded"
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