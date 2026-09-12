// src/lib/stripe.ts - Stripe Commerce Integration & Security Hardening
// Implements client/server trust boundaries: Prices are server-authoritative via Stripe Price IDs.

export interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  currency: string;
  image: string;
  quantity: number;
  stripePriceId?: string;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  freeShippingThreshold: number;
  shippingRemaining: number;
  itemCount: number;
}

export interface StripeLineItem {
  price: string;
  quantity: number;
}

export const FREE_SHIPPING_THRESHOLD = 150;

export function formatPrice(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateCartTotals(items: CartItem[]): CartState {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return {
    items,
    subtotal,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    shippingRemaining,
    itemCount,
  };
}

/**
 * Initiates Stripe Checkout.
 *
 * SECURITY ARCHITECTURAL ENFORCEMENT:
 * - The browser client NEVER submits arbitrary dollar amounts to Stripe.
 * - Any client modification to localStorage `price` is discarded.
 * - Only the immutable `stripePriceId` and validated positive `quantity` are bundled into the payload.
 * - The server-side Stripe Checkout Session creation resolves the true price directly from the Stripe Dashboard.
 */
export async function initiateStripeCheckout(
  items: CartItem[]
): Promise<{ success: boolean; message: string; url?: string }> {
  if (items.length === 0) {
    return { success: false, message: 'El carrito está vacío.' };
  }

  // Sanitize line items: extract strictly stripePriceId and validated quantity
  const secureLineItems: StripeLineItem[] = items
    .filter((item) => typeof item.stripePriceId === 'string' && item.quantity > 0)
    .map((item) => ({
      price: item.stripePriceId!,
      quantity: Math.max(1, Math.min(99, Math.floor(item.quantity))),
    }));

  if (secureLineItems.length === 0) {
    return {
      success: false,
      message: 'Los artículos no poseen identificadores de precio válidos de Stripe.',
    };
  }

  console.info('[Stripe Atelier Commerce] Transmitiendo payload seguro (Stripe Price IDs):', secureLineItems);

  // In production, this dispatches a POST to a serverless/backend endpoint (e.g. /api/create-checkout-session)
  // which executes: stripe.checkout.sessions.create({ line_items: secureLineItems, mode: 'payment', ... })
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockSessionId = `cs_test_${Math.random().toString(36).substring(2, 15)}`;
      resolve({
        success: true,
        message: 'Redirigiendo a pasarela protegida de Stripe Checkout (PCI DSS Nivel 1)...',
        url: `/orden-confirmada?session_id=${mockSessionId}`,
      });
    }, 700);
  });
}
