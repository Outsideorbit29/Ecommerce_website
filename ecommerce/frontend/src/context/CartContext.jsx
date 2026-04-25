"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/cart");
      setCartItems(data.items || []);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      alert("Please login to add to cart");
      return;
    }
    try {
      const { data } = await api.post("/cart", { productId, quantity });
      setCartItems(data.items || []);
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    try {
      const { data } = await api.delete(`/cart/${productId}`);
      setCartItems(data.items || []);
    } catch (error) {
      console.error("Failed to remove from cart", error);
    }
  };

  const clearCart = async () => {
    if (!user) {
      setCartItems([]);
      return;
    }
    try {
      await api.delete("/cart");
      setCartItems([]);
    } catch (error) {
      console.error("Failed to clear cart", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
