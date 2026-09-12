import type { Product } from '../products';
import { supabaseProductAdapter } from '../adapters/supabase-product.adapter';

export interface ProductDataSource {
  getAll(): Promise<Product[]> | Product[];
  getById(id: string): Promise<Product | undefined> | Product | undefined;
  getByCategory?(category: string): Promise<Product[]> | Product[];
}

export class ProductRepository {
  private adapter: ProductDataSource;

  constructor(adapter: ProductDataSource = supabaseProductAdapter) {
    this.adapter = adapter;
  }

  async getAll(): Promise<Product[]> {
    return this.adapter.getAll();
  }

  async getById(id: string): Promise<Product | undefined> {
    return this.adapter.getById(id);
  }
}

// Default singleton repository instance powered by Supabase with graceful fallback
export const productRepository = new ProductRepository();
