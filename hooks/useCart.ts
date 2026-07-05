import { useState, useCallback } from 'react';
import type { Cart, CartItem, MenuItem } from '@/types';

const EMPTY_CART: Cart = {
  items: [],
  restaurantId: null,
  restaurantName: null,
};

export function useCart() {
  const [cart, setCart] = useState<Cart>(EMPTY_CART);

  const addItem = useCallback(
    (menuItem: MenuItem, restaurantId: string, restaurantName: string) => {
      setCart((prev) => {
        if (prev.restaurantId && prev.restaurantId !== restaurantId) {
          const existing = prev.items.find((i) => i.menuItem.id === menuItem.id);
          if (existing) {
            return {
              ...prev,
              items: prev.items.map((i) =>
                i.menuItem.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return {
            restaurantId,
            restaurantName,
            items: [{ menuItem, quantity: 1, restaurantId, restaurantName }],
          };
        }
        const existing = prev.items.find((i) => i.menuItem.id === menuItem.id);
        if (existing) {
          return {
            ...prev,
            items: prev.items.map((i) =>
              i.menuItem.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        }
        return {
          restaurantId,
          restaurantName,
          items: [...prev.items, { menuItem, quantity: 1, restaurantId, restaurantName }],
        };
      });
    },
    []
  );

  const removeItem = useCallback((menuItemId: string) => {
    setCart((prev) => {
      const updated = prev.items.filter((i) => i.menuItem.id !== menuItemId);
      if (updated.length === 0) return EMPTY_CART;
      return { ...prev, items: updated };
    });
  }, []);

  const decrementItem = useCallback((menuItemId: string) => {
    setCart((prev) => {
      const updated = prev.items
        .map((i) =>
          i.menuItem.id === menuItemId ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0);
      if (updated.length === 0) return EMPTY_CART;
      return { ...prev, items: updated };
    });
  }, []);

  const clearCart = useCallback(() => setCart(EMPTY_CART), []);

  const getItemQuantity = useCallback(
    (menuItemId: string): number => {
      return cart.items.find((i) => i.menuItem.id === menuItemId)?.quantity ?? 0;
    },
    [cart.items]
  );

  const totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cart.items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0);

  return {
    cart,
    addItem,
    removeItem,
    decrementItem,
    clearCart,
    getItemQuantity,
    totalItems,
    subtotal,
  };
}

export type UseCart = ReturnType<typeof useCart>;
