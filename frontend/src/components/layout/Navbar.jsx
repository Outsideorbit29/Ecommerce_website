"use client";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, User, LogOut, Package } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  const cartCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-gray-200"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-slate-800 tracking-tighter">
          <Package className="w-8 h-8 text-black" />
          Acme<span className="text-gray-400">Store</span>
        </Link>
        
        <div className="hidden md:flex gap-8 font-medium text-gray-600">
          <Link href="/products" className="hover:text-black transition-colors">Products</Link>
          <Link href="/categories" className="hover:text-black transition-colors">Categories</Link>
          <Link href="/deals" className="hover:text-black transition-colors">Deals</Link>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative group">
            <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-black transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors">
                <User className="w-5 h-5 text-gray-700" />
                <span className="hidden md:block text-sm font-medium">{user.name}</span>
              </Link>
              <button onClick={logout} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="bg-black text-white px-5 py-2 rounded-full font-medium text-sm hover:scale-105 transition-transform">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
