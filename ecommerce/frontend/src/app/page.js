"use client";
import ProductCard from "@/components/ui/ProductCard";
import Link from 'next/link';


// Using dummy data if API is not yet seeded
const dummyProducts = [
  { id: "1", _id: "1", name: "Premium Wireless Headphones", category: "Electronics", price: 299.99, discount: 15, images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600"] },
  { id: "2", _id: "2", name: "Minimalist Smartwatch", category: "Wearables", price: 199.99, discount: 0, images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600"] },
  { id: "3", _id: "3", name: "Ergonomic Desk Chair", category: "Furniture", price: 499.50, discount: 20, images: ["https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=600"] },
  { id: "4", _id: "4", name: "Professional DSLR Camera", category: "Photography", price: 1299.00, discount: 5, images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600"] },
];

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-slate-100">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Lifestyle</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl font-light mb-10 text-gray-200"
          >
            Discover our curated collection of premium products designed for modern living.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a href="#featured" className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-xl">
              Shop Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto border border-gray-100 rounded-[3rem] p-12 bg-neutral-50 shadow-2xl shadow-black/5">
            <h2 className="text-3xl font-bold text-center mb-10">Transparent Marketplace</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                <h3 className="font-bold text-lg mb-2">Sellers List</h3>
                <p className="text-gray-500 text-sm">Verified sellers and admins list premium items with detailed specs.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white text-black border-2 border-black rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                <h3 className="font-bold text-lg mb-2">Customers Buy</h3>
                <p className="text-gray-500 text-sm">Customers browse these listings and purchase quality goods directly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Note */}
      <section className="py-20 bg-white">

        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-slate-900">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Electronics', slug: 'Electronics' },
              { name: 'Men Fashion', slug: 'Men Fashion' },
              { name: 'Women Fashion', slug: 'Women Fashion' },
              { name: 'Child Fashion', slug: 'Child Fashion' }
            ].map((cat, i) => (
              <Link key={i} href={`/products?category=${encodeURIComponent(cat.slug)}`}>
                <div className="group cursor-pointer aspect-square bg-white rounded-[2.5rem] flex items-center justify-center p-6 border border-gray-100 hover:border-black hover:shadow-2xl hover:shadow-black/5 transition-all relative overflow-hidden">
                  <div className="absolute inset-0 bg-neutral-50 group-hover:bg-transparent transition-colors" />
                  <h3 className="text-xl font-bold text-slate-800 z-10 group-hover:scale-110 transition-transform tracking-tight">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-2">Featured Collection</h2>
              <p className="text-gray-500">Our most popular premium products</p>
            </div>
            <a href="/products" className="hidden md:inline-block font-medium text-black border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
              View All Products
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {dummyProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
