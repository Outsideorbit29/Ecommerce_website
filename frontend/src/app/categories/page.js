"use client";
import Link from "next/link";
import { Laptop, Shirt, Baby, Sparkles, Watch, Camera } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { name: "Electronics", icon: <Laptop />, count: "124 items", color: "bg-blue-500", desc: "Mobiles, PCs, and Tablets" },
  { name: "Men Fashion", icon: <Shirt />, count: "82 items", color: "bg-black", desc: "Casual & Formal Wear" },
  { name: "Women Fashion", icon: <Sparkles />, count: "115 items", color: "bg-purple-500", desc: "Dresses, Bags, & Jewelry" },
  { name: "Child Fashion", icon: <Baby />, count: "45 items", color: "bg-orange-500", desc: "Comfortable kids' clothing" },
  { name: "Wearables", icon: <Watch />, count: "32 items", color: "bg-green-500", desc: "Smartwatches & Accessories" },
  { name: "Photography", icon: <Camera />, count: "18 items", color: "bg-red-500", desc: "Professional Cameras & Gear" },
];

export default function CategoriesPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-24">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">Browse Collections</h1>
          <p className="text-gray-500 text-lg">Every listing provided by verified sellers across all categories.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div 
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-black/5 transition-all"
            >
              <div className={`w-16 h-16 ${cat.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                {cat.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{cat.name}</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">{cat.desc}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{cat.count}</span>
                <Link 
                  href={`/products?category=${cat.name}`}
                  className="bg-gray-50 p-3 rounded-full hover:bg-black hover:text-white transition-colors"
                >
                  Explore Category
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
