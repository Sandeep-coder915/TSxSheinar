import type { Product, ApiResponse } from '@/types';

// Dev: Vite proxy rewrites /api → localhost:5000
// Prod: VITE_API_URL is baked in at build time by Vite from .env.production
const BASE: string = import.meta.env.VITE_API_URL || '/api';

async function request<T>(path: string, init?: RequestInit, timeoutMs = 30000): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${BASE}${path}`, { ...init, signal: controller.signal });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error((json as any).message || `HTTP ${res.status}`);
    return json as T;
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  products: {
    list: () =>
      request<ApiResponse<Product[]>>('/products'),

    get: (slug: string) =>
      request<ApiResponse<Product>>(`/products/${slug}`),

    featured: () =>
      request<ApiResponse<Product[]>>('/products/featured'),

    byCategory: (category: string) =>
      request<ApiResponse<Product[]>>(`/products/category/${category}`),

    create: (body: FormData) =>
      request<ApiResponse<Product>>('/products', { method: 'POST', body }, 120000),

    update: (slug: string, body: FormData) =>
      request<ApiResponse<Product>>(`/products/${slug}`, { method: 'PUT', body }, 120000),

    delete: (slug: string) =>
      request<ApiResponse<null>>(`/products/${slug}`, { method: 'DELETE' }),
  },

  appointments: {
    create: (body: Record<string, unknown>) =>
      request<ApiResponse<unknown>>('/products/appointments/general', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }),

    createForProduct: (slug: string, body: Record<string, unknown>) =>
      request<ApiResponse<unknown>>(`/products/${slug}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }),

    list: () =>
      request<ApiResponse<unknown[]>>('/products/appointments/list'),
  },
};
