import { useState, useEffect } from 'react';

export interface Product {
  _id?: string;
  name: string;
  slug: string;
  description: {
    content: Array<{
      type: 'text' | 'image' | 'video';
      content: string;
      order: number;
      alt?: string;
      caption?: string;
    }>;
  };
  images: Array<{
    url: string;
    publicId: string;
    alt: string;
    type: 'banner' | 'gallery' | 'detail';
    order: number;
  }>;
  videos?: Array<{
    url: string;
    publicId: string;
    thumbnail?: string;
    duration?: number;
    order: number;
  }>;
  category: string;
  price?: number;
  originalPrice?: number;
  inStock: boolean;
  featured: boolean;
  tags: string[];
  metadata: {
    material?: string;
    care?: string;
    dimensions?: string;
    weight?: string;
  };
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE = '/api';
const API_DIRECT = 'http://localhost:5000/api';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData: FormData) => {
    const response = await fetch(`${API_DIRECT}/products`, {
      method: 'POST',
      body: productData,
    });
    let data: any = {};
    try { data = await response.json(); } catch {}
    if (!response.ok) throw new Error(data.message || `Server error ${response.status}`);
    setProducts(prev => [data.data, ...prev]);
    return data.data;
  };

  const updateProduct = async (slug: string, productData: FormData) => {
    const response = await fetch(`${API_DIRECT}/products/${slug}`, {
      method: 'PUT',
      body: productData,
    });
    let data: any = {};
    try { data = await response.json(); } catch {}
    if (!response.ok) throw new Error(data.message || `Server error ${response.status}`);
    setProducts(prev => prev.map(p => p.slug === slug ? data.data : p));
    return data.data;
  };

  const deleteProduct = async (slug: string) => {
    try {
      const response = await fetch(`${API_BASE}/products/${slug}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete product');
      setProducts(prev => prev.filter(p => p.slug !== slug));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts,
  };
}

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then(r => r.json())
      .then(data => {
        const unique = [...new Set<string>((data.data || []).map((p: Product) => p.category))];
        setCategories(unique);
      })
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
}