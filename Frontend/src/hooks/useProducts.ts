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
  manufacturers?: {
    name?: string;
    origin?: string;
    artisan?: string;
    workshop?: string;
    craftTradition?: string;
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
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000); // 2 min timeout
    try {
      const response = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        body: productData,
        signal: controller.signal,
      });
      let data: any = {};
      try { data = await response.json(); } catch {}
      if (!response.ok) throw new Error(data.message || `Server error ${response.status}`);
      setProducts(prev => [data.data, ...prev]);
      return data.data;
    } finally {
      clearTimeout(timeout);
    }
  };

  const updateProduct = async (slug: string, productData: FormData) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000);
    try {
      const response = await fetch(`${API_BASE}/products/${slug}`, {
        method: 'PUT',
        body: productData,
        signal: controller.signal,
      });
      let data: any = {};
      try { data = await response.json(); } catch {}
      if (!response.ok) throw new Error(data.message || `Server error ${response.status}`);
      setProducts(prev => prev.map(p => p.slug === slug ? data.data : p));
      return data.data;
    } finally {
      clearTimeout(timeout);
    }
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