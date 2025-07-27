import { ReactNode } from 'react';

// The layout component must accept a "children" prop and return JSX.
export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    // You can add account-specific layout structure here, like a sidebar.
    <section className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      <div className="flex">
        <aside className="w-1/4">
          {/* Add account navigation links here */}
          <nav>
            <ul>
              <li>Profile</li>
              <li>Orders</li>
              <li>Settings</li>
            </ul>
          </nav>
        </aside>
        
        {/* The "children" prop renders the actual page content (e.g., profile page, orders page) */}
        <main className="w-3/4">
          {children}
        </main>
      </div>
    </section>
  );
}