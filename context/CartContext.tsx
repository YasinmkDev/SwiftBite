import React, { createContext, useContext } from 'react';
import { useCart, type UseCart } from '@/hooks/useCart';

const CartContext = createContext<UseCart | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cart = useCart();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartContext(): UseCart {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used within CartProvider');
  return ctx;
}
