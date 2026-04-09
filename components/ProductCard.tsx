"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  stock?: number;
  media?: {
    images: string[];
    videos: string[];
  };
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  // Use first uploaded image if available, otherwise fallback to emoji
  const displayImage = product.media?.images?.[0] || product.image || "📦";

  return (
    <div className="border border-gray-300 p-4 rounded-lg hover:shadow-lg transition">
      <div className="bg-gray-200 h-48 rounded mb-4 flex items-center justify-center overflow-hidden">
        {product.media?.images?.[0] ? (
          <img
            src={product.media.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-7xl">{displayImage}</span>
        )}
      </div>
      <h2 className="text-lg font-bold mb-2 line-clamp-2">{product.name}</h2>
      {product.category && (
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
      )}
      
      {/* Rating */}
      {product.rating && (
        <div className="flex items-center gap-1 mb-2">
          <span className="text-yellow-500">★</span>
          <span className="text-sm font-semibold">{product.rating}</span>
          {product.reviews && (
            <span className="text-xs text-gray-600">({product.reviews})</span>
          )}
        </div>
      )}

      <p className="text-xl font-bold text-green-600 mb-2">
        ${product.price.toFixed(2)}
      </p>

      {/* Stock */}
      {product.stock !== undefined && (
        <p className="text-xs text-gray-600 mb-4">
          {product.stock > 0 ? (
            <span className="text-green-600 font-semibold">✓ In Stock</span>
          ) : (
            <span className="text-red-600 font-semibold">Out of Stock</span>
          )}
        </p>
      )}

      <div className="flex gap-2">
        <Link
          href={`/product/${product.id}`}
          className="flex-1 bg-blue-600 text-white py-2 rounded text-center hover:bg-blue-700 text-sm font-semibold"
        >
          View
        </Link>
        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm font-semibold disabled:bg-gray-400"
        >
          Add
        </button>
      </div>
    </div>
  );
}
