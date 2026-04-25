"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import api from "@/lib/api";
import { Search } from "lucide-react";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(categoryParam || "All");

  const categories = ["All", "Electronics", "Men Fashion", "Women Fashion", "Child Fashion", "Home Decor"];

  const fetchProducts = async (cat) => {
    try {
      setLoading(true);
      let endpoint = "/products";
      if (cat && cat !== "All") {
        endpoint += `?category=${encodeURIComponent(cat)}`;
      }
      const { data } = await api.get(endpoint);
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(activeCategory);
  }, [activeCategory]);

  return (
    <div className="bg-white min-h-screen pt-20 pb-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">Storefront</h1>
            <p className="text-gray-500 text-lg">Curated collections listed by our premium partners.</p>
          </div>
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search listings..." 
              className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-black outline-none shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-12 justify-center md:justify-start">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all border ${activeCategory === cat ? 'bg-black text-white border-black shadow-lg scale-105' : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="aspect-[4/5] bg-gray-50 animate-pulse rounded-[2.5rem]" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">No listings found in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
