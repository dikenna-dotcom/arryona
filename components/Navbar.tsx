"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import netlifyIdentity from 'netlify-identity-widget';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    netlifyIdentity.init();
    setUser(netlifyIdentity.currentUser);
    setLoading(false);

    netlifyIdentity.on('login', () => {
      setUser(netlifyIdentity.currentUser);
    });

    netlifyIdentity.on('logout', () => {
      setUser(null);
    });
  }, []);

  const handleLogout = async () => {
    try {
      await netlifyIdentity.logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        ARRYONA
      </Link>

      <div className="flex gap-6 items-center">
        <Link href="/shop" className="hover:text-gray-300">
          Shop
        </Link>
        <Link href="/seller" className="hover:text-gray-300">
          Advertise
        </Link>
        <Link href="/cart" className="hover:text-gray-300">
          Cart
        </Link>

        {!loading && (
          <>
            {user ? (
              <>
                <span className="text-sm text-gray-400">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
