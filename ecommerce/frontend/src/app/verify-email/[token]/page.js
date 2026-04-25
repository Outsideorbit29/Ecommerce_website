"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function VerifyEmail() {
  const { token } = useParams();
  const router = useRouter();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/auth/verify-email/${token}`);
        setStatus("success");
        setMessage(data.message);
      } catch (error) {
        setStatus("error");
        setMessage(error.response?.data?.message || "Verification failed");
      }
    };

    if (token) {
      verify();
    }
  }, [token]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 text-center border border-gray-100"
      >
        {status === "verifying" && (
          <div className="flex flex-col items-center">
            <Loader2 className="w-16 h-16 text-black animate-spin mb-6" />
            <h1 className="text-2xl font-bold mb-2">Verifying your email...</h1>
            <p className="text-gray-500">Please wait while we confirm your account.</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-slate-900">Verified!</h1>
            <p className="text-gray-600 mb-8">{message}</p>
            <Link href="/login" className="w-full bg-black text-white p-4 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all">
              Go to Login
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-slate-900">Oops!</h1>
            <p className="text-gray-600 mb-8">{message}</p>
            <Link href="/signup" className="w-full border-2 border-black p-4 rounded-xl font-bold hover:bg-black hover:text-white transition-all">
              Back to Signup
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
