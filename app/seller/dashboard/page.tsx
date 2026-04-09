"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getSellerProfileDoc, loadSellerProfileLocal, saveSellerProfileLocal, SellerProfile } from "@/lib/seller";
import { createSellerProduct, getSellerOrders, getSellerProducts, SellerOrder, SellerProduct } from "@/lib/marketplace";
import { uploadMultipleMedia, UploadedMedia } from "@/lib/media";

export default function SellerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [sellerProducts, setSellerProducts] = useState<SellerProduct[]>([]);
  const [sellerOrders, setSellerOrders] = useState<SellerOrder[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("Accessories");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(1);
  const [image, setImage] = useState("📦");
  const [productImages, setProductImages] = useState<File[]>([]);
  const [productVideos, setProductVideos] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/seller");
        return;
      }

      setUser(currentUser);
      const profileDoc = await getSellerProfileDoc(currentUser.uid);
      const profileData = profileDoc || loadSellerProfileLocal();

      if (!profileData || profileData.role !== "seller") {
        router.push("/seller");
        return;
      }

      setProfile(profileData);
      saveSellerProfileLocal(profileData);

      try {
        const [products, orders] = await Promise.all([
          getSellerProducts(currentUser.uid),
          getSellerOrders(currentUser.uid),
        ]);
        setSellerProducts(products);
        setSellerOrders(orders);
      } catch (err) {
        console.error("Failed to load seller data:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const metrics = useMemo(
    () => ({
      products: sellerProducts.length,
      orders: sellerOrders.length,
      revenue: sellerOrders.reduce((sum, order) => sum + order.total, 0),
      views: sellerProducts.reduce((sum, product) => sum + (product.views ?? 0), 0),
    }),
    [sellerOrders, sellerProducts]
  );

  const categories = useMemo(
    () => ["Men's Clothing", "Women's Clothing", "Fragrances", "Kids", "Pets", "Accessories"],
    []
  );

  const handleAddProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setUploading(true);

    if (!name || price <= 0 || !description || !profile || !user) {
      setError("Please enter a valid name, price, and description.");
      setUploading(false);
      return;
    }

    try {
      // Upload media files
      const allMediaFiles = [...productImages, ...productVideos];
      let uploadedMedia: UploadedMedia[] = [];

      if (allMediaFiles.length > 0) {
        uploadedMedia = await uploadMultipleMedia(allMediaFiles, "products", user.uid);
      }

      // Separate images and videos
      const images = uploadedMedia.filter(m => m.type === "image").map(m => m.url);
      const videos = uploadedMedia.filter(m => m.type === "video").map(m => m.url);

      const newProduct = await createSellerProduct(user.uid, profile.brandName, {
        name,
        price,
        category,
        description,
        image,
        rating: 4.5,
        reviews: 0,
        stock,
        media: {
          images,
          videos,
        },
      });

      setSellerProducts([newProduct, ...sellerProducts]);

      // Reset form
      setName("");
      setPrice(0);
      setCategory("Accessories");
      setDescription("");
      setStock(1);
      setImage("📦");
      setProductImages([]);
      setProductVideos([]);
    } catch (err) {
      console.error("Failed to create product:", err);
      setError("Unable to create product. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading your seller dashboard…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-green-600">Seller Portal</p>
            <h1 className="text-4xl font-bold">{profile?.storeName || "Your Store"} Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage listings, track performance, and grow your brand on Arryona.</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold hover:bg-gray-200"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-4 mb-10">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Products Listed</p>
            <p className="mt-4 text-3xl font-bold">{metrics.products}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Orders</p>
            <p className="mt-4 text-3xl font-bold">{metrics.orders}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Revenue</p>
            <p className="mt-4 text-3xl font-bold">${metrics.revenue.toFixed(2)}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Product Views</p>
            <p className="mt-4 text-3xl font-bold">{metrics.views}</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <section className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Product Management</h2>
                  <p className="text-gray-600 mt-2">Create, edit, and monitor all listings from one place.</p>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                  >
                    {categories.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Emoji or Image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                  />
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    placeholder="Rating"
                    value={4.5}
                    disabled
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-gray-50"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Images (max 5 images, 10MB each)
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => setProductImages(Array.from(e.target.files || []))}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    />
                    {productImages.length > 0 && (
                      <p className="text-sm text-gray-600 mt-1">
                        {productImages.length} image{productImages.length === 1 ? "" : "s"} selected
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Videos (max 2 videos, 10MB each)
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="video/*"
                      onChange={(e) => setProductVideos(Array.from(e.target.files || []))}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    />
                    {productVideos.length > 0 && (
                      <p className="text-sm text-gray-600 mt-1">
                        {productVideos.length} video{productVideos.length === 1 ? "" : "s"} selected
                      </p>
                    )}
                  </div>
                </div>

                <textarea
                  placeholder="Product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:bg-gray-400"
                >
                  {uploading ? "Creating Product..." : "Add Product"}
                </button>
              </form>
            </section>

            <section className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Seller Orders</h2>
              <p className="text-gray-600">Order management connects your listings with customer transactions.</p>
              {sellerOrders.length === 0 ? (
                <div className="mt-6 rounded-3xl border border-dashed border-gray-200 p-6 text-center text-gray-500">
                  No orders yet. When customers purchase your products, orders will appear here.
                </div>
              ) : (
                <div className="space-y-4 mt-6">
                  {sellerOrders.map((order) => (
                    <div key={order.id} className="rounded-3xl border border-gray-200 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                          <p className="font-semibold">{order.customerEmail}</p>
                          <p className="text-sm text-gray-600">{order.items.length} item{order.items.length === 1 ? "" : "s"}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-600 font-bold">${order.total.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">{order.status}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Your Seller Profile</h2>
              <div className="space-y-3 text-gray-700">
                <p><strong>Store:</strong> {profile?.storeName}</p>
                <p><strong>Brand:</strong> {profile?.brandName}</p>
                <p><strong>Email:</strong> {profile?.contactEmail}</p>
                <p><strong>Status:</strong> {profile?.status}</p>
              </div>

              {profile?.media && (
                <div className="mt-6 space-y-4">
                  {profile.media.logo && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Logo</p>
                      <img src={profile.media.logo} alt="Brand Logo" className="w-20 h-20 object-cover rounded" />
                    </div>
                  )}

                  {profile.media.banner && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Banner</p>
                      <img src={profile.media.banner} alt="Brand Banner" className="w-full h-32 object-cover rounded" />
                    </div>
                  )}

                  {profile.media.images && profile.media.images.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Brand Images</p>
                      <div className="grid grid-cols-3 gap-2">
                        {profile.media.images.map((image, index) => (
                          <img key={index} src={image} alt={`Brand ${index + 1}`} className="w-full h-20 object-cover rounded" />
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.media.videos && profile.media.videos.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Brand Videos</p>
                      <div className="space-y-2">
                        {profile.media.videos.map((video, index) => (
                          <video key={index} controls className="w-full rounded" style={{ maxHeight: '200px' }}>
                            <source src={video} />
                          </video>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            <section className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Live Listings</h2>
              {sellerProducts.length === 0 ? (
                <p className="text-gray-600">No products created yet. Add your first listing above.</p>
              ) : (
                <div className="space-y-4">
                  {sellerProducts.map((product) => (
                    <div key={product.id} className="rounded-3xl border border-gray-200 p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                          {product.media?.images?.[0] ? (
                            <img src={product.media.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-2xl">{product.image}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-gray-500 text-sm">{product.category}</p>
                          <p className="text-green-600 font-semibold mt-2">${product.price.toFixed(2)}</p>
                          {product.media && (
                            <div className="flex gap-2 mt-2 text-xs text-gray-500">
                              {product.media.images && product.media.images.length > 0 && (
                                <span>{product.media.images.length} image{product.media.images.length === 1 ? "" : "s"}</span>
                              )}
                              {product.media.videos && product.media.videos.length > 0 && (
                                <span>{product.media.videos.length} video{product.media.videos.length === 1 ? "" : "s"}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
