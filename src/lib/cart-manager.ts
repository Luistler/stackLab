/**
 * src/lib/cart-manager.ts
 * ============================================================================
 * User-Scoped Zen Luxury Cart Engine
 * ----------------------------------------------------------------------------
 * Manages isolated cart state per authenticated Supabase user and guest session.
 * - When guest: uses 'stacklab_cart_guest'
 * - When authenticated: uses 'stacklab_cart_user_{userId}'
 * - When logging in or switching accounts, automatically swaps cart context.
 * ============================================================================
 */
import { getSupabaseClient } from './supabase';
import type { CartItem } from './stripe';

const GUEST_KEY = 'stacklab_cart_guest';

function getUserCartKey(userId?: string | null): string {
  if (userId) {
    return `stacklab_cart_user_${userId}`;
  }
  return GUEST_KEY;
}

export function getCurrentUserCartKey(): string {
  if (typeof window === 'undefined') return GUEST_KEY;
  const activeUserId = localStorage.getItem('stacklab_current_user_id');
  return getUserCartKey(activeUserId);
}

export function getScopedCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const key = getCurrentUserCartKey();
    let saved = localStorage.getItem(key);
    
    // Migration fallback: if guest has legacy cart, load it
    if (!saved && key === GUEST_KEY) {
      saved = localStorage.getItem('stacklab_atelier_cart_v1') || localStorage.getItem('stacklab_cart');
    }

    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading scoped cart:', e);
  }
  return [];
}

export function saveScopedCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  try {
    const key = getCurrentUserCartKey();
    localStorage.setItem(key, JSON.stringify(items));
    
    const count = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);

    window.dispatchEvent(
      new CustomEvent('cart-updated', {
        detail: { count, subtotal, items },
      })
    );
  } catch (e) {
    console.error('Error saving scoped cart:', e);
  }
}

export function clearGuestCart() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(GUEST_KEY);
    localStorage.removeItem('stacklab_atelier_cart_v1');
    localStorage.removeItem('stacklab_cart');
  } catch (e) {}
}

/**
 * Sync active user ID into local storage and notify components
 */
export async function syncUserCartSession(userId?: string | null) {
  if (typeof window === 'undefined') return;
  
  const prevUserId = localStorage.getItem('stacklab_current_user_id');
  const nextUserId = userId || null;

  if (prevUserId !== nextUserId) {
    if (nextUserId) {
      localStorage.setItem('stacklab_current_user_id', nextUserId);
    } else {
      localStorage.removeItem('stacklab_current_user_id');
    }

    // Dispatch reload event so CartDrawer, Nav and Dock re-render items for this specific user
    const currentItems = getScopedCart();
    const count = currentItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const subtotal = currentItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);

    window.dispatchEvent(
      new CustomEvent('cart-session-changed', {
        detail: { userId: nextUserId, items: currentItems, count, subtotal },
      })
    );
    window.dispatchEvent(
      new CustomEvent('cart-updated', {
        detail: { count, subtotal, items: currentItems },
      })
    );
  }
}
