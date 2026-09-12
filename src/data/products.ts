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
    description:
      'Consola modular tallada a mano en madera de ciprés Hinoki japonés. Su aroma natural sutil y grano sedoso aportan serenidad y orden zen al espacio de trabajo.',
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
    description:
      'Escultura acústica pasiva modelada en arcilla gres chamotada. Diseñada con geometría de resonancia áurea para amplificar el sonido con calidez analógica pura.',
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
    description:
      'Pieza monolítica de roca basáltica pulida al tacto con canal colector de ceniza. Un anclaje visual y táctil para momentos de pausa y contemplación.',
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
    description:
      'Manta ligera tejida en telar tradicional con lino orgánico europeo sin blanquear. Suavizada mediante lavado con piedras de río para una caída fluida e imperfecta.',
    dimensions: '140cm × 200cm',
    materials: '100% Lino Orgánico Certificado OEKO-TEX',
    origin: 'Flandes, Bélgica',
    inStock: true,
    stripePriceId: 'price_linen_throw_110',
    rating: 4.9,
    reviewsCount: 35,
  },
  {
    id: 'prod-komorebi-lantern',
    name: 'Komorebi Paper Lantern',
    subtitle: 'Lámpara Escultural en Papel Washi Tradicional',
    category: 'Iluminación & Atmósfera',
    price: 165,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80',
    description:
      'Linterna escultórica elaborada a mano con fibras de morera (Kozo) según las técnicas seculares de Gifu. Proyecta una luz difusa y orgánica que recrea el efecto poético de la luz solar filtrada entre las hojas de los árboles.',
    dimensions: '28cm × 28cm × 42cm',
    materials: 'Papel Washi Mino Hecho a Mano, Estructura de Bambú Ahumado, Base de Nogal',
    origin: 'Gifu, Japón',
    inStock: true,
    stripePriceId: 'price_komorebi_lantern_165',
    rating: 4.9,
    reviewsCount: 24,
  },
  {
    id: 'prod-kuroishi-tea-set',
    name: 'Kuroishi Cast Iron Tea Set',
    subtitle: 'Juego de Té Ceremonial en Hierro Nanbu Tekki',
    category: 'Ceremonia & Bienestar',
    price: 195,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
    description:
      'Tetera y cuencos forjados en hierro fundido según la venerada tradición Nanbu Tekki de Iwate. Posee un esmaltado interior no reactivo y una textura exterior rugosa inspirada en la piedra volcánica negra, ideal para preservar la temperatura de infusión.',
    dimensions: 'Tetera: 16cm × 14cm × 18cm (0.8L), Cuencos: 8cm × 5.5cm',
    materials: 'Hierro Fundido Nanbu Tekki, Interior Esmaltado, Mango Encordado de Cáñamo',
    origin: 'Morioka, Iwate, Japón',
    inStock: true,
    stripePriceId: 'price_kuroishi_tea_195',
    rating: 5.0,
    reviewsCount: 31,
  },
  {
    id: 'prod-shou-sugi-pedestal',
    name: 'Sumi Charred Oak Pedestal',
    subtitle: 'Pedestal Escultórico en Roble Carbonizado',
    category: 'Mobiliario & Piezas de Acento',
    price: 340,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80',
    description:
      'Columna monolítica elaborada en bloque macizo de roble japonés tratada mediante la técnica ancestral Shou Sugi Ban (Yakisugi). Su superficie de carbón profundo refleja matices sedosos y protege la madera de forma imperecedera.',
    dimensions: '30cm × 30cm × 55cm',
    materials: 'Roble Japonés Macizo Carbonizado a Fuego, Acabado al Aceite Natural de Tung',
    origin: 'Nagano, Japón',
    inStock: true,
    stripePriceId: 'price_shou_sugi_pedestal_340',
    rating: 4.9,
    reviewsCount: 16,
  },
  {
    id: 'prod-travertine-stand',
    name: 'Roman Travertine Book Stand',
    subtitle: 'Atril Escultórico en Travertino Romano Clásico',
    category: 'Mobiliario & Organización',
    price: 130,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=1000&q=80',
    description:
      'Atril para libros de arte y lectura contemplativa esculpido en piedra caliza travertina porosa sin sellar. Cada pieza exhibe cavidades minerales únicas y una tonalidad crema cálida procedente de las históricas canteras del Lacio.',
    dimensions: '32cm × 22cm × 12cm',
    materials: 'Mármol Travertino Romano Poroso Natural, Almohadillas de Lana Fieltrada',
    origin: 'Tívoli, Lacio, Italia',
    inStock: true,
    stripePriceId: 'price_travertine_stand_130',
    rating: 4.8,
    reviewsCount: 22,
  },
];
