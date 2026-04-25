"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { Plus, Trash2, Edit2, Package, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    images: []
  });

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      // Note: Backend currently has a 'createProduct' which creates a sample. 
      // I should update it to take body data.
      await axios.post("http://localhost:5000/api/products", formData, config);
      setShowModal(false);
      fetchProducts();
      setFormData({ name: "", price: "", description: "", category: "", stock: "", images: [] });
    } catch (error) {
      alert("Failed to create product");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`http://localhost:5000/api/products/${id}`, config);
        fetchProducts();
      } catch (error) {
        alert("Failed to delete product");
      }
    }
  };

  if (!user || user.role !== 'Admin') {
    return <div className="p-20 text-center">Unauthorized. Admins only.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Product Catalog</h1>
            <p className="text-gray-500">Manage your store's inventory and listings.</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-[1.05] transition-transform shadow-xl shadow-black/10"
          >
            <Plus className="w-5 h-5" /> Add Product
          </button>
        </div>

        {/* Product List Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest">
                <tr>
                  <th className="p-6 font-bold">Product</th>
                  <th className="p-6 font-bold">Category</th>
                  <th className="p-6 font-bold">Price</th>
                  <th className="p-6 font-bold">Stock</th>
                  <th className="p-6 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
                          <img src={p.images?.[0] || "/placeholder.jpg"} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-slate-800">{p.name}</span>
                      </div>
                    </td>
                    <td className="p-6 text-gray-500">{p.category}</td>
                    <td className="p-6 font-bold text-slate-900">${p.price.toFixed(2)}</td>
                    <td className="p-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {p.stock} in stock
                      </span>
                    </td>
                    <td className="p-6 text-right space-x-2">
                      <button className="p-2 text-slate-400 hover:text-black transition-colors"><Edit2 className="w-4 h-4"/></button>
                      <button onClick={() => handleDelete(p._id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4"/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Product Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl p-8 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Add New Listing</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-6 h-6"/></button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input type="text" required placeholder="GTR Mesh Headphones" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input type="number" step="0.01" required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input type="number" required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none h-24" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input type="text" required placeholder="Electronics" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input type="text" placeholder="https://..." className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.images[0] || ""} onChange={(e) => setFormData({...formData, images: [e.target.value]})} />
                </div>
                
                <button type="submit" className="w-full bg-black text-white p-4 rounded-xl font-bold mt-4 shadow-lg shadow-black/10 hover:bg-slate-800 transition-colors">
                  Publish Listing
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
