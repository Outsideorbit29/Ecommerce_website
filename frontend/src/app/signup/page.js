"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await signup(name, email, password, role);
    if (res.success) {
      router.push("/");
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Join AcmeStore</h2>
          <p className="text-gray-500 mt-2 text-sm">Customers buy, Sellers list. Choose your path.</p>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}
        
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
          <button 
            type="button"
            onClick={() => setRole("User")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${role === 'User' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
          >
            I'm a Customer
          </button>
          <button 
            type="button"
            onClick={() => setRole("Admin")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${role === 'Admin' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
          >
            I'm a Seller
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              minLength={6}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-black text-white p-3 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-black/10"
          >
            Create Account
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account? <Link href="/login" className="text-black font-semibold hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}
