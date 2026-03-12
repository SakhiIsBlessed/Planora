'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Twitter, Instagram, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  const pathname = usePathname();
  if (pathname === '/') return null;

  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-16 pb-8 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="bg-brand-primary text-white p-1.5 rounded-lg">
                <Map size={20} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Planora
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Plan your perfect trip in seconds using advanced AI. Discover hidden gems, optimize your budget, and build memories.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide text-sm uppercase">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-brand-primary transition-colors text-sm">Home</Link></li>
              <li><Link href="/plan-trip" className="hover:text-brand-primary transition-colors text-sm">Plan Trip</Link></li>
              <li><Link href="/destinations" className="hover:text-brand-primary transition-colors text-sm">Destinations</Link></li>
              <li><Link href="/about" className="hover:text-brand-primary transition-colors text-sm">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide text-sm uppercase">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="hover:text-brand-primary transition-colors text-sm">Contact Us</Link></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors text-sm">FAQ</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide text-sm uppercase">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">Subscribe to get travel tips and exclusive AI features.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-1 focus:ring-brand-primary text-sm border border-gray-700"
              />
              <button
                type="button"
                className="bg-brand-primary hover:bg-brand-secondary px-4 py-2 rounded-r-lg transition-colors flex items-center justify-center"
              >
                <Mail size={16} className="text-white" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Planora. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <span>Made with precision</span>
            <span>Worldwide Coverage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;