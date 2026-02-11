import React, { useContext, useEffect, useState } from "react";
import { context } from "../context/ShopContext";

export default function Cart() {
  const { cart, setCart, products } = useContext(context);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Map cart items with product details
  useEffect(() => {
    const items = cart.map((cartItem) => {
      const product = products.find(
        (p) => p._id === cartItem.product
      );
      return { ...cartItem, productDetails: product };
    });
    setCartItems(items);

    // calculate total price
    const total = items.reduce(
      (sum, item) =>
        sum + item.quantity * (item.productDetails?.price || 0),
      0
    );
    setTotalPrice(total);
  }, [cart, products]);

  if (cartItems.length === 0)
    return <p className="text-center p-4">Your cart is empty.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.product}
            className="flex justify-between items-center border p-4 rounded"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.productDetails?.image[0]}
                alt={item.productDetails?.name}
                className="h-20 w-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">
                  {item.productDetails?.name}
                </h3>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
            <p className="font-bold">
              ₹{item.quantity * (item.productDetails?.price || 0)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <p className="text-xl font-bold">
          Total Price: ₹{totalPrice}
        </p>
      </div>
    </div>
  );
}
