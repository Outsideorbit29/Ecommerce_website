"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { User, Mail, Phone, MapPin, Package, Calendar, ChevronRight, ShoppingCart, Activity } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          // Fetch Profile Details
          const { data: profile } = await api.get("/auth/profile");
          setProfileData(profile);

          // Fetch Order History
          const { data: myOrders } = await api.get("/orders/myorders");
          setOrders(myOrders);
        } catch (error) {
          console.error("Error fetching profile data", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
          <Link href="/login" className="bg-black text-white px-6 py-2 rounded-full">Sign In</Link>
        </div>
      </div>
    );
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Profile...</div>;

  return (
    <div className="bg-gray-50 min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-tr from-slate-800 to-black rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                {profileData?.name?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">{profileData?.name}</h2>
              <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest font-medium">{profileData?.role}</p>
              
              <div className="space-y-4 text-left border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-sm truncate">{profileData?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">{profileData?.phoneNumber || "No phone added"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">{profileData?.address || "No address added"}</span>
                </div>
              </div>

              <button 
                onClick={logout}
                className="w-full mt-8 bg-red-50 text-red-600 p-3 rounded-xl font-semibold hover:bg-red-100 transition-colors"
              >
                Log Out
              </button>
            </motion.div>

            {profileData?.role === 'Admin' && (
              <Link href="/admin" className="block p-6 bg-black text-white rounded-3xl text-center font-bold hover:scale-[1.02] active:scale-95 transition-transform shadow-xl shadow-black/10">
                Go to Admin Dashboard
              </Link>
            )}
          </div>

          {/* Activity Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Package className="w-6 h-6" /> Recent Orders
              </h3>

              {orders.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                  <Link href="/products" className="text-black font-semibold hover:underline">Start Shopping</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order._id} className="group flex items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-black hover:bg-gray-50 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center shadow-sm">
                          <ShoppingCart className="w-6 h-6 text-slate-400" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">Order #{order._id.slice(-6).toUpperCase()}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">${order.totalPrice.toFixed(2)}</p>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                          {order.isPaid ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Activity className="w-6 h-6" /> Account Overview
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-blue-50 rounded-2xl">
                  <p className="text-blue-600 text-sm font-medium mb-1">Items in Cart</p>
                  <p className="text-3xl font-bold text-blue-900">3</p>
                </div>
                <div className="p-6 bg-purple-50 rounded-2xl">
                  <p className="text-purple-600 text-sm font-medium mb-1">Total Spent</p>
                  <p className="text-3xl font-bold text-purple-900">${orders.reduce((acc, o) => acc + o.totalPrice, 0).toFixed(0)}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


