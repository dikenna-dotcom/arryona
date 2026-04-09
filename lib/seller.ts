import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export interface SellerProfile {
  uid: string;
  email: string;
  storeName: string;
  brandName: string;
  contactEmail: string;
  phone?: string;
  website?: string;
  address?: string;
  businessType?: string;
  role: "seller";
  status: "active" | "pending";
  createdAt: any;
  media?: {
    logo?: string;
    banner?: string;
    images: string[];
    videos: string[];
  };
}

const SELLER_PROFILE_KEY = "arryona-seller-profile";

export function saveSellerProfileLocal(profile: SellerProfile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SELLER_PROFILE_KEY, JSON.stringify(profile));
}

export function loadSellerProfileLocal(): SellerProfile | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SELLER_PROFILE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SellerProfile;
  } catch {
    return null;
  }
}

export async function createSellerProfileDoc(
  uid: string,
  profile: Omit<SellerProfile, "uid" | "role" | "status" | "createdAt">
): Promise<SellerProfile> {
  const document = doc(db, "sellers", uid);
  const payload = {
    ...profile,
    uid,
    role: "seller" as const,
    status: "active" as const,
    createdAt: serverTimestamp(),
  };

  await setDoc(document, payload);

  return {
    ...payload,
    createdAt: null,
  };
}

export async function getSellerProfileDoc(uid: string): Promise<SellerProfile | null> {
  const document = doc(db, "sellers", uid);
  const snapshot = await getDoc(document);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as SellerProfile;
}

export async function updateSellerProfileDoc(
  uid: string,
  updates: Partial<Omit<SellerProfile, "uid" | "role" | "createdAt" | "status">>
): Promise<void> {
  const document = doc(db, "sellers", uid);
  await updateDoc(document, updates as any);
}
