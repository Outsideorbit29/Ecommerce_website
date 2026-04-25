"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function VerifyEmailPage() {
  const { token } = useParams();
  const router = useRouter();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await api.get(`/auth/verify-email/${token}`);
        setStatus("success");
        setMessage(data.message);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (error) {
        setStatus("error");
        setMessage(error.response?.data?.message || "Verification failed. The link may be expired or invalid.");
      }
    };

    if (token) {
      verify();
    }
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-black/5 text-center border border-gray-100"
      >
        {status === "loading" && (
          <div className="space-y-6">
            <Loader2 className="w-16 h-16 text-black animate-spin mx-auto" />
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Verifying Identity</h1>
            <p className="text-gray-500">Communicating with our security servers...</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Email Verified</h1>
            <p className="text-gray-500">{message}</p>
            <p className="text-sm text-gray-400">Redirecting you to login in a few seconds...</p>
            <Link href="/login" className="block w-full bg-black text-white p-4 rounded-xl font-bold mt-8 shadow-lg shadow-black/10">
              Sign In Now
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <XCircle className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Verification Failed</h1>
            <p className="text-gray-500">{message}</p>
            <Link href="/signup" className="block w-full bg-black text-white p-4 rounded-xl font-bold mt-8 shadow-lg shadow-black/10">
              Try Registering Again
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
