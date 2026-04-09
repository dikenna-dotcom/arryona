"use client";

import Link from "next/link";

export default function SellerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-black text-white py-20 px-6 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-green-400 mb-4">Arryona Seller Hub</p>
        <h1 className="text-5xl font-bold mb-6">Build your brand inside Arryona</h1>
        <p className="max-w-3xl mx-auto text-gray-300 text-lg">
          Sellers get a dedicated onboarding experience, separate login flow, and a protected dashboard for product management, sales tracking, and store settings.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">What sellers can do</h2>
            <ul className="space-y-3 text-gray-700">
              <li>• Create a seller account with brand and business details.</li>
              <li>• Access a protected seller dashboard at /seller/dashboard.</li>
              <li>• Manage product listings, inventory, and performance metrics.</li>
              <li>• Keep seller activity separate from general customer login.</li>
            </ul>
          </div>

          <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-semibold">Ready to join as a seller?</h3>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/seller/signup"
                className="inline-flex flex-1 justify-center rounded-xl bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700"
              >
                Seller Signup
              </Link>
              <Link
                href="/seller/login"
                className="inline-flex flex-1 justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-900 font-semibold hover:bg-gray-100"
              >
                Seller Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Seller section is a separate subsystem</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Onboarding</h3>
              <p className="text-gray-600">Sellers supply store name, business contact, brand identity, and optional payment details during signup.</p>
            </div>
            <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Dashboard</h3>
              <p className="text-gray-600">Once authenticated, only verified sellers may access the protected dashboard and management tools.</p>
            </div>
            <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Product management</h3>
              <p className="text-gray-600">Add products, manage inventory, and track live seller metrics in a dedicated seller experience.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
