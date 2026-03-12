'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Menu, X, Globe, Info, Mail, Home, Map, UserCircle } from 'lucide-react';
import AuthModal from './AuthModal';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Plan Trip', path: '/plan-trip', icon: Map },
  { name: 'Destinations', path: '/destinations', icon: Globe },
  { name: 'About', path: '/about', icon: Info },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname === '/') return null;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass shadow-sm py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-brand-primary to-brand-secondary text-white p-2.5 rounded-2xl shadow-lg shadow-brand-primary/30 group-hover:shadow-brand-primary/50 group-hover:scale-105 transition-all duration-300">
              <Plane size={24} strokeWidth={2.5} className="-rotate-45" />
            </div>
            <span className={`text-2xl font-black tracking-tight text-gray-900`}>
              Planora
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-2 py-2 border border-white/20">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 z-10 ${isActive
                      ? (scrolled ? 'text-white' : 'text-gray-900')
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className={`absolute inset-0 -z-10 rounded-full ${scrolled ? 'bg-gradient-to-r from-brand-primary to-brand-secondary' : 'bg-white shadow-sm'}`}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={() => setIsLoggedIn(false)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-sm border border-gray-200 ${scrolled ? 'bg-white text-gray-800 hover:bg-gray-50' : 'bg-white/20 text-gray-900 backdrop-blur-md hover:bg-white'} `}
              >
                <UserCircle size={18} className="text-brand-primary" />
                <span>Profile</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-sm border ${scrolled ? 'border-gray-200 bg-white text-gray-800 hover:bg-gray-50' : 'border-white/20 bg-white/20 text-gray-900 backdrop-blur-md hover:bg-white'}`}
              >
                Sign In
              </button>
            )}
            <Link href="/contact">
              <button className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:-translate-y-0.5 ${scrolled
                  ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-gray-900/20'
                  : 'bg-white text-gray-900 hover:bg-gray-50 shadow-black/10'
                }`}>
                Contact Us
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-full transition-colors ${scrolled ? 'bg-gray-100 text-gray-900' : 'bg-white/20 text-gray-900 backdrop-blur-md'
                }`}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full px-4 pt-4 pb-6"
          >
            <div className="bg-white/95 backdrop-blur-xl border border-gray-100 rounded-3xl p-4 shadow-2xl flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-semibold transition-colors ${isActive
                        ? 'bg-brand-primary/10 text-brand-primary'
                        : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <Icon size={20} className={isActive ? 'text-brand-primary' : 'text-gray-400'} />
                    {item.name}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-gray-100">
                {isLoggedIn ? (
                  <button
                    onClick={() => { setIsLoggedIn(false); setIsOpen(false); }}
                    className="flex justify-center items-center gap-2 w-full px-4 py-3.5 rounded-2xl text-base font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <UserCircle size={20} className="text-brand-primary" /> Profile
                  </button>
                ) : (
                  <button
                    onClick={() => { setIsAuthOpen(true); setIsOpen(false); }}
                    className="w-full px-4 py-3.5 rounded-2xl text-base font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Sign In
                  </button>
                )}
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-primary/20 flex justify-center items-center gap-2 transition-transform active:scale-[0.98]">
                    <Mail size={18} /> Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={() => setIsLoggedIn(true)}
      />
    </nav>
  );
};

export default Navbar;