import type { Product } from '../products';
import { inMemoryProductAdapter } from '../adapters/in-memory-product.adapter';

export interface ProductDataSource {
  getAll(): Promise<Product[]> | Product[];
  getById(id: string): Promise<Product | undefined> | Product | undefined;
  getByCategory?(category: string): Promise<Product[]> | Product[];
}

export class ProductRepository {
  private adapter: ProductDataSource;

  constructor(adapter: ProductDataSource = inMemoryProductAdapter) {
    this.adapter = adapter;
  }

  async getAll(): Promise<Product[]> {
    return this.adapter.getAll();
  }

  async getById(id: string): Promise<Product | undefined> {
    return this.adapter.getById(id);
  }
}

// Default singleton repository instance
export const productRepository = new ProductRepository();
