export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  dimensions: string;
  materials: string;
  origin: string;
  inStock: boolean;
  stripePriceId?: string;
  rating?: number;
  reviewsCount?: number;
}

export const products: Product[] = [
  {
    id: 'prod-cypress-console',
    name: 'Cypress Desk Console',
    subtitle: 'Consola de Escritorio en Ciprés Hinoki',
    category: 'Mobiliario & Organización',
    price: 145,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    description: 'Consola modular tallada a mano en madera de ciprés Hinoki japonés. Su aroma natural sutil y grano sedoso aportan serenidad y orden zen al espacio de trabajo.',
    dimensions: '38cm × 14cm × 6.5cm',
    materials: 'Ciprés Hinoki Sostenible, Cera de Abeja Natural',
    origin: 'Kiso Valley, Japón',
    inStock: true,
    stripePriceId: 'price_cypress_desk_145',
    rating: 4.9,
    reviewsCount: 28,
  },
  {
    id: 'prod-sound-vessel',
    name: 'Harmonic Sound Vessel',
    subtitle: 'Vasija Acústica de Resonancia Pasiva',
    category: 'Acústica & Presencia',
    price: 220,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=80',
    description: 'Escultura acústica pasiva modelada en arcilla gres chamotada. Diseñada con geometría de resonancia áurea para amplificar el sonido con calidez analógica pura.',
    dimensions: '22cm × 22cm × 28cm',
    materials: 'Gres Volcánico, Esmalte Mate de Ceniza de Madera',
    origin: 'Kioto, Japón',
    inStock: true,
    stripePriceId: 'price_sound_vessel_220',
    rating: 5.0,
    reviewsCount: 19,
  },
  {
    id: 'prod-basalt-altar',
    name: 'Basalt Incense Altar',
    subtitle: 'Altar de Incienso en Basalto Natural',
    category: 'Ritual & Aromaterapia',
    price: 85,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80',
    description: 'Pieza monolítica de roca basáltica pulida al tacto con canal colector de ceniza. Un anclaje visual y táctil para momentos de pausa y contemplación.',
    dimensions: '26cm × 7cm × 3.5cm',
    materials: 'Roca de Basalto Natural, Detalle de Latón Macizo',
    origin: 'Jeju, Corea del Sur',
    inStock: true,
    stripePriceId: 'price_basalt_altar_85',
    rating: 4.8,
    reviewsCount: 42,
  },
  {
    id: 'prod-linen-throw',
    name: 'Wabi-Sabi Linen Throw',
    subtitle: 'Manta de Lino Belga Lavado a la Piedra',
    category: 'Textiles Orgánicos',
    price: 110,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80',
    description: 'Manta ligera tejida en telar tradicional con lino orgánico europeo sin blanquear. Suavizada mediante lavado con piedras de río para una caída fluida e imperfecta.',
    dimensions: '140cm × 200cm',
    materials: '100% Lino Orgánico Certificado OEKO-TEX',
    origin: 'Flandes, Bélgica',
    inStock: true,
    stripePriceId: 'price_linen_throw_110',
    rating: 4.9,
    reviewsCount: 35,
  },
];
