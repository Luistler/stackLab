import { pgTable, text, integer, boolean, timestamp, uuid } from 'drizzle-orm/pg-core';

/**
 * Drizzle ORM Schema definition for StackLab Atelier (PostgreSQL on Supabase)
 * Lightweight, type-safe schema with zero-binary overhead.
 */

// Products Catalog Table
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

// User Profiles (linked directly to Supabase Auth auth.users.id)
export const profilesTable = pgTable('profiles', {
  id: uuid('id').primaryKey(), // matches auth.users.id
  email: text('email').notNull(),
  fullName: text('full_name'),
  avatarUrl: text('avatar_url'),
  phone: text('phone'),
  addressStreet: text('address_street'),
  addressCity: text('address_city'),
  addressPostal: text('address_postal'),
  addressCountry: text('address_country'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Orders History Table
export const ordersTable = pgTable('orders', {
  id: text('id').primaryKey(),
  userId: uuid('user_id').references(() => profilesTable.id),
  customerEmail: text('customer_email').notNull(),
  stripeSessionId: text('stripe_session_id'),
  totalAmount: integer('total_amount').notNull(),
  currency: text('currency').default('USD').notNull(),
  status: text('status').default('paid').notNull(), // 'paid', 'processing', 'shipped', 'delivered'
  shippingAddress: text('shipping_address'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type ProductEntity = typeof productsTable.$inferSelect;
export type ProfileEntity = typeof profilesTable.$inferSelect;
export type OrderEntity = typeof ordersTable.$inferSelect;
