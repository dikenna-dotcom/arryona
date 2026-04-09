"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCheckout = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    // TODO: Integrate with Stripe checkout
    alert("Proceeding to Stripe payment...");
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white p-10 rounded-lg text-center">
            <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
            <Link
              href="/shop"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b py-4"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      className="w-16 px-2 py-1 border border-gray-300 rounded"
                    />
                    <p className="font-semibold w-20 text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg h-fit">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="border-b py-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax:</span>
                  <span>${(total * 0.1).toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between py-4 font-bold text-lg">
                <span>Total:</span>
                <span>${(total * 1.1).toFixed(2)}</span>
              </div>

              {user ? (
                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 mb-2"
                >
                  Checkout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="block w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 text-center mb-2"
                >
                  Login to Checkout
                </Link>
              )}

              <button
                onClick={() => clearCart()}
                className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
