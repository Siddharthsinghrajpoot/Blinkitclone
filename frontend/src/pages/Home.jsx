import React, { useContext, } from "react";
import { context } from "../context/ShopContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { products, loading } = useContext(context);

  if (loading) return <p className="text-center p-4">Loading products...</p>;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map(product => (
     <Link key={product._id} to={`/product/${product._id}`}>

        
        <div key={product._id} className="border p-4 rounded shadow">
          <img
            src={product.image[0]}
            alt={product.name}
            className="h-40 w-full object-cover"
          />
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p>{product.description}</p>
          <p className="font-bold">₹{product.price}</p>
        </div>
        </Link>
      ))}
    </div>
  );
}
