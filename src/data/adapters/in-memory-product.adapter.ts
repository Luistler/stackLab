import { products, type Product } from '../products';
import type { ProductDataSource } from '../repositories/product.repository';

export class InMemoryProductAdapter implements ProductDataSource {
  private items: Product[];

  constructor(initialProducts: Product[] = products) {
    this.items = initialProducts;
  }

  getAll(): Product[] {
    return [...this.items];
  }

  getById(id: string): Product | undefined {
    return this.items.find((p) => p.id === id);
  }

  getByCategory(category: string): Product[] {
    return this.items.filter((p) => p.category === category);
  }
}

export const inMemoryProductAdapter = new InMemoryProductAdapter();
