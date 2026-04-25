"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Lock, Loader2 } from "lucide-react";
import api from "@/lib/api";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Shipping state
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "USA"
  });

  const total = cartItems.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to complete your order");
      router.push("/login");
      return;
    }

    try {
      setIsProcessing(true);
      
      // Prepare order data for backend
      const orderData = {
        orderItems: cartItems.map(item => ({
          product: item.product._id,
          name: item.product.name,
          qty: item.quantity,
          price: item.product.price,
        })),
        shippingAddress: {
          address: shippingData.address,
          city: shippingData.city,
          postalCode: shippingData.zip,
          country: shippingData.country,
        },
        paymentMethod: "Credit Card",
        totalPrice: total,
      };

      await api.post("/orders", orderData);

      // Clear cart on success
      await clearCart();
      setStep(3);
    } catch (error) {
      console.error("Order creation failed", error);
      alert(error.response?.data?.message || "Something went wrong with your order.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-md border border-gray-100"
        >
          <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Order Confirmed!</h2>
          <p className="text-gray-500 mb-8 text-lg">Thank you for your purchase. We've sent a confirmation email with order details.</p>
          <button 
            onClick={() => router.push("/products")}
            className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-lg"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-extrabold mb-8 text-slate-900 tracking-tight">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form Content */}
          <div className="lg:col-span-2">
            
            {/* Steps indicator */}
            <div className="flex gap-4 mb-8">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-black' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-black text-white' : 'bg-gray-200'}`}>1</div>
                <span className="font-medium">Shipping</span>
              </div>
              <div className="w-12 h-px bg-gray-300 my-auto"></div>
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-black' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-black text-white' : 'bg-gray-200'}`}>2</div>
                <span className="font-medium">Payment</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              {step === 1 && (
                <form onSubmit={handleNext} className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input 
                        type="text" required 
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" 
                        value={shippingData.firstName} onChange={(e) => setShippingData({...shippingData, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input 
                        type="text" required 
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" 
                        value={shippingData.lastName} onChange={(e) => setShippingData({...shippingData, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input 
                      type="text" required 
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" 
                      value={shippingData.address} onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input 
                        type="text" required 
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" 
                        value={shippingData.city} onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input 
                        type="text" required 
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" 
                        value={shippingData.state} onChange={(e) => setShippingData({...shippingData, state: e.target.value})}
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
                      <input 
                        type="text" required 
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" 
                        value={shippingData.zip} onChange={(e) => setShippingData({...shippingData, zip: e.target.value})}
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-black text-white p-4 rounded-xl font-medium hover:bg-slate-800 transition-colors mt-8">
                    Continue to Payment
                  </button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handlePayment} className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Details</h2>
                  <p className="text-gray-500 mb-6 flex items-center gap-2"><Lock className="w-4 h-4"/> Secure encrypted transaction</p>
                  
                  {/* Generic placeholder for Stripe/Razorpay standard elements */}
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="flex gap-4 mb-4 border-b border-gray-200 pb-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="payment" defaultChecked className="accent-black w-4 h-4" />
                        <span className="font-medium text-slate-800">Credit Card</span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input type="text" placeholder="0000 0000 0000 0000" required className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-6 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" required className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                        <input type="text" placeholder="123" required className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-gray-100 text-black p-4 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                      Back
                    </button>
                    <button 
                      type="submit" 
                      disabled={isProcessing}
                      className="w-2/3 bg-black text-white p-4 rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                    >
                      {isProcessing ? <Loader2 className="w-5 h-5 animate-spin"/> : `Pay $${total.toFixed(2)}`}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-slate-900">Order Summary</h2>
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 text-sm">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.product?.images?.[0] || "/placeholder.jpg"} alt="" className="w-full h-full object-cover"/>
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-slate-800 line-clamp-1">{item.product?.name}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-medium text-slate-900">${((item.product?.price || 0) * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-slate-900">Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-slate-900 border-t pt-3">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
