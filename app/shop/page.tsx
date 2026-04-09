"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { getAllProducts, SellerProduct } from "@/lib/marketplace";

export default function Shop() {
  const [marketplaceProducts, setMarketplaceProducts] = useState<SellerProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const marketplace = await getAllProducts();
        setMarketplaceProducts(marketplace);
      } catch (err) {
        console.error("Failed to load marketplace products:", err);
        setError("Unable to load products right now. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const allProducts = [...products, ...marketplaceProducts];

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="bg-gray-800 text-white py-10 p-10">
        <h1 className="text-4xl font-bold">Shop All Products</h1>
        <p className="text-gray-300 mt-2">
          Discover our complete collection of {allProducts.length} products.
        </p>
      </section>

      <section className="p-10 max-w-7xl mx-auto">
        {loading ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-600">
            Loading marketplace products…
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-12 text-center text-red-700">
            {error}
          </div>
        ) : allProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-600">
            No products are available yet. Sellers can add listings from the seller dashboard.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
