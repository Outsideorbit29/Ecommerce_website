"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Package, Users, DollarSign, Activity, List, PlusCircle, LayoutDashboard, Settings } from "lucide-react";

export default function SellerDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Seller Command Center</h1>
            <p className="text-gray-500 mt-1">Everything you need to manage your premium listings.</p>
          </div>
          <button 
            onClick={() => router.push("/admin/products")}
            className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-[1.03] transition-transform shadow-2xl shadow-black/10"
          >
            <PlusCircle className="w-6 h-6" /> List New Product
          </button>
        </div>

        {/* Essential Stats Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><DollarSign className="w-6 h-6" /></div>
              <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded-lg text-xs">+12.5%</span>
            </div>
            <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
            <h3 className="text-3xl font-black text-slate-900">$18,442.50</h3>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><List className="w-6 h-6" /></div>
            </div>
            <p className="text-gray-500 text-sm font-medium">Active Listings</p>
            <h3 className="text-3xl font-black text-slate-900">42</h3>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Users className="w-6 h-6" /></div>
              <span className="text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded-lg text-xs">New</span>
            </div>
            <p className="text-gray-500 text-sm font-medium">Your Customers</p>
            <h3 className="text-3xl font-black text-slate-900">892</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Inventory Management Summary */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <Package className="w-8 h-8 text-slate-300" /> Inventory Intelligence
              </h2>
              <button 
                onClick={() => router.push("/admin/products")}
                className="text-sm font-bold text-black border-b-2 border-black pb-0.5 hover:opacity-60 transition-opacity"
              >
                Full Inventory View
              </button>
            </div>
            <div className="space-y-6">
              {[
                { name: "Premium GTR Headphones", stock: 12, sales: 84 },
                { name: "Mesh Minimalist Watch", stock: 5, sales: 122 },
                { name: "Aesthetic Leather Satchel", stock: 0, sales: 45 }
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-neutral-50 border border-gray-100 group hover:border-black transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center font-bold text-slate-400">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{p.name}</h4>
                      <p className="text-xs text-gray-500">{p.sales} Units Sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] uppercase font-black px-3 py-1 rounded-full ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {p.stock > 0 ? `${p.stock} In Stock` : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Insights & Actions */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-black/20">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Activity className="w-6 h-6 text-indigo-400" /> Seller Growth
              </h3>
              <p className="text-slate-400 text-sm mb-8">Your listings are performing 15% better than last month. Consider listing more items in 'Electronics'.</p>
              <button className="w-full bg-white text-black p-4 rounded-2xl font-bold hover:scale-[1.02] transition-transform">
                View Customer Trends
              </button>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Tools</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-4 rounded-2xl hover:bg-gray-50 transition-colors flex items-center justify-between font-medium group">
                  <span className="flex items-center gap-3"><Settings className="w-5 h-5 text-gray-400 group-hover:text-black" /> Store Settings</span>
                </button>
                <button className="w-full text-left p-4 rounded-2xl hover:bg-gray-50 transition-colors flex items-center justify-between font-medium group">
                  <span className="flex items-center gap-3"><LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-black" /> Layout Config</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
