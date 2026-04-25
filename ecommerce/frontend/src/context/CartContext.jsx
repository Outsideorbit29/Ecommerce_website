"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
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
      const { data } = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCartItems(data.items || []);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      // Local cart storage logic omitted for simplicity; fallback to login required
      alert("Please login to add to cart");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/cart",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCartItems(data.items || []);
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/cart/${productId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCartItems(data.items || []);
    } catch (error) {
      console.error("Failed to remove from cart", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
