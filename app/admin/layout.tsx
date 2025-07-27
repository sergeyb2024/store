import Link from 'next/link';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  // Mock authentication check (replace with real middleware later)
  const isAuthenticated = true;
  if (!isAuthenticated) return <div>Access Denied</div>;

  return (
    <div>
      <nav className="bg-blue-800 text-white p-4">
        <ul className="flex space-x-4">
          <li><Link href="/admin">Dashboard</Link></li>
          <li><Link href="/admin/products">Products</Link></li>
          <li><Link href="/admin/orders">Orders</Link></li>
          <li><Link href="/admin/customers">Customers</Link></li>
          <li><Link href="/admin/promotions">Promotions</Link></li>
          <li><Link href="/admin/content">Content</Link></li>
          <li><Link href="/admin/reports">Reports</Link></li>
          <li><Link href="/admin/settings">Settings</Link></li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
}