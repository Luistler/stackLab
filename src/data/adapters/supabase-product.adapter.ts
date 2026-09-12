import { getSupabaseClient } from '../../lib/supabase';
import type { Product } from '../products';
import type { ProductDataSource } from '../repositories/product.repository';
import { inMemoryProductAdapter } from './in-memory-product.adapter';

/**
 * Supabase + PostgreSQL Product Data Source Adapter.
 * Gracefully falls back to InMemory adapter if credentials are not yet configured.
 */
export class SupabaseProductAdapter implements ProductDataSource {
  async getAll(): Promise<Product[]> {
    try {
      const client = getSupabaseClient();
      if (!client) return inMemoryProductAdapter.getAll();
      const { data, error } = await client.from('products').select('*');
      if (error || !data || data.length === 0) {
        return inMemoryProductAdapter.getAll();
      }
      return data as Product[];
    } catch (e) {
      return inMemoryProductAdapter.getAll();
    }
  }

  async getById(id: string): Promise<Product | undefined> {
    try {
      const client = getSupabaseClient();
      if (!client) return inMemoryProductAdapter.getById(id);
      const { data, error } = await client.from('products').select('*').eq('id', id).single();
      if (error || !data) {
        return inMemoryProductAdapter.getById(id);
      }
      return data as Product;
    } catch (e) {
      return inMemoryProductAdapter.getById(id);
    }
  }

  async getByCategory(category: string): Promise<Product[]> {
    try {
      const client = getSupabaseClient();
      if (!client) return inMemoryProductAdapter.getByCategory(category);
      const { data, error } = await client.from('products').select('*').eq('category', category);
      if (error || !data || data.length === 0) {
        return inMemoryProductAdapter.getByCategory(category);
      }
      return data as Product[];
    } catch (e) {
      return inMemoryProductAdapter.getByCategory(category);
    }
  }
}

export const supabaseProductAdapter = new SupabaseProductAdapter();
