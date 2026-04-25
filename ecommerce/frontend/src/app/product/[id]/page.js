"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ui/ProductCard";
import { motion } from "framer-motion";
import { ShoppingCart, Star, StarHalf, Heart, Share2, Sparkles } from "lucide-react";
import api from "@/lib/api";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock Data for instant demo
    const dummyData = [
      { _id: "1", name: "Premium Wireless Headphones", category: "Electronics", price: 299.99, discount: 15, images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600"], description: "Experience crystal-clear audio with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and plush memory foam ear cushions for all-day comfort." },
      { _id: "2", name: "Minimalist Smartwatch", category: "Wearables", price: 199.99, discount: 0, images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600"], description: "Track your fitness and stay connected with a sleek, minimalist design." },
    ];

    const fetchDetail = async () => {
      try {
        // Attempt fetch from backend
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch(e) {
        setProduct(dummyData.find(p => p._id === id) || dummyData[0]);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const { data } = await api.get(`/products/ai/recommendations`);
        setRecommendations(data.recommendations || dummyData);
      } catch(e) {
        setRecommendations(dummyData);
      }
    };

    fetchDetail();
    fetchRecommendations();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square bg-gray-100 rounded-3xl overflow-hidden relative"
          >
            <img 
              src={product.images?.[0] || "/placeholder.jpg"} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <div className="text-sm text-gray-500 uppercase tracking-widest mb-3">{product.category}</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <StarHalf className="w-5 h-5 fill-current" />
              </div>
              <span className="text-gray-500 text-sm">(128 Reviews)</span>
            </div>

            <div className="text-3xl font-bold text-slate-900 mb-8">
              ${product.price.toFixed(2)}
              {product.discount > 0 && (
                <span className="text-lg text-gray-400 line-through ml-3 font-normal">
                  ${((product.price * 100) / (100 - product.discount)).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              {product.description || "Premium quality product built with extreme attention to detail and materials."}
            </p>

            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => addToCart(product._id)}
                className="flex-grow bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-3 shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-95"
              >
                <ShoppingCart className="w-6 h-6" /> Add to Cart
              </button>
              <button className="p-4 rounded-xl border border-gray-200 hover:border-black text-gray-600 hover:text-black transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <button className="p-4 rounded-xl border border-gray-200 hover:border-black text-gray-600 hover:text-black transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex gap-4">
              <Sparkles className="text-purple-500 w-6 h-6 flex-shrink-0" />
              <p className="text-sm text-gray-600"><span className="text-black font-semibold">AI Insights:</span> This product is trending among users who purchased similar {product.category} items. High durability rating reported in reviews.</p>
            </div>
          </motion.div>
        </div>

        {/* AI Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="pt-16 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-10">
              <Sparkles className="text-purple-500 w-8 h-8" />
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">AI Recommended for You</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {recommendations.map(r => (
                <ProductCard key={r._id} product={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
