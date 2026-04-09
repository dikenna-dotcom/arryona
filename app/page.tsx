import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, getAllCategories } from "@/lib/products";
import Link from "next/link";

export default function Home() {
  const featured = getFeaturedProducts();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <section className="bg-black text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">ARRYONA</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Arryona is a curated brand-first marketplace with a dedicated seller section. Public visitors see official Arryona listings up front, while sellers onboard through a separate workflow.
        </p>
      </section>

      <section className="p-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Official Arryona Products</h2>
            <p className="text-gray-700 max-w-2xl">
              Only verified Arryona goods appear here before login. Seller content is managed through the dedicated seller subsystem.
            </p>
          </div>
          <Link
            href="/seller"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Go to Seller Hub
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-600">
            No Arryona products are listed yet. Seller onboarding will populate this storefront with official Arryona items.
          </div>
        )}
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Arryona Collections</h2>
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
              {categories.map((category) => (
                <div
                  key={category}
                  className="border border-gray-200 p-6 rounded-lg hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-semibold">{category}</h3>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center text-gray-500">
              Collections will appear here once Arryona products are added.
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Sellers have their own environment</h2>
            <p className="text-gray-300 mb-6">
              The seller workflow is separate from the customer experience. Storefront owners manage inventory, orders, and analytics in a secure seller dashboard.
            </p>
            <Link
              href="/seller"
              className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Visit Seller Hub
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Dedicated Login</h3>
              <p className="text-gray-300">Sellers sign in separately so their workflow stays professional and secure.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Business Tools</h3>
              <p className="text-gray-300">Inventory, orders, and analytics are all centralized in the seller dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-gray-400 py-10 text-center">
        <p>&copy; 2026 ARRYONA. All rights reserved.</p>
      </footer>
    </div>
  );
}
