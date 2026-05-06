import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import type { Product } from '@/types';

export type { Product };

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.products.list();
      setProducts(res.data || []);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load products';
      setError(msg);
      console.error('[useProducts] fetch failed:', msg);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (body: FormData) => {
    const res = await api.products.create(body);
    setProducts(prev => [res.data, ...prev]);
    return res.data;
  };

  const updateProduct = async (slug: string, body: FormData) => {
    const res = await api.products.update(slug, body);
    setProducts(prev => prev.map(p => p.slug === slug ? res.data : p));
    return res.data;
  };

  const deleteProduct = async (slug: string) => {
    await api.products.delete(slug);
    setProducts(prev => prev.filter(p => p.slug !== slug));
  };

  useEffect(() => { fetchProducts(); }, []);

  return { products, loading, error, createProduct, updateProduct, deleteProduct, refetch: fetchProducts };
}

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.products.list()
      .then(res => {
        const unique = [...new Set<string>((res.data || []).map(p => p.category))];
        setCategories(unique);
      })
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
}
