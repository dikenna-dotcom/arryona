export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
  sellerId?: string;
  sellerName?: string;
  seller?: string;
  isArryona?: boolean;
  featured?: boolean;
  views?: number;
  createdAt?: any;
  media?: {
    images: string[];
    videos: string[];
  };
}

export const products: Product[] = [];

const arrProducts = products.filter((product) => product.isArryona);

// Get products by category
export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

// Get featured ARRYONA products (top 6)
export function getFeaturedProducts(): Product[] {
  return arrProducts.filter((p) => p.featured).slice(0, 6);
}

// Get product by ID
export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

// Get all ARRYONA categories
export function getAllCategories(): string[] {
  const categories = [...new Set(arrProducts.map((p) => p.category))];
  return categories;
}

// Get all ARRYONA products
export function getArryonaProducts(): Product[] {
  return arrProducts;
}

// Search products
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
  );
}
