/**
 * Standalone seed script to push the 8 artisan products into Supabase via Drizzle ORM
 * Usage: npx tsx src/scripts/seed-supabase.ts
 */
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { productsTable } from '../data/schema';
import { products } from '../data/products';

const connectionString = process.env.DATABASE_URL;

async function seed() {
  if (!connectionString) {
    console.error('❌ Error: DATABASE_URL environment variable is missing.');
    console.log('Provide your Supabase Postgres direct or pooled URL in .env:');
    console.log('DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"');
    process.exit(1);
  }

  console.log('🌱 Connecting to database via Drizzle ORM...');
  const client = postgres(connectionString);
  const db = drizzle(client);

  console.log(`📦 Seeding ${products.length} products into "products" table...`);

  for (const item of products) {
    await db.insert(productsTable).values({
      id: item.id,
      name: item.name,
      subtitle: item.subtitle,
      category: item.category,
      price: item.price,
      currency: item.currency,
      image: item.image,
      description: item.description,
      dimensions: item.dimensions,
      materials: item.materials,
      origin: item.origin,
      inStock: item.inStock,
      rating: item.rating ?? 5,
      reviewsCount: item.reviewsCount ?? 0,
    }).onConflictDoUpdate({
      target: productsTable.id,
      set: {
        price: item.price,
        inStock: item.inStock,
        description: item.description,
      }
    });
  }

  console.log('✅ Seed completed successfully with 8 curated items!');
  await client.end();
}

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
