import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { context } from "../context/ShopContext";

export default function ProductDetail() {
  const { id } = useParams(); // get product id from URL
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(context);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        if (res.data.success) setProduct(res.data.product);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center p-4">Loading product...</p>;

  return (
    <div className="p-4 max-w-md mx-auto border rounded shadow">
      <img src={product.image[0]} alt={product.name} className="h-80 w-full object-cover mb-4"/>
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="mb-2">{product.description}</p>
      <p className="font-bold mb-4">₹{product.price}</p>
      <button
     onClick={() => addToCart(product._id)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
