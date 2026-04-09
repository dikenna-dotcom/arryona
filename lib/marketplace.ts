import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
  setDoc,
} from "firebase/firestore";
import { Product } from "@/lib/products";

export interface SellerProduct extends Product {
  sellerId: string;
  sellerName: string;
  isArryona: false;
  views: number;
  createdAt: Timestamp | ReturnType<typeof serverTimestamp> | null;
  media?: {
    images: string[];
    videos: string[];
  };
}

export interface SellerOrder {
  id: string;
  sellerId: string;
  sellerName: string;
  customerEmail: string;
  items: {
    productId: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: "pending" | "processed" | "shipped" | "delivered";
  createdAt: Timestamp | ReturnType<typeof serverTimestamp> | null;
}

const productsCollection = collection(db, "products");
const ordersCollection = collection(db, "orders");

export async function createSellerProduct(
  sellerId: string,
  sellerName: string,
  product: Omit<Product, "id" | "sellerId" | "sellerName" | "createdAt" | "views" | "isArryona">,
): Promise<SellerProduct> {
  const id = Date.now();
  const payload = {
    ...product,
    id,
    sellerId,
    sellerName,
    isArryona: false,
    views: 0,
    createdAt: serverTimestamp(),
  } as unknown as SellerProduct;

  await addDoc(productsCollection, payload);
  return payload;
}

export async function getSellerProducts(sellerId: string): Promise<SellerProduct[]> {
  const productsQuery = query(
    productsCollection,
    where("sellerId", "==", sellerId),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(productsQuery);
  return snapshot.docs.map((docSnap) => docSnap.data() as SellerProduct);
}

export async function getAllProducts(): Promise<SellerProduct[]> {
  const productsQuery = query(productsCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(productsQuery);
  return snapshot.docs.map((docSnap) => docSnap.data() as SellerProduct);
}

export async function getProductById(productId: number): Promise<SellerProduct | undefined> {
  const productQuery = query(productsCollection, where("id", "==", productId));
  const snapshot = await getDocs(productQuery);
  if (snapshot.empty) {
    return undefined;
  }
  return snapshot.docs[0].data() as SellerProduct;
}

export async function incrementProductViews(productId: number): Promise<void> {
  const productQuery = query(productsCollection, where("id", "==", productId));
  const snapshot = await getDocs(productQuery);
  if (snapshot.empty) {
    return;
  }

  const productDoc = snapshot.docs[0];
  const current = productDoc.data() as SellerProduct;
  await updateDoc(doc(db, "products", productDoc.id), {
    views: (current.views ?? 0) + 1,
  });
}

export async function createOrder(order: Omit<SellerOrder, "id" | "createdAt">): Promise<SellerOrder> {
  const id = `order-${Date.now()}`;
  const payload = {
    ...order,
    id,
    createdAt: serverTimestamp(),
  };

  await setDoc(doc(ordersCollection, id), payload);
  return payload;
}

export async function getSellerOrders(sellerId: string): Promise<SellerOrder[]> {
  const orderQuery = query(
    ordersCollection,
    where("sellerId", "==", sellerId),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(orderQuery);
  return snapshot.docs.map((docSnap) => docSnap.data() as SellerOrder);
}
