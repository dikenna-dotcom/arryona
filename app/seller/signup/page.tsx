"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSellerProfileDoc, saveSellerProfileLocal } from "@/lib/seller";
import { uploadMultipleMedia, UploadedMedia } from "@/lib/media";

export default function SellerSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [address, setAddress] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [brandImages, setBrandImages] = useState<File[]>([]);
  const [brandVideos, setBrandVideos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    setError("");

    if (!email || !password || !confirmPassword || !storeName || !brandName || !contactEmail) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Upload brand media
      let uploadedMedia: UploadedMedia[] = [];
      const allMediaFiles = [
        ...(logoFile ? [logoFile] : []),
        ...(bannerFile ? [bannerFile] : []),
        ...brandImages,
        ...brandVideos,
      ];

      if (allMediaFiles.length > 0) {
        uploadedMedia = await uploadMultipleMedia(allMediaFiles, "brands", user.uid);
      }

      // Organize media URLs
      const logo = uploadedMedia.find(m => m.name === logoFile?.name)?.url;
      const banner = uploadedMedia.find(m => m.name === bannerFile?.name)?.url;
      const images = uploadedMedia.filter(m => m.type === "image" && m.name !== logoFile?.name && m.name !== bannerFile?.name).map(m => m.url);
      const videos = uploadedMedia.filter(m => m.type === "video").map(m => m.url);

      const profile = await createSellerProfileDoc(user.uid, {
        email,
        storeName,
        brandName,
        contactEmail,
        phone,
        website,
        businessType,
        address,
        media: {
          logo,
          banner,
          images,
          videos,
        },
      });

      saveSellerProfileLocal(profile);
      router.push("/seller/dashboard");
    } catch (err: any) {
      setError(err.message || "Unable to create seller account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Become an Arryona Seller</h1>
        <p className="text-gray-600 mb-8">
          Create a seller account and open your own store with detailed business information, product management, and analytics.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
          <input
            type="text"
            placeholder="Store Name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <input
            type="text"
            placeholder="Brand Identity"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
          <input
            type="email"
            placeholder="Contact Email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
          <input
            type="text"
            placeholder="Website or Store URL"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <input
            type="text"
            placeholder="Business Type"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
          <input
            type="text"
            placeholder="Business Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3"
          />
        </div>

        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Brand Media (Optional)</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Images (max 5)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setBrandImages(Array.from(e.target.files || []))}
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
            {brandImages.length > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                {brandImages.length} image{brandImages.length === 1 ? "" : "s"} selected
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Videos (max 2)
            </label>
            <input
              type="file"
              multiple
              accept="video/*"
              onChange={(e) => setBrandVideos(Array.from(e.target.files || []))}
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
            {brandVideos.length > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                {brandVideos.length} video{brandVideos.length === 1 ? "" : "s"} selected
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? "Registering..." : "Create Seller Account"}
        </button>

        <p className="mt-6 text-gray-600 text-center">
          Already a seller? <Link href="/seller/login" className="text-blue-600 hover:underline">Login here</Link>.
        </p>
      </div>
    </div>
  );
}
