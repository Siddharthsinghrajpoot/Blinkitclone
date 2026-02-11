import React, { useContext } from "react";
import { context } from "../context/ShopContext";
import { Link } from "react-router-dom";


export default function Header() {
  const { token,cart } = useContext(context);

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Blinkit</div>
      <div className="flex items-center gap-4">
        <Link  to="/cart"  >
        <button className="bg-green-500 px-3 py-1 rounded">Cart: {cart.length}</button>
     </Link>
        {!token ? (
          <Link to="/login">
            <button className="bg-white text-blue-500 px-3 py-1 rounded font-semibold">
              Login / Signup
            </button>
          </Link>
        ) : (
          <button className="bg-white text-blue-500 px-3 py-1 rounded font-semibold">
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
