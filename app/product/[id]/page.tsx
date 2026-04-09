"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { SellerProduct } from "@/lib/marketplace";
import { getProductById, incrementProductViews, getAllProducts } from "@/lib/marketplace";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<SellerProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<SellerProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProduct() {
      const productId = parseInt(params.id as string, 10);
      if (Number.isNaN(productId)) {
        setError("Invalid product ID.");
        setLoading(false);
        return;
      }

      try {
        const found = await getProductById(productId);
        if (!found) {
          setError("Product not found.");
          setLoading(false);
          return;
        }

        setProduct(found);
        await incrementProductViews(productId);

        const allProducts = await getAllProducts();
        setRelatedProducts(
          allProducts
            .filter((p) => p.category === found.category && p.id !== found.id)
            .slice(0, 3),
        );
      } catch (err) {
        console.error(err);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading product…</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow p-10 text-center">
          <h1 className="text-3xl font-bold mb-4">Product not found</h1>
          <p className="text-gray-600 mb-6">{error || "This product is not available."}</p>
          <Link href="/shop" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <Link href="/shop" className="text-blue-600 hover:underline">
            ← Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-lg">
          <div className="space-y-4">
            {/* Main image */}
            <div className="bg-gray-200 h-96 rounded flex items-center justify-center overflow-hidden">
              {product.media?.images?.[0] ? (
                <img
                  src={product.media.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-9xl">{product.image}</span>
              )}
            </div>

            {/* Additional images */}
            {product.media?.images && product.media.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.media.images.slice(1).map((image, index) => (
                  <div key={index} className="bg-gray-200 h-20 rounded overflow-hidden">
                    <img
                      src={image}
                      alt={`${product.name} ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Videos */}
            {product.media?.videos && product.media.videos.length > 0 && (
              <div className="space-y-2">
                {product.media.videos.map((video, index) => (
                  <video
                    key={index}
                    controls
                    className="w-full rounded"
                    poster={product.media?.images?.[0]}
                  >
                    <source src={video} />
                    Your browser does not support the video tag.
                  </video>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-4">{product.category}</p>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500 text-xl">★ {product.rating}</span>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            <p className="text-3xl font-bold text-green-600 mb-4">
              ${product.price.toFixed(2)}
            </p>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-semibold">✓ {product.stock} in stock</span>
                ) : (
                  <span className="text-red-600 font-semibold">Out of Stock</span>
                )}
              </p>
            </div>

            <p className="text-gray-700 mb-6 text-lg">{product.description}</p>

            <div className="bg-gray-50 p-4 rounded mb-6">
              <h3 className="font-semibold mb-2">Product Benefits:</h3>
              <ul className="text-gray-700 space-y-1">
                <li>✓ Premium Quality Materials</li>
                <li>✓ Trusted Arryona Marketplace</li>
                <li>✓ Seller-owned inventory</li>
                <li>✓ Fast support and fulfillment</li>
              </ul>
            </div>

            <button
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 mb-4 disabled:bg-gray-400"
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>

            <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50">
              ❤️ Add to Wishlist
            </button>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                  className="bg-white p-4 rounded-lg hover:shadow-lg transition"
                >
                  <div className="bg-gray-200 h-40 rounded mb-4 flex items-center justify-center text-6xl">
                    {relatedProduct.image}
                  </div>
                  <h3 className="font-bold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="text-sm text-gray-600">
                      {relatedProduct.rating} ({relatedProduct.reviews})
                    </span>
                  </div>
                  <p className="text-green-600 font-bold">${relatedProduct.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
