import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: { id: string; name: string; price: number }) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    { name: "cart-storage" }
  )
);

// Selectores adicionales que usan los componentes
export const useCartCount = () =>
  useCartStore((state) => state.items.reduce((n, i) => n + i.quantity, 0));

export const useIsInCart = (productId: string) =>
  useCartStore((state) => state.items.some((i) => i.id === productId));

export const useCartTotal = () =>
  useCartStore((state) => state.getTotalPrice());