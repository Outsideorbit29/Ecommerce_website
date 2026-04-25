"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const imageUrl = product.images?.[0] || "/placeholder.jpg";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-black/5 transition-all duration-300"
    >
      <Link href={`/product/${product._id || product.id}`}>
        <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
          {/* For production, we would use proper Next Image but we use standard img here since domains aren't config'd */}
          <img 
            src={imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {product.discount > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
              {product.discount}% OFF
            </div>
          )}
        </div>
      </Link>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="text-xs text-gray-400 uppercase tracking-wider">{product.category}</div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
            <Package className="w-3 h-3" /> SELLER VERIFIED
          </div>
        </div>
        <Link href={`/product/${product._id || product.id}`}>

          <h3 className="font-semibold text-lg text-slate-800 line-clamp-1 group-hover:text-black transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ${((product.price * 100) / (100 - product.discount)).toFixed(2)}
              </span>
            )}
          </div>
          <button 
            onClick={(e) => { e.preventDefault(); addToCart(product._id || product.id); }}
            className="bg-black text-white p-3 rounded-full hover:scale-110 active:scale-95 transition-transform"
            aria-label="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
