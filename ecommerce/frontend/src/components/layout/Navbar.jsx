"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, User, LogOut, Package, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const navLinks = [
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Deals', href: '/deals' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-200"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-slate-800 tracking-tighter">
            <Package className="w-8 h-8 text-black" />
            <span className="hidden sm:inline">Acme<span className="text-gray-400">Store</span></span>
            <span className="sm:hidden">Acme</span>
          </Link>
        </div>
        
        <div className="hidden md:flex gap-8 font-medium text-gray-600">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-black transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/cart" className="relative group p-2">
            <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-black transition-colors" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/profile" className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors">
                <User className="w-5 h-5 text-gray-700" />
                <span className="hidden lg:block text-sm font-medium">{user.name}</span>
              </Link>
              <button onClick={logout} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="bg-black text-white px-4 py-2 sm:px-5 sm:py-2 rounded-full font-medium text-sm hover:scale-105 transition-transform">
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-gray-600 hover:text-black transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-gray-100" />
              {user ? (
                <Link 
                  href="/profile" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-lg font-medium text-gray-600"
                >
                  <User className="w-5 h-5" /> Profile
                </Link>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-black"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
