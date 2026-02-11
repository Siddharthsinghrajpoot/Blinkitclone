import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"
export const context = createContext();

const ShopContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/");
        if (res.data.success) setProducts(res.data.products);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

// Inside ShopContext.jsx
const addToCart = async (productId) => {
  if (!token) {
    alert("Please login to add to cart");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/api/cart/add",
      { productId },
      {
        headers: {
          token: token, // send token in headers
        },
      }
    );

    if (res.data.success) {
      setCart(res.data.cart); // update cart in context
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Add to cart failed");
  }
};




  return (
    <context.Provider value={{ products, loading, token, setToken,
        cart,
        setCart,
        addToCart,  }}>
      {children}
    </context.Provider>
  );
};

export default ShopContext;
