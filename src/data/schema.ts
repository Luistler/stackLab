import { pgTable, text, integer, boolean, timestamp, uuid } from 'drizzle-orm/pg-core';

/**
 * Drizzle ORM Schema definition for StackLab Atelier (PostgreSQL on Supabase)
 * Lightweight, type-safe schema with zero-binary overhead.
 */

export const productsTable = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  subtitle: text('subtitle').notNull(),
  category: text('category').notNull(),
  price: integer('price').notNull(),
  currency: text('currency').default('USD').notNull(),
  image: text('image').notNull(),
  description: text('description').notNull(),
  dimensions: text('dimensions').notNull(),
  materials: text('materials').notNull(),
  origin: text('origin').notNull(),
  inStock: boolean('in_stock').default(true).notNull(),
  stripePriceId: text('stripe_price_id'),
  rating: integer('rating').default(5),
  reviewsCount: integer('reviews_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const profilesTable = pgTable('profiles', {
  id: uuid('id').primaryKey(), // matches auth.users.id from Supabase
  email: text('email').notNull(),
  fullName: text('full_name'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type ProductEntity = typeof productsTable.$inferSelect;
export type ProfileEntity = typeof profilesTable.$inferSelect;
