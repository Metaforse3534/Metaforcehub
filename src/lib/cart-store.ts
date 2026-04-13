import { useState, useCallback } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

let globalCart: CartItem[] = [];
let listeners: Set<() => void> = new Set();

function emitChange() {
  listeners.forEach((l) => l());
}

export function useCart() {
  const [, setTick] = useState(0);

  const subscribe = useCallback(() => {
    const listener = () => setTick((t) => t + 1);
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  // Force re-render on changes
  useState(() => {
    const listener = () => setTick((t) => t + 1);
    listeners.add(listener);
    return () => listeners.delete(listener);
  });

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    const existing = globalCart.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      globalCart.push({ ...item, quantity: 1 });
    }
    globalCart = [...globalCart];
    emitChange();
  }, []);

  const removeFromCart = useCallback((id: string) => {
    globalCart = globalCart.filter((i) => i.id !== id);
    emitChange();
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      globalCart = globalCart.filter((i) => i.id !== id);
    } else {
      globalCart = globalCart.map((i) => (i.id === id ? { ...i, quantity } : i));
    }
    emitChange();
  }, []);

  const clearCart = useCallback(() => {
    globalCart = [];
    emitChange();
  }, []);

  const total = globalCart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = globalCart.reduce((sum, i) => sum + i.quantity, 0);

  return {
    items: globalCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  };
}
