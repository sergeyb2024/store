import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="text-lg font-bold">Hobby Shop</h3>
          <p>Your source for model kits and hobby supplies.</p>
        </div>
        <div>
          <h3 className="text-lg font-bold">Links</h3>
          <ul>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/shipping" className="hover:underline">Shipping Policy</Link></li>
            <li><Link href="/returns" className="hover:underline">Returns Policy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">Newsletter</h3>
          <input type="email" placeholder="Enter your email" className="p-2 rounded w-full mb-2 text-black" />
          <button className="p-2 bg-blue-600 rounded text-white">Subscribe</button>
        </div>
      </div>
    </footer>
  );
}