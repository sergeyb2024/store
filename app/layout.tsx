// app/layout.tsx
import { ReactNode } from 'react';
import { CartProvider } from '../components/Header';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Hobby Shop - Model Kits & Supplies</title>
        <meta name="description" content="Your one-stop shop for model kits and hobby supplies" />
      </head>
      <body className="min-h-screen bg-gray-100">
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}