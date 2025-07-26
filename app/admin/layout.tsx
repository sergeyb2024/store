// app/admin/layout.tsx
import Link from 'next/link';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  // Mock authentication check (replace with real middleware)
  const isAuthenticated = true; // Example; use real auth logic
  if (!isAuthenticated) return <div>Access Denied</div>;

  return (
    <div>
      <nav className="bg-blue-800 text-white p-4">
        <ul className="flex space-x-4">
          <li><Link href="/admin"><a>Dashboard</a></Link></li>
          <li><Link href="/admin/products"><a>Products</a></Link></li>
          <li><Link href="/admin/orders"><a>Orders</a></Link></li>
          <li><Link href="/admin/customers"><a>Customers</a></Link></li>
          <li><Link href="/admin/promotions"><a>Promotions</a></Link></li>
          <li><Link href="/admin/content"><a>Content</a></Link></li>
          <li><Link href="/admin/reports"><a>Reports</a></Link></li>
          <li><Link href="/admin/settings"><a>Settings</a></Link></li>
        </ul>
      </nav>
      {children}
    </div>
  );
}