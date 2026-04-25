"use client";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Cart() {
  const { cartItems, removeFromCart, addToCart } = useCart();

  const total = cartItems.reduce((acc, item) => {
    // Note: In real app, item.product has price because we populated it in backend
    const price = item.product?.price || 0;
    return acc + price * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looking for something premium? Discover our latest collections.</p>
        <Link href="/products" className="bg-black text-white px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-extrabold mb-8 text-slate-900 tracking-tight">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={item._id || index} 
                className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={item.product?.images?.[0] || "/placeholder.jpg"} 
                    alt={item.product?.name || "Product"} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg text-slate-800 line-clamp-1">{item.product?.name || "Premium Product"}</h3>
                  <p className="text-gray-500 text-sm mb-2">{item.product?.category}</p>
                  <div className="font-bold text-slate-900">${(item.product?.price || 0).toFixed(2)}</div>
                </div>
                
                <div className="flex flex-col items-end gap-3 justify-center min-w-[100px]">
                  <div className="flex items-center bg-gray-100 rounded-full border border-gray-200">
                    <button 
                      onClick={() => addToCart(item.product._id, -1)}
                      className="p-1 hover:text-black text-gray-500"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => addToCart(item.product._id, 1)}
                      className="p-1 hover:text-black text-gray-500"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-500 text-sm flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-slate-900 border-b pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-slate-900">Free</span>
                </div>
              </div>
              
              <div className="flex justify-between text-lg font-bold text-slate-900 border-t pt-4 mb-8">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <Link 
                href="/checkout" 
                className="w-full bg-black text-white p-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-black/10 hover:shadow-xl"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
