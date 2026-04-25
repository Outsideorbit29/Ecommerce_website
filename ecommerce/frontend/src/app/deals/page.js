"use client";
import ProductCard from "@/components/ui/ProductCard";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Zap, Timer } from "lucide-react";

export default function DealsPage() {
  const [dealProducts, setDealProducts] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const { data } = await api.get("/products");
        // Filter products with a price lower than 200 or custom logic
        setDealProducts(data.sort(() => 0.5 - Math.random()).slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    };
    fetchDeals();
  }, []);

  return (
    <div className="bg-white min-h-screen pt-20 pb-24">
      <div className="container mx-auto px-4">
        {/* Flash Sale Banner */}
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white mb-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-widest text-sm mb-4">
                <Zap className="fill-current" /> Limited Time Flash Sale
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">Up to 70% Off Today</h1>
              <p className="text-slate-400 text-lg mb-8 max-w-md">Exclusive discounts listed by our top sellers for the next 24 hours only. Don't miss out.</p>
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-3xl font-black">23</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Hours</span>
                </div>
                <div className="text-2xl font-black text-slate-700">:</div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black">45</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Mins</span>
                </div>
                <div className="text-2xl font-black text-slate-700">:</div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black">12</span>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Secs</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full aspect-square max-h-[300px] bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600" className="opacity-80 hover:scale-110 transition-transform duration-700" alt="Promo" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <Timer className="text-red-500" /> Hourly Exclusive Listings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {dealProducts.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
